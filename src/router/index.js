import { createRouter, createWebHashHistory } from "vue-router";
import recipeList from "../views/recipe-list.vue";
import recipePage from "../views/recipePage.vue";
import addRecipe from "../views/add-recipe.vue";
import editRecipe from "../views/edit-recipe.vue";
import loginPage from "../views/loginPage.vue";
import registerPage from "../views/registerPage.vue";

import shoppingLists from "../views/shoppingLists.vue";
import shoppingList from "../views/shoppingList.vue";

import store from "../store/index";

const routes = [
  {
    path: "/",
    name: "recipeList",
    component: recipeList,
    meta: {
      title: "RecipeList",
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
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: recipeList,
    meta: {
      title: "RecipeList",
    },
  },
  {
    path: "/shoppingLists",
    name: "shoppingLists",
    component: shoppingLists,
    meta: {
      title: "ShoppingLists",
    },
  },
  {
    path: "/shoppingList/:id",
    name: "shoppingList",
    component: shoppingList,
    meta: {
      title: "ShoppingList",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

function checkAuthIsReady() {
  return new Promise((resolve) => {
    if (store.state.authIsReady) {
      resolve();
    } else {
      const unsubscribe = store.watch(
        (state) => state.authIsReady,
        (authIsReady) => {
          if (authIsReady) {
            unsubscribe();
            resolve();
          }
        }
      );
    }
  });
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    checkAuthIsReady().then(() => {
      if (store.state.currentUser) {
        next();
      } else {
        alert("You must be logged in to see this page");
        next({
          path: "/Login",
        });
      }
    });
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
  if (to.matched.some((record) => record.meta.title === "ShoppingLists")) {
    localStorage.setItem(
      "scrollLengthShoppingLists",
      window.pageYOffset ||
        (document.documentElement || document.body.parentNode || document.body)
          .scrollTop
    );
    console.log(
      "Scrolled to: " + localStorage.getItem("scrollLengthShoppingLists")
    );
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
