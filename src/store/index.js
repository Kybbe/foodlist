import { createStore } from "vuex";

import "../../firebaseConfigInit";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const store = createStore({
  state: {
    recipesList: [],
    shoppingLists: [],

    recipesReady: false,
    shoppingListsReady: false,

    selectedRecipe: null,
    selectedList: null,

    currentUser: null,
    authIsReady: false,
    admin: false,

    minimizeRecipeCards: false,
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

    setShoppingLists(state, payload) {
      state.shoppingLists = payload;
    },
    addShoppingList(state, payload) {
      state.shoppingLists.push(payload);
    },
    removeShoppingList(state, payload) {
      state.shoppingLists.splice(payload, 1);
    },
    changeShoppingList(state, payload) {
      state.shoppingLists[payload.index] = payload.shoppingList;
    },

    setShoppingListsReady(state, payload) {
      state.shoppingListsReady = payload;
    },
    setSelectedList(state, payload) {
      state.selectedList = payload;
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

    setMinimizeRecipeCards(state, payload) {
      state.minimizeRecipeCards = payload;

      localStorage.setItem("cardsMinimized", state.minimizeRecipeCards);
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
    async fetchShoppingLists(context) {
      let db = firebase.database().ref("shoppingLists");

      db.on("child_added", (snapshot) => {
        context.commit("addShoppingList", snapshot.val());
        context.commit("setShoppingListsReady", true);
      });

      db.on("child_removed", (snapshot) => {
        let index = store.state.shoppingLists.findIndex(
          (shoppingList) =>
            shoppingList.shoppingListId === snapshot.val().shoppingListId
        );
        context.commit("removeShoppingList", index);
      });

      db.on("child_changed", (snapshot) => {
        let index = store.state.shoppingLists.findIndex(
          (shoppingList) =>
            shoppingList.shoppingListId === snapshot.val().shoppingListId
        );
        context.commit("changeShoppingList", {
          index: index,
          shoppingList: snapshot.val(),
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

    async getLocalStorageMinimizeRecipeCards(context) {
      let minimizeRecipeCards = localStorage.getItem("cardsMinimized");
      let parsedMin = JSON.parse(minimizeRecipeCards);
      if (parsedMin) {
        context.commit("setMinimizeRecipeCards", parsedMin);
      }
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
store.dispatch("fetchShoppingLists");
store.dispatch("getLocalStorageMinimizeRecipeCards");

export default store;
