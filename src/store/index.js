import { createStore } from "vuex";

import "../../firebaseConfigInit";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const store = createStore({
  state: {
    recipesList: [],
    recipesReady: false,
    totalAmountOfRecipes: 0,
    dbKeys: [],
    currentUser: null,
    authIsReady: false,
    selectedRecipe: null,
    admin: false,
  },
  mutations: {
    setRecipesList(state, payload) {
      state.recipesList = payload;
    },
    setDbKeys(state, payload) {
      state.dbKeys = payload;
    },
    addToRecipesList(state, payload) {
      state.recipesList.push(payload);
    },
    removeFromRecipesList(state, payload) {
      state.recipesList.splice(payload, 1);
    },
    changeRecipeList(state, payload) {
      state.recipesList[payload.index] = payload.recipe;
    },
    setRecipesReady(state, payload) {
      console.log("Setting recipesReady to", payload);
      state.recipesReady = payload;
    },
    setTotalAmountOfRecipes(state, payload) {
      state.totalAmountOfRecipes = payload;
    },
    addDbKey(state, payload) {
      state.dbKeys.push(payload);
    },
    setSelectedRecipe(state, payload) {
      state.selectedRecipe = payload;
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload;
    },
    setAdmin(state, payload) {
      state.admin = payload;
    },
  },
  actions: {
    async fetchRecipesList(context) {
      const dbRef = firebase.database().ref("recipes");

      // Always rebuild the full list on any change.
      // This avoids desync when recipeIds are re-indexed after deletes.
      dbRef.on("value", (snapshot) => {
        const recipes = [];
        const keys = [];

        snapshot.forEach((childSnapshot) => {
          const value = childSnapshot.val() || {};
          recipes.push({ ...value, _key: childSnapshot.key });
        });

        // Sort by numeric recipeId when possible; fallback to title/dbKey.
        recipes.sort((a, b) => {
          const aId = Number(a?.recipeId);
          const bId = Number(b?.recipeId);
          const aHasId = Number.isFinite(aId);
          const bHasId = Number.isFinite(bId);
          if (aHasId && bHasId) return aId - bId;
          if (aHasId && !bHasId) return -1;
          if (!aHasId && bHasId) return 1;
          const aTitle = String(a?.title || "");
          const bTitle = String(b?.title || "");
          return aTitle.localeCompare(bTitle);
        });

        for (const recipe of recipes) {
          if (recipe?._key) keys.push(recipe._key);
        }

        context.commit("setRecipesList", recipes);
        context.commit("setDbKeys", keys);
        context.commit("setTotalAmountOfRecipes", snapshot.numChildren());
        context.commit("setRecipesReady", true);
      });
    },

    async deleteRecipeAndReindex(context, payload) {
      const recipeIdToDelete = Number(payload);
      if (!Number.isFinite(recipeIdToDelete)) {
        throw new Error("Invalid recipeId for deletion");
      }

      const db = firebase.database();
      const recipesRef = db.ref("recipes");
      const snapshot = await recipesRef.once("value");

      const list = [];
      snapshot.forEach((child) => {
        list.push({ _key: child.key, ...(child.val() || {}) });
      });

      const target = list.find((r) => Number(r.recipeId) === recipeIdToDelete);
      if (!target || !target._key) {
        throw new Error(`Recipe with recipeId ${recipeIdToDelete} not found`);
      }

      const remaining = list
        .filter((r) => r._key !== target._key)
        .sort((a, b) => {
          const aId = Number(a?.recipeId);
          const bId = Number(b?.recipeId);
          const aHas = Number.isFinite(aId);
          const bHas = Number.isFinite(bId);
          if (aHas && bHas) return aId - bId;
          if (aHas && !bHas) return -1;
          if (!aHas && bHas) return 1;
          return String(a?._key || "").localeCompare(String(b?._key || ""));
        });

      const updates = {};
      // Delete node
      updates[`recipes/${target._key}`] = null;
      // Reindex remaining to 0..n-1
      remaining.forEach((recipe, index) => {
        updates[`recipes/${recipe._key}/recipeId`] = index;
      });

      await db.ref().update(updates);

      // Double-check: ensure recipeIds are exactly 0..n-1 after update
      const verifySnap = await recipesRef.once("value");
      const verifyIds = [];
      const total = verifySnap.numChildren();
      verifySnap.forEach((child) => {
        const id = Number(child.val()?.recipeId);
        if (!Number.isFinite(id)) {
          throw new Error(
            `Reindex verification failed: non-numeric recipeId for dbKey ${child.key}`
          );
        }
        verifyIds.push(id);
      });
      verifyIds.sort((a, b) => a - b);

      if (verifyIds.length !== total) {
        throw new Error(
          `Reindex verification failed: expected ${total} recipeIds but saw ${verifyIds.length}`
        );
      }
      for (let i = 0; i < verifyIds.length; i++) {
        if (verifyIds[i] !== i) {
          throw new Error(
            `Reindex verification failed: expected recipeId ${i} but saw ${verifyIds[i]}`
          );
        }
      }
    },
    async login(context, payload) {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password);
      if (user) {
        context.commit("setCurrentUser", user);
      } else {
        throw new Error("Login failed");
      }
    },
    async loginWithGoogle(context) {
      const provider = new firebase.auth.GoogleAuthProvider();
      const user = await firebase.auth().signInWithPopup(provider);
      if (user) {
        context.commit("setCurrentUser", user);
      } else {
        throw new Error("Login with Google failed");
      }
    },
    async checkAdmin(context) {
      if (store.state.currentUser) {
        if (
          store.state.currentUser.email === "jacob.klaren@me.com" ||
          store.state.currentUser.email === "klarenjacob00@gmail.com"
        ) {
          context.commit("setAdmin", true);
        }
      }
    },
    async register(context, payload) {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password);
      if (user) {
        context.commit("setCurrentUser", user);
      } else {
        throw new Error("Register failed");
      }
    },
    async logout(context) {
      await firebase.auth().signOut();
      context.commit("setCurrentUser", null);
    },
  },
  getters: {},
});

firebase.auth().onAuthStateChanged((user) => {
  store.commit("setAuthIsReady", true);
  store.commit("setCurrentUser", user);

  store.dispatch("checkAdmin");
});

store.dispatch("fetchRecipesList");

export default store;
