(function(e){function t(t){for(var i,a,o=t[0],s=t[1],u=t[2],d=0,p=[];d<o.length;d++)a=o[d],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&p.push(r[a][0]),r[a]=0;for(i in s)Object.prototype.hasOwnProperty.call(s,i)&&(e[i]=s[i]);l&&l(t);while(p.length)p.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],i=!0,o=1;o<n.length;o++){var s=n[o];0!==r[s]&&(i=!1)}i&&(c.splice(t--,1),e=a(a.s=n[0]))}return e}var i={},r={app:0},c=[];function a(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=i,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],s=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var l=s;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"13ef":function(e,t,n){"use strict";n("820c")},"224d":function(e,t,n){"use strict";n("f80a")},"2d20":function(e,t,n){"use strict";n("cedd")},4440:function(e,t,n){},"4da3":function(e,t,n){},5053:function(e,t,n){"use strict";n("e2de")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("7a23");function r(e,t,n,r,c,a){var o=Object(i["B"])("router-view");return Object(i["u"])(),Object(i["d"])(o)}var c={name:"App"},a=(n("b64f"),n("6b0d")),o=n.n(a);const s=o()(c,[["render",r]]);var u=s,l=(n("c740"),n("a434"),n("d3b7"),n("7db0"),n("fb6a"),n("d81d"),n("a630"),n("3ca3"),n("159b"),n("b64b"),n("6c02")),d=(n("a4d3"),n("e01a"),function(e){return Object(i["x"])("data-v-d88cd56a"),e=e(),Object(i["v"])(),e}),p={class:"searchArea"},m=d((function(){return Object(i["g"])("option",{value:"recipeId"},"Recipe Id",-1)})),g=d((function(){return Object(i["g"])("option",{value:"alphabetically"},"Alphabetically",-1)})),b=[m,g],f={id:"randomContainer"},h=Object(i["i"])("Go to random recipe"),v={class:"cardList"},j=d((function(){return Object(i["g"])("div",{class:"plateIcon"},[Object(i["g"])("svg",{"aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"utensils",class:"svg-inline--fa fa-utensils fa-w-13",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 416 512"},[Object(i["g"])("path",{fill:"currentColor",d:"M207.9 15.2c.8 4.7 16.1 94.5 16.1 128.8 0 52.3-27.8 89.6-68.9 104.6L168 486.7c.7 13.7-10.2 25.3-24 25.3H80c-13.7 0-24.7-11.5-24-25.3l12.9-238.1C27.7 233.6 0 196.2 0 144 0 109.6 15.3 19.9 16.1 15.2 19.3-5.1 61.4-5.4 64 16.3v141.2c1.3 3.4 15.1 3.2 16 0 1.4-25.3 7.9-139.2 8-141.8 3.3-20.8 44.7-20.8 47.9 0 .2 2.7 6.6 116.5 8 141.8.9 3.2 14.8 3.4 16 0V16.3c2.6-21.6 44.8-21.4 48-1.1zm119.2 285.7l-15 185.1c-1.2 14 9.9 26 23.9 26h56c13.3 0 24-10.7 24-24V24c0-13.2-10.7-24-24-24-82.5 0-221.4 178.5-64.9 300.9z"})])],-1)})),O=[j],y={class:"card-body"},I={class:"card-title"},k={class:"card-text"},x={class:"extras"},L={class:"card-ingredients"},w=Object(i["i"])(" Ingredients "),R={class:"card-steps"},_=Object(i["i"])(" Steps ");function B(e,t,n,r,c,a){var o=Object(i["B"])("navbar"),s=Object(i["B"])("router-link");return Object(i["u"])(),Object(i["f"])(i["a"],null,[Object(i["j"])(o),Object(i["g"])("div",p,[Object(i["K"])(Object(i["g"])("select",{name:"sortBy",id:"select","onUpdate:modelValue":t[0]||(t[0]=function(e){return c.sortBy=e})},b,512),[[i["G"],c.sortBy]]),Object(i["K"])(Object(i["g"])("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=function(e){return c.searchValue=e}),placeholder:"Search Recipe",id:"search-input"},null,512),[[i["H"],c.searchValue]])]),Object(i["g"])("div",f,[Object(i["j"])(s,{to:"/recipe/"+this.randomNumber,id:"randomRecipe"},{default:Object(i["J"])((function(){return[h]})),_:1},8,["to"])]),Object(i["g"])("div",v,[(Object(i["u"])(!0),Object(i["f"])(i["a"],null,Object(i["A"])(a.searchResult,(function(e){return Object(i["u"])(),Object(i["f"])("div",{class:"card",key:e.title},[Object(i["j"])(s,{to:"/recipe/"+e.recipeId},{default:Object(i["J"])((function(){return[Object(i["g"])("div",{class:"imgPart",style:Object(i["q"])(a.backgroundimg(e.imgLink))},O,4),Object(i["g"])("div",y,[Object(i["g"])("h2",I,Object(i["D"])(e.title),1),Object(i["g"])("p",k,Object(i["D"])(e.description),1),Object(i["g"])("div",x,[Object(i["g"])("p",L,[Object(i["g"])("span",null,Object(i["D"])(e.ingredients.length),1),w]),Object(i["g"])("p",R,[Object(i["g"])("span",null,Object(i["D"])(e.instructions.length),1),_])])])]})),_:2},1032,["to"])])})),128))])],64)}n("4de4"),n("caad"),n("2532"),n("4e82"),n("9911");var E=function(e){return Object(i["x"])("data-v-77862917"),e=e(),Object(i["v"])(),e},A={class:"header"},C={class:"navStuff"},S=E((function(){return Object(i["g"])("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1",id:"Capa_1",x:"0px",y:"0px",viewBox:"0 0 27.02 27.02",style:{"enable-background":"new 0 0 27.02 27.02",width:"27px"},"xml:space":"preserve"},[Object(i["g"])("g",null,[Object(i["g"])("path",{style:{fill:"#030104"},d:"M3.674,24.876c0,0-0.024,0.604,0.566,0.604c0.734,0,6.811-0.008,6.811-0.008l0.01-5.581   c0,0-0.096-0.92,0.797-0.92h2.826c1.056,0,0.991,0.92,0.991,0.92l-0.012,5.563c0,0,5.762,0,6.667,0   c0.749,0,0.715-0.752,0.715-0.752V14.413l-9.396-8.358l-9.975,8.358C3.674,14.413,3.674,24.876,3.674,24.876z"}),Object(i["g"])("path",{style:{fill:"#030104"},d:"M0,13.635c0,0,0.847,1.561,2.694,0l11.038-9.338l10.349,9.28c2.138,1.542,2.939,0,2.939,0   L13.732,1.54L0,13.635z"}),Object(i["g"])("polygon",{style:{fill:"#030104"},points:"23.83,4.275 21.168,4.275 21.179,7.503 23.83,9.752  "})])],-1)})),N=["href"],T=Object(i["i"])(" Add Recipe "),q={class:"accountStuff"},V=Object(i["i"])(" Login "),D=Object(i["i"])(" Register ");function U(e,t,n,r,c,a){var o=Object(i["B"])("router-link");return Object(i["u"])(),Object(i["f"])("div",A,[Object(i["g"])("div",C,[Object(i["j"])(o,{to:"/"},{default:Object(i["J"])((function(){return[S]})),_:1}),this.link?(Object(i["u"])(),Object(i["f"])("a",{key:0,href:n.link,target:"_blank"},"Original Recipe",8,N)):Object(i["e"])("",!0),c.loggedIn?(Object(i["u"])(),Object(i["d"])(o,{key:1,to:"/add"},{default:Object(i["J"])((function(){return[T]})),_:1})):Object(i["e"])("",!0)]),Object(i["g"])("div",q,[c.loggedIn?Object(i["e"])("",!0):(Object(i["u"])(),Object(i["d"])(o,{key:0,to:"/login"},{default:Object(i["J"])((function(){return[V]})),_:1})),c.loggedIn?Object(i["e"])("",!0):(Object(i["u"])(),Object(i["d"])(o,{key:1,to:"/register"},{default:Object(i["J"])((function(){return[D]})),_:1})),c.loggedIn?(Object(i["u"])(),Object(i["f"])("button",{key:2,onClick:t[0]||(t[0]=function(){return a.logout&&a.logout.apply(a,arguments)}),class:"logOut"},"logout")):Object(i["e"])("",!0)])])}var P=n("260b"),M=(n("ea7b"),{name:"Navbar",props:{link:{type:String}},data:function(){return{loggedIn:!1}},methods:{IsLoggedIn:function(){var e=P["a"].auth().currentUser;this.loggedIn=!!e},logout:function(){var e=this;P["a"].auth().signOut().then((function(){e.loggedIn=!1,e.$router.push("/")})).catch((function(t){alert(t.message),e.$router.push("/")}))}},mounted:function(){var e=this;setTimeout((function(){e.IsLoggedIn()}),10)}});n("2d20");const H=o()(M,[["render",U],["__scopeId","data-v-77862917"]]);var K=H,$={name:"RecipeList",components:{navbar:K},props:{recipesList:{type:Array,required:!0}},data:function(){return{searchValue:"",sortBy:"recipeId",randomNumber:0}},methods:{backgroundimg:function(e){return""==e&&(e="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/330px-Good_Food_Display_-_NCI_Visuals_Online.jpg"),{"background-image":"url(".concat(e,")")}}},computed:{searchResult:function(){var e=this,t=this.recipesList;return""!=this.searchValue&&this.searchValue&&(t=t.filter((function(t){return t.title.toUpperCase().includes(e.searchValue.toUpperCase())}))),t=t.sort((function(t,n){if("alphabetically"==e.sortBy){var i=t.title.toLowerCase(),r=n.title.toLowerCase();return i<r?-1:i>r?1:0}if("recipeId"==e.sortBy)return t.recipeId-n.recipeId})),t}},mounted:function(){this.randomNumber=Math.floor(Math.random()*this.recipesList.length)}};n("a725");const G=o()($,[["render",B],["__scopeId","data-v-d88cd56a"]]);var J=G,F={id:"content"},W={class:"bigCard card",style:{display:"flex","flex-wrap":"wrap","justify-content":"space-evenly",padding:"0px"}},z={class:"mediumCard card"},Y={class:"mediumCard card"},Z={id:"footer"},Q=Object(i["i"])(" Edit this recipe ");function X(e,t,n,r,c,a){var o=Object(i["B"])("navbar"),s=Object(i["B"])("mainArea"),u=Object(i["B"])("ingredients"),l=Object(i["B"])("instruction"),d=Object(i["B"])("router-link");return Object(i["u"])(),Object(i["f"])(i["a"],null,[Object(i["j"])(o,{link:n.recipe[c.currentRecipeId].link},null,8,["link"]),Object(i["g"])("div",F,[Object(i["g"])("div",W,[Object(i["j"])(s,{title:n.recipe[c.currentRecipeId].title,description:n.recipe[c.currentRecipeId].description,imgLink:n.recipe[c.currentRecipeId].imgLink},null,8,["title","description","imgLink"])]),Object(i["g"])("div",z,[Object(i["j"])(u,{ingredients:n.recipe[c.currentRecipeId].ingredients},null,8,["ingredients"])]),Object(i["g"])("div",Y,[Object(i["j"])(l,{instructions:n.recipe[c.currentRecipeId].instructions},null,8,["instructions"])])]),Object(i["g"])("div",Z,[c.admin?(Object(i["u"])(),Object(i["f"])("button",{key:0,id:"delete",onClick:t[0]||(t[0]=function(){return a.confirmDelete&&a.confirmDelete.apply(a,arguments)})}," Delete this recipe ")):Object(i["e"])("",!0),c.admin?(Object(i["u"])(),Object(i["d"])(d,{key:1,to:"/edit/"+c.currentRecipeId},{default:Object(i["J"])((function(){return[Q]})),_:1},8,["to"])):Object(i["e"])("",!0)])],64)}var ee={id:"descriptionContainer"},te={class:"description"},ne={id:"imgContainer"},ie=["src"];function re(e,t,n,r,c,a){return Object(i["u"])(),Object(i["f"])(i["a"],null,[Object(i["g"])("div",ee,[Object(i["g"])("h2",null,Object(i["D"])(n.title),1),Object(i["g"])("p",te,Object(i["D"])(n.description),1)]),Object(i["g"])("div",ne,[Object(i["g"])("img",{src:c.imgLinkAndTemplate,alt:"image of the dish"},null,8,ie)])],64)}var ce={name:"mainArea",props:{title:{type:String,required:!0},description:{type:String,required:!0},imgLink:{type:String,required:!0}},data:function(){return{templateImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/330px-Good_Food_Display_-_NCI_Visuals_Online.jpg",imgLinkAndTemplate:""}},mounted:function(){""==this.imgLink?this.imgLinkAndTemplate=this.templateImg:this.imgLinkAndTemplate=this.imgLink}};n("e1c5");const ae=o()(ce,[["render",re],["__scopeId","data-v-81736546"]]);var oe=ae,se=function(e){return Object(i["x"])("data-v-3684d254"),e=e(),Object(i["v"])(),e},ue=se((function(){return Object(i["g"])("h2",{style:{"text-align":"center"}},"Instructions",-1)})),le={class:"instruction"},de=["name","id","onUpdate:modelValue","onClick"],pe=["for"];function me(e,t,n,r,c,a){return Object(i["u"])(),Object(i["f"])(i["a"],null,[ue,Object(i["g"])("ol",le,[(Object(i["u"])(!0),Object(i["f"])(i["a"],null,Object(i["A"])(n.instructions,(function(e){return Object(i["u"])(),Object(i["f"])("li",{key:e.id,class:Object(i["p"])({checked:e.checked})},[Object(i["K"])(Object(i["g"])("input",{type:"checkbox",name:e.id,id:e.id,"onUpdate:modelValue":function(t){return e.checked=t},onClick:function(t){return a.checkInstruction(e)}},null,8,de),[[i["F"],e.checked]]),Object(i["g"])("label",{for:e.id},Object(i["D"])(e.text),9,pe)],2)})),128))])],64)}var ge={name:"instruction",props:{instructions:{type:Array,required:!0}},methods:{checkInstruction:function(e){var t=document.getElementById(e.id).parentElement;e.checked?t.classList.remove("checked"):t.classList.add("checked")}}};n("5053");const be=o()(ge,[["render",me],["__scopeId","data-v-3684d254"]]);var fe=be,he=(n("b0c0"),n("99af"),function(e){return Object(i["x"])("data-v-588e4b2a"),e=e(),Object(i["v"])(),e}),ve=he((function(){return Object(i["g"])("h2",null,"Ingredients",-1)})),je={id:"servingsContainer"},Oe=he((function(){return Object(i["g"])("svg",{version:"1.1",viewBox:"0 0 32 32",role:"presentation","aria-label":"Decrease servings",class:"svg-icon svg-fill"},[Object(i["g"])("path",{pid:"0","fill-rule":"evenodd",d:"M23.768 15H9a.249.249 0 00-.223.138l-.75 1.5A.25.25 0 008.25 17h15.518a.258.258 0 00.259-.259v-1.483a.258.258 0 00-.26-.258"})],-1)})),ye=[Oe],Ie=["placeholder","value"],ke=he((function(){return Object(i["g"])("label",{for:"portions"},"Servings",-1)})),xe=he((function(){return Object(i["g"])("svg",{version:"1.1",viewBox:"0 0 32 32",role:"presentation","aria-label":"Increase servings",class:"svg-icon svg-fill"},[Object(i["g"])("path",{pid:"0","fill-rule":"evenodd",d:"M23.768 14.994h-6.744V8.258A.26.26 0 0016.766 8h-1.477a.257.257 0 00-.262.262v6.732H9a.249.249 0 00-.223.138l-.75 1.5a.25.25 0 00.223.362h6.777v6.748c0 .142.116.258.258.258l1.48-.004a.25.25 0 00.259-.258v-6.744h6.744a.258.258 0 00.259-.259v-1.483a.258.258 0 00-.26-.258"})],-1)})),Le=[xe],we={class:"ingredients"};function Re(e,t,n,r,c,a){return Object(i["u"])(),Object(i["f"])(i["a"],null,[ve,Object(i["g"])("h4",null,Object(i["D"])(n.ingredients.length)+" Ingredients",1),Object(i["g"])("div",je,[Object(i["g"])("button",{onClick:t[0]||(t[0]=function(e){return a.remove2Portions()})},ye),Object(i["g"])("input",{name:"portions",id:"portions",placeholder:this.portions,value:this.portions,onChange:t[1]||(t[1]=function(){return a.changeToPortions&&a.changeToPortions.apply(a,arguments)})},null,40,Ie),ke,Object(i["g"])("button",{onClick:t[2]||(t[2]=function(e){return a.add2Portions()})},Le)]),Object(i["g"])("ul",we,[(Object(i["u"])(!0),Object(i["f"])(i["a"],null,Object(i["A"])(n.ingredients,(function(e){return Object(i["u"])(),Object(i["f"])("li",{key:e.name},Object(i["D"])(" ".concat(e.amount," ").concat(e.measurment," ").concat(e.name," ")),1)})),128))])],64)}var _e={name:"ingredients",props:{ingredients:{type:Array,required:!0}},data:function(){return{portions:4}},methods:{add2Portions:function(){var e=this,t=this.portions+2;this.checkServings(t)&&(this.ingredients.forEach((function(n){""!=n.amount&&(n.amount/=e.portions,Math.round(n.amount*=t))})),this.portions+=2)},remove2Portions:function(){var e=this,t=this.portions-2;this.checkServings(t)&&(this.ingredients.forEach((function(n){""!=n.amount&&(n.amount/=e.portions,Math.round(n.amount*=t))})),this.portions-=2)},changeToPortions:function(e){var t=this;if("number"==typeof e)var n=e;else n=parseInt(e.target.value);if(this.checkServings(n)&&n%2==0&&this.portions!=n){var i=this.portions;this.portions=n,this.ingredients.forEach((function(e){""!=e.amount&&(e.amount/=i,Math.round(e.amount*=t.portions))}))}},checkServings:function(e){return""==e?(document.getElementById("portions").value=this.portions,!1):e>98?(alert("You can't have more than 98 servings!"),document.getElementById("portions").value=98,this.changeToPortions(98),!1):e<2?(alert("You can't have less than 2 servings!"),document.getElementById("portions").value=2,this.changeToPortions(2),!1):!isNaN(e)||(document.getElementById("portions").value=this.portions,!1)}}};n("b09a");const Be=o()(_e,[["render",Re],["__scopeId","data-v-588e4b2a"]]);var Ee=Be,Ae=(n("66ce"),{name:"recipe",components:{mainArea:oe,instruction:fe,ingredients:Ee,Navbar:K},props:{recipe:{type:Object,required:!0}},data:function(){return{currentRecipeId:this.$route.params.id,admin:!1}},methods:{IsAdmin:function(){var e=P["a"].auth().currentUser;e&&("jacob.klaren@me.com"!=e.email&&"klarenjacob00@gmail.com"!=e.email||(this.admin=!0))},deleteRecipe:function(){var e=this,t=[],n=P["a"].database().ref("recipes");if(n.on("value",(function(e){e.forEach((function(e){t.push(e.key)}))})),n.child(t[this.currentRecipeId]).remove(),alert("Recipe deleted!"),n.on("value",(function(t){t.forEach((function(t){t.val().recipeId>e.currentRecipeId&&(console.log("updating recipeId"),n.child(t.key).update({recipeId:t.val().recipeId-1}))}))})),1==t.length){var i={title:"Add a recipe",description:"Since this database shouldn't be empty, you should add a recipe!",recipeId:"0",ingredients:[{amount:"2",unit:"Large",name:"OOF's"}],instructions:[{checked:!1,id:"0",text:"Add a recipe"}],servings:"4",link:"foodlist-0921.web.app/#/add",imgLink:""};n.push(i)}this.$router.push("/")},confirmDelete:function(){confirm("Are you sure you want to delete this recipe? \r\nThis action cannot be undone.")&&this.deleteRecipe()}},mounted:function(){this.IsAdmin()}});n("13ef");const Ce=o()(Ae,[["render",X],["__scopeId","data-v-3c19681f"]]);var Se=Ce,Ne=function(e){return Object(i["x"])("data-v-3db78494"),e=e(),Object(i["v"])(),e},Te={id:"addRecipe"},qe=Ne((function(){return Object(i["g"])("h2",null,"Add Recipe",-1)})),Ve={action:""},De={class:"form-group"},Ue=Ne((function(){return Object(i["g"])("label",{for:"recipeName"},"Recipe Name / Title:",-1)})),Pe={class:"form-group"},Me=Ne((function(){return Object(i["g"])("label",{for:"recipeDescription"},"Recipe Description:",-1)})),He={class:"form-group"},Ke=Object(i["h"])('<label for="recipeIngredients" data-v-3db78494>Recipe Ingredients:</label><div id="labels" data-v-3db78494><label for="amount" data-v-3db78494>Quantity:</label><label for="ingredientUnit" data-v-3db78494>Unit:</label><label for="ingredientName" data-v-3db78494>Ingredient Name:</label></div>',2),$e={class:"ingredients"},Ge=Ne((function(){return Object(i["g"])("input",{type:"number",placeholder:"2",name:"amount",class:"amount"},null,-1)})),Je=Ne((function(){return Object(i["g"])("input",{type:"text",placeholder:"Large",name:"measurment"},null,-1)})),Fe={class:"form-group"},We=Ne((function(){return Object(i["g"])("label",{for:"recipeServings"},"Recipe Servings:",-1)})),ze={class:"form-group"},Ye=Ne((function(){return Object(i["g"])("label",{for:"recipeInstructions"},"Recipe Instructions: ",-1)})),Ze={class:"form-group"},Qe=Ne((function(){return Object(i["g"])("label",{for:"recipeImage"},"Original Recipe Link:",-1)})),Xe={class:"form-group"},et=Ne((function(){return Object(i["g"])("label",{for:"recipeImage"},"Recipe Image (Link):",-1)}));function tt(e,t,n,r,c,a){var o=Object(i["B"])("navbar");return Object(i["u"])(),Object(i["f"])(i["a"],null,[Object(i["j"])(o),Object(i["g"])("div",Te,[qe,Object(i["g"])("form",Ve,[Object(i["g"])("div",De,[Ue,Object(i["K"])(Object(i["g"])("input",{type:"text",class:"form-control",id:"recipeName",placeholder:"Tomatoes and Cheese Pasta","onUpdate:modelValue":t[0]||(t[0]=function(e){return c.recipe.title=e}),required:""},null,512),[[i["H"],c.recipe.title]])]),Object(i["g"])("div",Pe,[Me,Object(i["K"])(Object(i["g"])("textarea",{class:"form-control",id:"recipeDescription",rows:"3","onUpdate:modelValue":t[1]||(t[1]=function(e){return c.recipe.description=e}),placeholder:"A simple recipe for a tasty pasta dish with tomatoes and cheese."},null,512),[[i["H"],c.recipe.description]])]),Object(i["g"])("div",He,[Ke,Object(i["g"])("div",$e,[Ge,Je,Object(i["g"])("input",{type:"text",placeholder:"Tomatoes",name:"name",onChange:t[2]||(t[2]=function(){return a.fixIngredients&&a.fixIngredients.apply(a,arguments)}),required:""},null,32)])]),Object(i["g"])("button",{type:"button",onClick:t[3]||(t[3]=function(){return a.addIngredient&&a.addIngredient.apply(a,arguments)})},"Add Ingredient"),c.moreThanOneIngredient?(Object(i["u"])(),Object(i["f"])("button",{key:0,type:"button",onClick:t[4]||(t[4]=function(){return a.removeIngredient&&a.removeIngredient.apply(a,arguments)})}," Remove Ingredient ")):Object(i["e"])("",!0),Object(i["g"])("div",Fe,[We,Object(i["K"])(Object(i["g"])("input",{type:"number",class:"form-control",id:"recipeServings",placeholder:"4","onUpdate:modelValue":t[5]||(t[5]=function(e){return c.recipe.servings=e}),onChange:t[6]||(t[6]=function(){return a.checkServings&&a.checkServings.apply(a,arguments)})},null,544),[[i["H"],c.recipe.servings]])]),Object(i["g"])("div",ze,[Ye,Object(i["g"])("textarea",{class:"form-control",id:"recipeInstructions",rows:"3",onChange:t[7]||(t[7]=function(){return a.fixInstructions&&a.fixInstructions.apply(a,arguments)}),placeholder:"1. Preheat oven to 350 degrees. ,2. Mix ingredients. ,3. Bake for 20 minutes."},null,32)]),Object(i["g"])("div",Ze,[Qe,Object(i["K"])(Object(i["g"])("input",{type:"text",class:"form-control",id:"recipeImage",placeholder:"www.example.com/recipe.html","onUpdate:modelValue":t[8]||(t[8]=function(e){return c.recipe.link=e})},null,512),[[i["H"],c.recipe.link]])]),Object(i["g"])("div",Xe,[et,Object(i["K"])(Object(i["g"])("input",{type:"text",class:"form-control",id:"recipeImage",placeholder:"www.google.com(images/recipe.jpg)","onUpdate:modelValue":t[9]||(t[9]=function(e){return c.recipe.imgLink=e})},null,512),[[i["H"],c.recipe.imgLink]])]),Object(i["g"])("button",{onClick:t[10]||(t[10]=Object(i["L"])((function(){return a.post&&a.post.apply(a,arguments)}),["prevent"])),type:"submit"},"Submit")])])],64)}n("ac1f"),n("1276"),n("a9e3"),n("b680");var nt={name:"AddRecipe",components:{Navbar:K},data:function(){return{recipe:{recipeId:"",title:"",description:"",ingredients:[],instructions:[],servings:"",link:"",imgLink:""},moreThanOneIngredient:!1}},methods:{addIngredient:function(){for(var e=document.getElementsByClassName("ingredients")[0].cloneNode(!0),t=document.getElementsByClassName("ingredients")[0].querySelectorAll("input"),n=0;n<t.length;n++)t[n].value="";document.getElementsByClassName("ingredients")[0].parentNode.appendChild(e),this.moreThanOneIngredient=!0},removeIngredient:function(){var e=document.getElementsByClassName("ingredients");e.length>1&&e[e.length-1].remove(),1==e.length&&(this.moreThanOneIngredient=!1)},fixIngredients:function(){for(var e=[],t=document.getElementsByClassName("ingredients"),n=0;n<t.length;n++){for(var i={},r=t[n].querySelectorAll("input"),c=0;c<r.length;c++)i[r[c].name]=r[c].value;e.push(i)}this.recipe.ingredients=e,this.checkServings()},fixInstructions:function(){var e=document.getElementById("recipeInstructions").value,t=e.split(",").map((function(e,t){return{id:t,checked:!1,text:e}}));this.recipe.instructions=t},checkServings:function(){var e=document.getElementById("recipeServings").value;if(""!=e&&e){if(""==document.getElementsByClassName("amount")[0].value)return;for(var t=this.recipe.ingredients,n=document.getElementsByClassName("amount"),i=0;i<t.length;i++){if(""==n[i].value)return;var r=t[i].amount/e,c=4*r;c=Number(c.toFixed(1)),t[i].amount=c,n[i].value=c}this.recipe.ingredients=t}},post:function(){if("Test JKL"==this.recipe.title)return this.recipe.title="Test",this.recipe.description="Test",this.addRecipeId(),this.recipe.ingredients=[{name:"Test",amount:"1",measurment:"Test"}],this.recipe.instructions=[{id:0,checked:!0,text:"Test"}],this.recipe.servings="4",this.recipe.link="www.google.com",this.recipe.imgLink="",P["a"].database().ref("recipes").push(this.recipe),alert("Recipe added!"),void this.$router.push("/");""!=this.recipe.title&&""!=this.recipe.description&&""!=this.recipe.ingredients&&""!=this.recipe.instructions&&""!=this.recipe.link?(this.addRecipeId(),P["a"].database().ref("recipes").push(this.recipe),alert("Recipe added!"),this.$router.push("/")):alert("Please fill out all fields")},addRecipeId:function(){this.recipe.recipeId=this.recipesList.length}},mounted:function(){this.addRecipeId()},props:{recipesList:Array}};n("7073");const it=o()(nt,[["render",tt],["__scopeId","data-v-3db78494"]]);var rt=it,ct={action:"",id:"container"},at=Object(i["h"])('<input type="text" name="title" id="title" placeholder="title"><input type="text" name="description" id="description" placeholder="description"><input type="text" name="imgLink" id="imgLink" placeholder="imgLink"><div id="ingredientsList"></div><div id="instructionsList"></div><input type="text" name="servings" id="servings" placeholder="servings"><input type="text" name="link" id="link" placeholder="link">',7);function ot(e,t,n,r,c,a){var o=Object(i["B"])("navbar");return Object(i["u"])(),Object(i["f"])(i["a"],null,[Object(i["j"])(o),Object(i["g"])("form",ct,[at,Object(i["g"])("button",{onClick:t[0]||(t[0]=Object(i["L"])((function(){return a.editFirebase&&a.editFirebase.apply(a,arguments)}),["prevent"])),type:"submit",id:"updateRecipeBtn"}," Update ")])],64)}var st={name:"edit-recipe",components:{Navbar:K},props:{recipesList:{type:Array,required:!0}},data:function(){return{admin:!1}},methods:{IsAdmin:function(){var e=P["a"].auth().currentUser;e&&("jacob.klaren@me.com"!=e.email&&"klarenjacob00@gmail.com"!=e.email||(this.admin=!0))},editFirebase:function(){if(this.admin){var e=P["a"].database(),t=P["a"].database().ref("recipes"),n=[];t.on("value",(function(e){e.forEach((function(e){n.push(e.key)}))}));for(var i=e.ref("recipes/"+n[this.$route.params.id]),r=document.getElementById("title").value,c=document.getElementById("description").value,a=[],o=document.getElementsByClassName("editIngredients"),s=0;s<o.length;s++){var u={amount:o[s].querySelectorAll("input")[0].value,measurment:o[s].querySelectorAll("input")[1].value,name:o[s].querySelectorAll("input")[2].value};a.push(u)}for(var l=[],d=document.getElementsByClassName("editInstructions"),p=0;p<d.length;p++){var m={checked:d[p].querySelectorAll("input")[0].value,id:d[p].querySelectorAll("input")[1].value,text:d[p].querySelectorAll("input")[2].value};l.push(m)}var g=document.getElementById("servings").value,b=document.getElementById("link").value,f=document.getElementById("imgLink").value,h=this.$route.params.id,v={title:r,description:c,ingredients:a,instructions:l,servings:g,link:b,imgLink:f,recipeId:h};i.update(v),alert("Recipe updated!"),this.$router.push("/recipe/"+this.$route.params.id)}},putRecipeDetailsInInputs:function(){var e=this.recipesList[this.$route.params.id];document.getElementById("title").value=e.title,document.getElementById("description").value=e.description,document.getElementById("imgLink").value=e.imgLink;for(var t=e.ingredients,n=0;n<t.length;n++){var i=t[n],r=i.amount,c=i.measurment,a=i.name,o=document.createElement("div");o.classList.add("editIngredients"),o.innerHTML='\n\t\t\t\t\t<input type="text" name="amount" class="amount" value="'.concat(r,'">\n\t\t\t\t\t<input type="text" name="measurment" class="measurment" value="').concat(c,'">\n\t\t\t\t\t<input type="text" name="name" class="name" value="').concat(a,'">\n\t\t\t\t'),document.getElementById("ingredientsList").appendChild(o)}for(var s=e.instructions,u=0;u<s.length;u++){var l=s[u],d=l.checked,p=l.id,m=l.text,g=document.createElement("div");g.classList.add("editInstructions"),g.innerHTML='\n\t\t\t\t\t<input type="text" name="checked" class="checked" value="'.concat(d,'">\n\t\t\t\t\t<input type="number" name="id" class="id" value="').concat(p,'">\n\t\t\t\t\t<input type="text" name="text" class="text" value="').concat(m,'">\n\t\t\t\t'),document.getElementById("instructionsList").appendChild(g)}document.getElementById("servings").value=e.servings,document.getElementById("link").value=e.link}},mounted:function(){this.IsAdmin(),this.putRecipeDetailsInInputs()}};n("d5a1");const ut=o()(st,[["render",ot]]);var lt=ut,dt=function(e){return Object(i["x"])("data-v-2c67f7f5"),e=e(),Object(i["v"])(),e},pt={id:"login"},mt=dt((function(){return Object(i["g"])("h2",null,"Login",-1)})),gt=dt((function(){return Object(i["g"])("button",{type:"submit"},"Login",-1)}));function bt(e,t,n,r,c,a){var o=Object(i["B"])("navbar");return Object(i["u"])(),Object(i["f"])(i["a"],null,[Object(i["j"])(o),Object(i["g"])("div",pt,[Object(i["g"])("form",{onSubmit:t[2]||(t[2]=Object(i["L"])((function(){return a.login&&a.login.apply(a,arguments)}),["prevent"]))},[mt,Object(i["K"])(Object(i["g"])("input",{type:"email",placeholder:"Email address...","onUpdate:modelValue":t[0]||(t[0]=function(e){return c.email=e})},null,512),[[i["H"],c.email]]),Object(i["K"])(Object(i["g"])("input",{type:"password",placeholder:"password...","onUpdate:modelValue":t[1]||(t[1]=function(e){return c.password=e})},null,512),[[i["H"],c.password]]),gt],32),Object(i["g"])("button",{onClick:t[3]||(t[3]=function(){return a.loginWithGoogle&&a.loginWithGoogle.apply(a,arguments)})},"Sign In with Google")])],64)}var ft={components:{navbar:K},name:"login",data:function(){return{email:"",password:""}},methods:{login:function(){var e=this;P["a"].auth().signInWithEmailAndPassword(this.email,this.password).then((function(){e.$router.push("/")})).catch((function(e){alert(e.message)}))},loginWithGoogle:function(){var e=this,t=new P["a"].auth.GoogleAuthProvider;P["a"].auth().signInWithPopup(t).then((function(){e.$router.push("/")})).catch((function(e){console.log("Error: ".concat(e))}))}}};n("224d");const ht=o()(ft,[["render",bt],["__scopeId","data-v-2c67f7f5"]]);var vt=ht,jt=function(e){return Object(i["x"])("data-v-3eed611e"),e=e(),Object(i["v"])(),e},Ot={id:"register"},yt=jt((function(){return Object(i["g"])("h2",null,"Register",-1)})),It=jt((function(){return Object(i["g"])("button",{type:"submit"},"Register",-1)}));function kt(e,t,n,r,c,a){var o=Object(i["B"])("navbar");return Object(i["u"])(),Object(i["f"])(i["a"],null,[Object(i["j"])(o),Object(i["g"])("div",Ot,[Object(i["g"])("form",{onSubmit:t[2]||(t[2]=Object(i["L"])((function(){return a.register&&a.register.apply(a,arguments)}),["prevent"]))},[yt,Object(i["K"])(Object(i["g"])("input",{type:"email",placeholder:"Email address...","onUpdate:modelValue":t[0]||(t[0]=function(e){return c.email=e})},null,512),[[i["H"],c.email]]),Object(i["K"])(Object(i["g"])("input",{type:"password",placeholder:"password...","onUpdate:modelValue":t[1]||(t[1]=function(e){return c.password=e})},null,512),[[i["H"],c.password]]),It],32)])],64)}var xt={name:"Register",data:function(){return{email:"",password:""}},methods:{register:function(){var e=this;P["a"].auth().createUserWithEmailAndPassword(this.email,this.password).then((function(){alert("Successfully registered! Welcome!"),e.$router.push("/")})).catch((function(e){alert(e.message)}))}},components:{navbar:K}};n("be4d");const Lt=o()(xt,[["render",kt],["__scopeId","data-v-3eed611e"]]);var wt=Lt,Rt={apiKey:"AIzaSyDqfqIZoRXgkZJadMG5km-YZa3O1x344uA",authDomain:"foodlist-0921.firebaseapp.com",databaseURL:"https://foodlist-0921-default-rtdb.europe-west1.firebasedatabase.app",projectId:"foodlist-0921",storageBucket:"foodlist-0921.appspot.com",messagingSenderId:"652727898134",appId:"1:652727898134:web:bbdf18c26aa6696fe12537"};P["a"].initializeApp(Rt);var _t=[],Bt=P["a"].database().ref("recipes");Bt.on("child_added",(function(e){_t.push(e.val())})),Bt.on("child_removed",(function(e){var t=_t.findIndex((function(t){return t.recipeId===e.val().recipeId}));_t.splice(t,1)}));var Et=[{path:"/",name:"recipeList",component:J,props:{recipesList:_t},meta:{title:"RecipeList"},beforeEnter:function(e,t,n){var i=setInterval((function(){_t.length>0&&(clearInterval(i),n())}),400)}},{path:"/recipe/:id",name:"recipe",component:Se,props:{recipe:_t},meta:{title:"Recipe"},beforeEnter:function(e,t,n){var i=setInterval((function(){_t.length>0&&(clearInterval(i),n())}),400)}},{path:"/add",name:"addRecipe",component:rt,props:{recipesList:_t},meta:{title:"Add recipe",authRequired:!0},beforeEnter:function(e,t,n){var i=setInterval((function(){_t.length>0&&(clearInterval(i),n())}),400)}},{path:"/Login",name:"Login",component:vt,meta:{title:"Login",guestRequired:!0}},{path:"/Register",name:"Register",component:wt,meta:{title:"Register",guestRequired:!0}},{path:"/edit/:id",name:"editRecipe",component:lt,props:{recipesList:_t},meta:{title:"Edit recipe",authRequired:!0},beforeEnter:function(e,t,n){var i=setInterval((function(){_t.length>0&&(clearInterval(i),n())}),400)}}],At=Object(l["a"])({history:Object(l["b"])(),routes:Et});At.beforeEach((function(e,t,n){e.matched.some((function(e){return e.meta.authRequired}))?P["a"].auth().currentUser?n():(alert("You must be logged in to see this page"),n({path:"/Login"})):n()})),At.beforeEach((function(e,t,n){e.matched.some((function(e){return e.meta.guestRequired}))&&P["a"].auth().currentUser||n()})),At.beforeEach((function(e,t,n){var i=e.matched.slice().reverse().find((function(e){return e.meta&&e.meta.title})),r=e.matched.slice().reverse().find((function(e){return e.meta&&e.meta.metaTags})),c=t.matched.slice().reverse().find((function(e){return e.meta&&e.meta.metaTags}));if(i?document.title=i.meta.title:c&&(document.title=c.meta.title),Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map((function(e){return e.parentNode.removeChild(e)})),!r)return n();r.meta.metaTags.map((function(e){var t=document.createElement("meta");return Object.keys(e).forEach((function(n){t.setAttribute(n,e[n])})),t.setAttribute("data-vue-router-controlled",""),t})).forEach((function(e){return document.head.appendChild(e)})),n()}));var Ct,St=At;P["a"].auth().onAuthStateChanged((function(){Ct||(Ct=Object(i["c"])(u).use(St).mount("#app"))}))},"58af":function(e,t,n){},7073:function(e,t,n){"use strict";n("4440")},"820c":function(e,t,n){},"926a":function(e,t,n){},a0fe:function(e,t,n){},a725:function(e,t,n){"use strict";n("4da3")},b09a:function(e,t,n){"use strict";n("a0fe")},b64f:function(e,t,n){"use strict";n("926a")},be4d:function(e,t,n){"use strict";n("ea0a")},cedd:function(e,t,n){},d514:function(e,t,n){},d5a1:function(e,t,n){"use strict";n("d514")},e1c5:function(e,t,n){"use strict";n("58af")},e2de:function(e,t,n){},ea0a:function(e,t,n){},f80a:function(e,t,n){}});
//# sourceMappingURL=app.2acdcebd.js.map