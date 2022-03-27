import { createRouter, createWebHashHistory } from "vue-router";
import recipeList from "../views/recipe-list.vue";
import recipePage from "../views/recipePage.vue";
import addRecipe from "../views/add-recipe.vue";
import editRecipe from "../views/edit-recipe.vue";
import loginPage from "../views/loginPage.vue";
import registerPage from "../views/registerPage.vue";

import store from "../store/index";

const routes = [
  {
    path: "/",
    name: "recipeList",
    component: recipeList,
    meta: {
      title: "RecipeList",
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
    component: recipePage,
    meta: {
      title: "Recipe",
    },
  },
  {
    path: "/add",
    name: "addRecipe",
    component: addRecipe,
    meta: {
      title: "Add recipe",
      authRequired: true,
    },
  },
  {
    path: "/Login",
    name: "Login",
    component: loginPage,
    meta: {
      title: "Login",
      guestRequired: true,
    },
  },
  {
    path: "/Register",
    name: "Register",
    component: registerPage,
    meta: {
      title: "Register",
      guestRequired: true,
    },
  },
  {
    path: "/edit/:id",
    name: "editRecipe",
    component: editRecipe,
    meta: {
      title: "Edit recipe",
      authRequired: true,
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
  if (to.matched.some((record) => record.meta.authRequired)) {
    //wait until store.state.authIsReady is true
    if (store.state.currentUser) {
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
    if (!store.state.currentUser) {
      next();
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (from.matched.some((record) => record.meta.title === "RecipeList")) {
    localStorage.setItem(
      "scrollLength",
      window.pageYOffset ||
        (document.documentElement || document.body.parentNode || document.body)
          .scrollTop
    );
    console.log("Scrolled to: " + localStorage.getItem("scrollLength"));
  }
  next();
});

router.beforeEach((to, from, next) => {
  // Go to top of page before loading new page
  if (to.matched.some((record) => record.meta.title !== "RecipeList")) {
    window.scrollTo(0, 0);
  }
  // in RecipeList, scroll goes to last position
  next();
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
