import { createRouter, createWebHashHistory } from "vue-router";
import recipeList from "../views/recipe-list";
import recipe from "../components/recipe";

var recipesListObject = [
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
    ingredients: [
      { amount: 4, measurment: "Portioner", name: "Pasta" },
    ],
    link: "https://www.google.com",
    imgLink:
      "https://assets.icanet.se/e_sharpen:80,q_auto,dpr_1.25,w_718,h_718,c_lfill/imagevaultfiles/id_207924/cf_259/pasta_med_kramig_ost-_och_skinksas.jpg",
  },
];

const routes = [
  {
    path: "/",
    name: "recipeList",
    component: recipeList,
    props: {
      recipesList: recipesListObject,
    },
  },
  {
    path: "/recipe/:id",
    name: "recipe",
    component: recipe,
    props: {
      recipe: recipesListObject,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
