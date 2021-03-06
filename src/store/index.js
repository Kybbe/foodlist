import { createStore } from "vuex";

import "../../firebaseConfigInit";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const store = createStore({
  state: {
    recipesList: [],
    recipesReady: false,
    currentUser: null,
    authIsReady: false,
    selectedRecipe: null,
    admin: false,
  },
  mutations: {
    setRecipesList(state, payload) {
      state.recipesList = payload;
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
      state.recipesReady = payload;
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
      let db = firebase.database().ref("recipes");

      db.on("child_added", (snapshot) => {
        context.commit("addToRecipesList", snapshot.val());
        context.commit("setRecipesReady", true);
      });

      db.on("child_removed", (snapshot) => {
        let index = store.state.recipesList.findIndex(
          (recipe) => recipe.recipeId === snapshot.val().recipeId
        );
        context.commit("removeFromRecipesList", index);
      });

      db.on("child_changed", (snapshot) => {
        let index = store.state.recipesList.findIndex(
          (recipe) => recipe.recipeId === snapshot.val().recipeId
        );
        context.commit("changeRecipeList", {
          index: index,
          recipe: snapshot.val(),
        });
      });
    },
    async login(context, payload) {
      let user = await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password);
      if (user) {
        context.commit("setCurrentUser", user);
      } else {
        throw new Error("Login failed");
      }
    },
    async loginWithGoogle(context) {
      let provider = new firebase.auth.GoogleAuthProvider();
      let user = await firebase.auth().signInWithPopup(provider);
      if (user) {
        context.commit("setCurrentUser", user);
      } else {
        throw new Error("Login with Google failed");
      }
    },
    async checkAdmin(context) {
      if (store.state.currentUser) {
        if (
          store.state.currentUser.email == "jacob.klaren@me.com" ||
          store.state.currentUser.email == "klarenjacob00@gmail.com"
        ) {
          context.commit("setAdmin", true);
        }
      }
    },
    async register(context, payload) {
      let user = await firebase
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
