import { createRouter, createWebHashHistory } from "vue-router";
import recipeList from "../views/recipe-list";
import recipe from "../views/recipe";
import addRecipe from "../views/add-recipe";
import login from "../views/login";
import register from "../views/register";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDqfqIZoRXgkZJadMG5km-YZa3O1x344uA",
  authDomain: "foodlist-0921.firebaseapp.com",
  databaseURL:
    "https://foodlist-0921-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "foodlist-0921",
  storageBucket: "foodlist-0921.appspot.com",
  messagingSenderId: "652727898134",
  appId: "1:652727898134:web:bbdf18c26aa6696fe12537",
};

firebase.initializeApp(firebaseConfig);

/* var recipesListObject = [
  {
    recipeId: 0,
    title: "Pasta med ost- och skinksås",
    description:
      "Ibland vill man bara fixa ihop en enkel men god pasta till middag! Då har du denna krämiga pastarätt med ost- och skinksås. Prästost ger en perfekt smak till såsen, och du adderar gräslök och tomater på toppen innan servering!",
    instructions: [
      {
        id: 0,
        checked: false,
        text: "Koka pastan enligt anvisningen på förpackningen.",
      },
      {
        id: 1,
        checked: false,
        text: "Blanda i grädden och majsstärkelsen utrörd i mjölken. Koka upp under upprörning. Rör i skinkan och osten och låt allt bli varmt. Smaka av med salt och peppar.",
      },
      {
        id: 2,
        checked: false,
        text: "Skär tomaterna och hacka gräslöken.",
      },
      {
        id: 3,
        checked: false,
        text: "Servera pastan med ost- och skinksåsen, tomater och gräslök.",
      },
    ],
    ingredients: [
      { amount: 4, measurment: "Portioner", name: "Pasta" },
      { amount: 1, measurment: "msk", name: "Smör eller olja" },
      { amount: 2.5, measurment: "dl", name: "Matlagningsgrädde" },
      { amount: 1.5, measurment: "dl", name: "Mjölk" },
      { amount: 2, measurment: "tsk", name: "Majsstärkelse" },
      { amount: 2, measurment: "Förpackningar", name: "Strimlad Skinka" },
      { amount: 1.5, measurment: "dl", name: "Riven smakrik ost" },
      { amount: "", measurment: "", name: "Salt" },
      { amount: "", measurment: "", name: "Peppar" },
    ],
    link: "https://www.ica.se/recept/pasta-med-kramig-ost-och-skinksas-725815/",
    imgLink:
      "https://assets.icanet.se/e_sharpen:80,q_auto,dpr_1.25,w_718,h_718,c_lfill/imagevaultfiles/id_207924/cf_259/pasta_med_kramig_ost-_och_skinksas.jpg",
  },
  {
    recipeId: 1,
    title: "Pasta med",
    description: "Ibland",
    instructions: [
      {
        id: 0,
        checked: false,
        text: "Koka pastan enligt anvisningen på förpackningen.",
      },
    ],
    ingredients: [{ amount: 4, measurment: "Portioner", name: "Pasta" }],
    link: "https://www.google.com",
    imgLink:
      "https://assets.icanet.se/e_sharpen:80,q_auto,dpr_1.25,w_718,h_718,c_lfill/imagevaultfiles/id_207924/cf_259/pasta_med_kramig_ost-_och_skinksas.jpg",
  },
]; */

var recipesListObject = [];

firebase
  .database()
  .ref("recipes")
  .on("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      recipesListObject.push(childSnapshot.val());
    });
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
      }, 400); // check every 100ms
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
      }, 400); // check every 100ms
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
      }, 400); // check every 100ms
    },
  },
  {
    path: "/Login",
    name: "Login",
    component: login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/Register",
    name: "Register",
    component: register,
    meta: {
      title: "Register",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
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
