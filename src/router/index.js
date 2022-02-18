import { createRouter, createWebHashHistory } from "vue-router";
import recipeList from "../views/recipe-list.vue";
import recipe from "../views/recipe.vue";
import addRecipe from "../views/add-recipe.vue";
import editRecipe from "../views/edit-recipe.vue";
import login from "../views/login.vue";
import register from "../views/register.vue";

import "../../firebaseConfigInit";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var recipesListObject = [];

let db = firebase.database().ref("recipes");

db.on("child_added", (snapshot) => {
  recipesListObject.push(snapshot.val());
});

db.on("child_removed", (snapshot) => {
  let index = recipesListObject.findIndex(
    (recipe) => recipe.recipeId === snapshot.val().recipeId
  );
  recipesListObject.splice(index, 1);
});

db.on("child_changed", (snapshot) => {
  let index = recipesListObject.findIndex(
    (recipe) => recipe.recipeId === snapshot.val().recipeId
  );
  recipesListObject[index] = snapshot.val();
});

const routes = [
  {
    path: "/",
    name: "recipeList",
    component: recipeList,
    props: {
      recipesList: recipesListObject,
    },
    meta: {
      title: "RecipeList",
    },
    beforeEnter: (to, from, next) => {
      let checkExist = setInterval(function () {
        if (recipesListObject.length > 0) {
          clearInterval(checkExist);
          next();
        }
      }, 400);
    },
  },
  {
    path: "/recipe/:id",
    name: "recipe",
    component: recipe,
    props: {
      recipe: recipesListObject,
    },
    meta: {
      title: "Recipe",
    },
    beforeEnter: (to, from, next) => {
      let checkExist = setInterval(function () {
        if (recipesListObject.length > 0) {
          clearInterval(checkExist);
          next();
        }
      }, 400);
    },
  },
  {
    path: "/add",
    name: "addRecipe",
    component: addRecipe,
    props: {
      recipesList: recipesListObject,
    },
    meta: {
      title: "Add recipe",
      authRequired: true,
    },
    beforeEnter: (to, from, next) => {
      let checkExist = setInterval(function () {
        if (recipesListObject.length > 0) {
          clearInterval(checkExist);
          next();
        }
      }, 400);
    },
  },
  {
    path: "/Login",
    name: "Login",
    component: login,
    meta: {
      title: "Login",
      guestRequired: true,
    },
  },
  {
    path: "/Register",
    name: "Register",
    component: register,
    meta: {
      title: "Register",
      guestRequired: true,
    },
  },
  {
    path: "/edit/:id",
    name: "editRecipe",
    component: editRecipe,
    props: {
      recipesList: recipesListObject,
    },
    meta: {
      title: "Edit recipe",
      authRequired: true,
    },
    beforeEnter: (to, from, next) => {
      let checkExist = setInterval(function () {
        if (recipesListObject.length > 0) {
          clearInterval(checkExist);
          next();
        }
      }, 400);
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    if (firebase.auth().currentUser) {
      next();
    } else {
      alert("You must be logged in to see this page");
      next({
        path: "/Login",
      });
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guestRequired)) {
    if (!firebase.auth().currentUser) {
      next();
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    (el) => el.parentNode.removeChild(el)
  );

  if (!nearestWithMeta) return next();

  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

export default router;
