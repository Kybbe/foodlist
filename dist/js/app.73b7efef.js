(function(e){function t(t){for(var i,a,o=t[0],s=t[1],u=t[2],d=0,p=[];d<o.length;d++)a=o[d],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&p.push(r[a][0]),r[a]=0;for(i in s)Object.prototype.hasOwnProperty.call(s,i)&&(e[i]=s[i]);l&&l(t);while(p.length)p.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],i=!0,o=1;o<n.length;o++){var s=n[o];0!==r[s]&&(i=!1)}i&&(c.splice(t--,1),e=a(a.s=n[0]))}return e}var i={},r={app:0},c=[];function a(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=i,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],s=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var l=s;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0681":function(e,t,n){},"0963":function(e,t,n){"use strict";n("cc9a")},"0e0c":function(e,t,n){},"33f1":function(e,t,n){},"390f":function(e,t,n){"use strict";n("c80c")},"39cf":function(e,t,n){"use strict";n("7f15")},"3da6":function(e,t,n){},"467c":function(e,t,n){},"4e68":function(e,t,n){"use strict";n("3da6")},5053:function(e,t,n){"use strict";n("e2de")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("7a23");function r(e,t,n,r,c,a){var o=Object(i["C"])("navbar"),s=Object(i["C"])("router-view");return Object(i["v"])(),Object(i["g"])(i["a"],null,[Object(i["k"])(o),Object(i["k"])(s,null,{default:Object(i["L"])((function(t){var n=t.Component;return[Object(i["k"])(i["b"],{name:"fade",mode:"out-in"},{default:Object(i["L"])((function(){return[(Object(i["v"])(),Object(i["e"])(Object(i["D"])(n),{key:e.$route.path}))]})),_:2},1024)]})),_:1})],64)}var c=function(e){return Object(i["y"])("data-v-55f01fcc"),e=e(),Object(i["w"])(),e},a={class:"header"},o={class:"navStuff"},s=c((function(){return Object(i["h"])("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1",id:"Capa_1",x:"0px",y:"0px",viewBox:"0 0 27.02 27.02",style:{"enable-background":"new 0 0 27.02 27.02",width:"27px"},"xml:space":"preserve"},[Object(i["h"])("g",null,[Object(i["h"])("path",{style:{fill:"#030104"},d:"M3.674,24.876c0,0-0.024,0.604,0.566,0.604c0.734,0,6.811-0.008,6.811-0.008l0.01-5.581   c0,0-0.096-0.92,0.797-0.92h2.826c1.056,0,0.991,0.92,0.991,0.92l-0.012,5.563c0,0,5.762,0,6.667,0   c0.749,0,0.715-0.752,0.715-0.752V14.413l-9.396-8.358l-9.975,8.358C3.674,14.413,3.674,24.876,3.674,24.876z"}),Object(i["h"])("path",{style:{fill:"#030104"},d:"M0,13.635c0,0,0.847,1.561,2.694,0l11.038-9.338l10.349,9.28c2.138,1.542,2.939,0,2.939,0   L13.732,1.54L0,13.635z"}),Object(i["h"])("polygon",{style:{fill:"#030104"},points:"23.83,4.275 21.168,4.275 21.179,7.503 23.83,9.752  "})])],-1)})),u=Object(i["j"])(" Add Recipe "),l={class:"accountStuff"},d=Object(i["j"])(" Login "),p=Object(i["j"])(" Register ");function h(e,t,n,r,c,h){var m=Object(i["C"])("router-link");return Object(i["v"])(),Object(i["g"])("div",a,[Object(i["h"])("div",o,[Object(i["k"])(m,{to:"/"},{default:Object(i["L"])((function(){return[s]})),_:1}),c.loggedIn?(Object(i["v"])(),Object(i["e"])(m,{key:0,to:"/add"},{default:Object(i["L"])((function(){return[u]})),_:1})):Object(i["f"])("",!0)]),Object(i["h"])("div",l,[c.loggedIn?Object(i["f"])("",!0):(Object(i["v"])(),Object(i["e"])(m,{key:0,to:"/login"},{default:Object(i["L"])((function(){return[d]})),_:1})),c.loggedIn?Object(i["f"])("",!0):(Object(i["v"])(),Object(i["e"])(m,{key:1,to:"/register"},{default:Object(i["L"])((function(){return[p]})),_:1})),c.loggedIn?(Object(i["v"])(),Object(i["g"])("button",{key:2,onClick:t[0]||(t[0]=function(){return h.logout&&h.logout.apply(h,arguments)}),class:"logOut"},"logout")):Object(i["f"])("",!0)])])}var m=n("260b"),b=(n("ea7b"),{name:"Navbar",props:{link:{type:String}},data:function(){return{loggedIn:!1}},methods:{IsLoggedIn:function(){var e=m["a"].auth().currentUser;this.loggedIn=!!e},logout:function(){var e=this;m["a"].auth().signOut().then((function(){e.loggedIn=!1,e.$router.push("/")})).catch((function(t){alert(t.message),e.$router.push("/")}))}},mounted:function(){var e=this;setTimeout((function(){e.IsLoggedIn()}),10),m["a"].auth().onAuthStateChanged((function(){e.IsLoggedIn()}))}}),f=(n("6d68"),n("6b0d")),g=n.n(f);const v=g()(b,[["render",h],["__scopeId","data-v-55f01fcc"]]);var O=v,j={name:"App",components:{navbar:O}};n("39cf");const y=g()(j,[["render",r]]);var I=y,k=(n("c740"),n("a434"),n("d3b7"),n("7db0"),n("fb6a"),n("d81d"),n("a630"),n("3ca3"),n("159b"),n("b64b"),n("6c02")),w=(n("a4d3"),n("e01a"),function(e){return Object(i["y"])("data-v-4866d87a"),e=e(),Object(i["w"])(),e}),L={class:"searchArea"},x=w((function(){return Object(i["h"])("option",{value:"recipeId"},"Recipe Id",-1)})),C=w((function(){return Object(i["h"])("option",{value:"alphabetically"},"Alphabetically",-1)})),_=[x,C],R={id:"randomContainer"},E=Object(i["j"])("Go to random recipe"),B={class:"cardList"},A=w((function(){return Object(i["h"])("div",{class:"plateIcon"},[Object(i["h"])("svg",{"aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"utensils",class:"svg-inline--fa fa-utensils fa-w-13",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 416 512"},[Object(i["h"])("path",{fill:"currentColor",d:"M207.9 15.2c.8 4.7 16.1 94.5 16.1 128.8 0 52.3-27.8 89.6-68.9 104.6L168 486.7c.7 13.7-10.2 25.3-24 25.3H80c-13.7 0-24.7-11.5-24-25.3l12.9-238.1C27.7 233.6 0 196.2 0 144 0 109.6 15.3 19.9 16.1 15.2 19.3-5.1 61.4-5.4 64 16.3v141.2c1.3 3.4 15.1 3.2 16 0 1.4-25.3 7.9-139.2 8-141.8 3.3-20.8 44.7-20.8 47.9 0 .2 2.7 6.6 116.5 8 141.8.9 3.2 14.8 3.4 16 0V16.3c2.6-21.6 44.8-21.4 48-1.1zm119.2 285.7l-15 185.1c-1.2 14 9.9 26 23.9 26h56c13.3 0 24-10.7 24-24V24c0-13.2-10.7-24-24-24-82.5 0-221.4 178.5-64.9 300.9z"})])],-1)})),S=[A],N={class:"card-body"},T={class:"card-title"},V={class:"card-text"},M={class:"extras"},q={class:"card-ingredients"},U=Object(i["j"])(" Ingredient"),P={key:0},F={class:"card-steps"},D=Object(i["j"])(" Step"),$={key:0},J=w((function(){return Object(i["h"])("div",{class:"card",style:{height:"350px"}},[Object(i["h"])("svg",{"enable-background":"new 0 0 50 50",id:"Layer_1",version:"1.1",viewBox:"0 0 50 50","xml:space":"preserve",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},[Object(i["h"])("line",{stroke:"currentColor","stroke-miterlimit":"10","stroke-width":"4",x1:"9",x2:"41",y1:"25",y2:"25"}),Object(i["h"])("line",{stroke:"currentColor","stroke-miterlimit":"10","stroke-width":"4",x1:"25",x2:"25",y1:"9",y2:"41"})])],-1)}));function G(e,t,n,r,c,a){var o=Object(i["C"])("router-link"),s=Object(i["C"])("footerBar");return Object(i["v"])(),Object(i["g"])("div",null,[Object(i["h"])("div",L,[Object(i["M"])(Object(i["h"])("select",{name:"sortBy",id:"select","onUpdate:modelValue":t[0]||(t[0]=function(e){return c.sortBy=e})},_,512),[[i["I"],c.sortBy]]),Object(i["M"])(Object(i["h"])("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=function(e){return c.searchValue=e}),placeholder:"Search Recipe",id:"search-input"},null,512),[[i["J"],c.searchValue]])]),Object(i["h"])("div",R,[Object(i["k"])(o,{to:"/recipe/"+this.randomNumber,id:"randomRecipe"},{default:Object(i["L"])((function(){return[E]})),_:1},8,["to"])]),Object(i["h"])("div",B,[(Object(i["v"])(!0),Object(i["g"])(i["a"],null,Object(i["B"])(a.searchResult,(function(e){return Object(i["v"])(),Object(i["g"])("div",{class:"card",key:e.title},[Object(i["k"])(o,{to:"/recipe/"+e.recipeId},{default:Object(i["L"])((function(){return[Object(i["h"])("div",{class:"imgPart",style:Object(i["r"])(a.backgroundimg(e.imgLink))},S,4),Object(i["h"])("div",N,[Object(i["h"])("h2",T,Object(i["F"])(e.title),1),Object(i["h"])("p",V,Object(i["F"])(e.description),1),Object(i["h"])("div",M,[Object(i["h"])("p",q,[Object(i["h"])("span",null,Object(i["F"])(e.ingredients.length),1),U,e.ingredients.length>1?(Object(i["v"])(),Object(i["g"])("span",P,"s")):Object(i["f"])("",!0)]),Object(i["h"])("p",F,[Object(i["h"])("span",null,Object(i["F"])(e.instructions.length),1),D,e.instructions.length>1?(Object(i["v"])(),Object(i["g"])("span",$,"s")):Object(i["f"])("",!0)])])])]})),_:2},1032,["to"])])})),128)),c.loggedIn?(Object(i["v"])(),Object(i["e"])(o,{key:0,to:"/add"},{default:Object(i["L"])((function(){return[J]})),_:1})):Object(i["f"])("",!0)]),Object(i["k"])(s)])}n("4de4"),n("caad"),n("2532"),n("4e82");var H={id:"footerBar"},W=Object(i["i"])('<h1 data-v-77c52029>Techniques used</h1><div id="footerLists" data-v-77c52029><ul data-v-77c52029><h4 data-v-77c52029>Vue:</h4><li data-v-77c52029>Vue</li><li data-v-77c52029>Vue router</li><li data-v-77c52029>Vue CLI</li></ul><ul data-v-77c52029><h4 data-v-77c52029>Firebase:</h4><li data-v-77c52029>Firebase</li><li data-v-77c52029>Firebase Authentication</li><li data-v-77c52029>Firebase Realtime database</li><li data-v-77c52029>Firebase Hosting</li></ul></div>',2),z=[W];function Y(e,t,n,r,c,a){return Object(i["v"])(),Object(i["g"])("div",H,z)}var Z={name:"footerBar"};n("f89d");const K=g()(Z,[["render",Y],["__scopeId","data-v-77c52029"]]);var Q=K,X={name:"RecipeList",components:{footerBar:Q},props:{recipesList:{type:Array,required:!0}},data:function(){return{searchValue:"",sortBy:"recipeId",randomNumber:0,loggedIn:!1}},methods:{backgroundimg:function(e){return""==e&&(e="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/330px-Good_Food_Display_-_NCI_Visuals_Online.jpg"),{"background-image":"url(".concat(e,")")}},IsLoggedIn:function(){var e=m["a"].auth().currentUser;this.loggedIn=!!e}},computed:{searchResult:function(){var e=this,t=this.recipesList;return""!=this.searchValue&&this.searchValue&&(t=t.filter((function(t){return t.title.toUpperCase().includes(e.searchValue.toUpperCase())}))),t=t.sort((function(t,n){if("alphabetically"==e.sortBy){var i=t.title.toLowerCase(),r=n.title.toLowerCase();return i<r?-1:i>r?1:0}if("recipeId"==e.sortBy)return t.recipeId-n.recipeId})),t}},mounted:function(){var e=this;this.randomNumber=Math.floor(Math.random()*this.recipesList.length),this.IsLoggedIn(),m["a"].auth().onAuthStateChanged((function(){e.IsLoggedIn()}))}};n("0963");const ee=g()(X,[["render",G],["__scopeId","data-v-4866d87a"]]);var te=ee,ne=(n("9911"),{id:"content"}),ie={class:"bigCard card",style:{display:"flex","flex-wrap":"wrap","justify-content":"space-evenly",padding:"0px"}},re={class:"mediumCard card"},ce={class:"mediumCard card"},ae={id:"footer"},oe=Object(i["j"])(" Edit this recipe ");function se(e,t,n,r,c,a){var o=Object(i["C"])("mainArea"),s=Object(i["C"])("ingredients"),u=Object(i["C"])("instruction"),l=Object(i["C"])("router-link");return Object(i["v"])(),Object(i["g"])("div",null,[Object(i["h"])("div",ne,[Object(i["h"])("div",ie,[Object(i["k"])(o,{title:n.recipe[c.currentRecipeId].title,description:n.recipe[c.currentRecipeId].description,imgLink:n.recipe[c.currentRecipeId].imgLink,link:n.recipe[c.currentRecipeId].link},null,8,["title","description","imgLink","link"])]),Object(i["h"])("div",re,[Object(i["k"])(s,{ingredients:n.recipe[c.currentRecipeId].ingredients},null,8,["ingredients"])]),Object(i["h"])("div",ce,[Object(i["k"])(u,{instructions:n.recipe[c.currentRecipeId].instructions},null,8,["instructions"])])]),Object(i["h"])("div",ae,[c.admin?(Object(i["v"])(),Object(i["g"])("button",{key:0,id:"delete",onClick:t[0]||(t[0]=function(){return a.confirmDelete&&a.confirmDelete.apply(a,arguments)})}," Delete this recipe ")):Object(i["f"])("",!0),c.admin?(Object(i["v"])(),Object(i["e"])(l,{key:1,to:"/edit/"+c.currentRecipeId},{default:Object(i["L"])((function(){return[oe]})),_:1},8,["to"])):Object(i["f"])("",!0)])])}var ue={id:"descriptionContainer"},le={class:"description"},de=["href"],pe={id:"imgContainer"},he=["src"];function me(e,t,n,r,c,a){return Object(i["v"])(),Object(i["g"])(i["a"],null,[Object(i["h"])("div",ue,[Object(i["h"])("h2",null,Object(i["F"])(n.title),1),Object(i["h"])("p",le,Object(i["F"])(n.description),1),this.link?(Object(i["v"])(),Object(i["g"])("a",{key:0,href:n.link,target:"_blank",id:"ogLink"},"Original Recipe",8,de)):Object(i["f"])("",!0)]),Object(i["h"])("div",pe,[Object(i["h"])("img",{src:c.imgLinkAndTemplate,alt:"image of the dish"},null,8,he)])],64)}var be={name:"mainArea",props:{title:{type:String,required:!0},description:{type:String,required:!0},imgLink:{type:String,required:!0},link:{type:String}},data:function(){return{templateImg:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/330px-Good_Food_Display_-_NCI_Visuals_Online.jpg",imgLinkAndTemplate:""}},mounted:function(){""==this.imgLink?this.imgLinkAndTemplate=this.templateImg:this.imgLinkAndTemplate=this.imgLink,null!=this.link&&(document.getElementsByClassName("description")[0].style.marginBottom="10px")}};n("7b12");const fe=g()(be,[["render",me],["__scopeId","data-v-56f77d3d"]]);var ge=fe,ve=function(e){return Object(i["y"])("data-v-3684d254"),e=e(),Object(i["w"])(),e},Oe=ve((function(){return Object(i["h"])("h2",{style:{"text-align":"center"}},"Instructions",-1)})),je={class:"instruction"},ye=["name","id","onUpdate:modelValue","onClick"],Ie=["for"];function ke(e,t,n,r,c,a){return Object(i["v"])(),Object(i["g"])(i["a"],null,[Oe,Object(i["h"])("ol",je,[(Object(i["v"])(!0),Object(i["g"])(i["a"],null,Object(i["B"])(n.instructions,(function(e){return Object(i["v"])(),Object(i["g"])("li",{key:e.id,class:Object(i["q"])({checked:e.checked})},[Object(i["M"])(Object(i["h"])("input",{type:"checkbox",name:e.id,id:e.id,"onUpdate:modelValue":function(t){return e.checked=t},onClick:function(t){return a.checkInstruction(e)}},null,8,ye),[[i["H"],e.checked]]),Object(i["h"])("label",{for:e.id},Object(i["F"])(e.text),9,Ie)],2)})),128))])],64)}var we={name:"instruction",props:{instructions:{type:Array,required:!0}},methods:{checkInstruction:function(e){var t=document.getElementById(e.id).parentElement;e.checked?t.classList.remove("checked"):t.classList.add("checked")}}};n("5053");const Le=g()(we,[["render",ke],["__scopeId","data-v-3684d254"]]);var xe=Le,Ce=(n("b0c0"),n("99af"),function(e){return Object(i["y"])("data-v-588e4b2a"),e=e(),Object(i["w"])(),e}),_e=Ce((function(){return Object(i["h"])("h2",null,"Ingredients",-1)})),Re={id:"servingsContainer"},Ee=Ce((function(){return Object(i["h"])("svg",{version:"1.1",viewBox:"0 0 32 32",role:"presentation","aria-label":"Decrease servings",class:"svg-icon svg-fill"},[Object(i["h"])("path",{pid:"0","fill-rule":"evenodd",d:"M23.768 15H9a.249.249 0 00-.223.138l-.75 1.5A.25.25 0 008.25 17h15.518a.258.258 0 00.259-.259v-1.483a.258.258 0 00-.26-.258"})],-1)})),Be=[Ee],Ae=["placeholder","value"],Se=Ce((function(){return Object(i["h"])("label",{for:"portions"},"Servings",-1)})),Ne=Ce((function(){return Object(i["h"])("svg",{version:"1.1",viewBox:"0 0 32 32",role:"presentation","aria-label":"Increase servings",class:"svg-icon svg-fill"},[Object(i["h"])("path",{pid:"0","fill-rule":"evenodd",d:"M23.768 14.994h-6.744V8.258A.26.26 0 0016.766 8h-1.477a.257.257 0 00-.262.262v6.732H9a.249.249 0 00-.223.138l-.75 1.5a.25.25 0 00.223.362h6.777v6.748c0 .142.116.258.258.258l1.48-.004a.25.25 0 00.259-.258v-6.744h6.744a.258.258 0 00.259-.259v-1.483a.258.258 0 00-.26-.258"})],-1)})),Te=[Ne],Ve={class:"ingredients"};function Me(e,t,n,r,c,a){return Object(i["v"])(),Object(i["g"])(i["a"],null,[_e,Object(i["h"])("h4",null,Object(i["F"])(n.ingredients.length)+" Ingredients",1),Object(i["h"])("div",Re,[Object(i["h"])("button",{onClick:t[0]||(t[0]=function(e){return a.remove2Portions()})},Be),Object(i["h"])("input",{name:"portions",id:"portions",placeholder:this.portions,value:this.portions,onChange:t[1]||(t[1]=function(){return a.changeToPortions&&a.changeToPortions.apply(a,arguments)})},null,40,Ae),Se,Object(i["h"])("button",{onClick:t[2]||(t[2]=function(e){return a.add2Portions()})},Te)]),Object(i["h"])("ul",Ve,[(Object(i["v"])(!0),Object(i["g"])(i["a"],null,Object(i["B"])(n.ingredients,(function(e){return Object(i["v"])(),Object(i["g"])("li",{key:e.name},Object(i["F"])(" ".concat(e.amount," ").concat(e.measurment," ").concat(e.name," ")),1)})),128))])],64)}var qe={name:"ingredients",props:{ingredients:{type:Array,required:!0}},data:function(){return{portions:4}},methods:{add2Portions:function(){var e=this,t=this.portions+2;this.checkServings(t)&&(this.ingredients.forEach((function(n){""!=n.amount&&(n.amount/=e.portions,Math.round(n.amount*=t))})),this.portions+=2)},remove2Portions:function(){var e=this,t=this.portions-2;this.checkServings(t)&&(this.ingredients.forEach((function(n){""!=n.amount&&(n.amount/=e.portions,Math.round(n.amount*=t))})),this.portions-=2)},changeToPortions:function(e){var t=this;if("number"==typeof e)var n=e;else n=parseInt(e.target.value);if(this.checkServings(n)&&n%2==0&&this.portions!=n){var i=this.portions;this.portions=n,this.ingredients.forEach((function(e){""!=e.amount&&(e.amount/=i,Math.round(e.amount*=t.portions))}))}},checkServings:function(e){return""==e?(document.getElementById("portions").value=this.portions,!1):e>98?(alert("You can't have more than 98 servings!"),document.getElementById("portions").value=98,this.changeToPortions(98),!1):e<2?(alert("You can't have less than 2 servings!"),document.getElementById("portions").value=2,this.changeToPortions(2),!1):!isNaN(e)||(document.getElementById("portions").value=this.portions,!1)}}};n("b09a");const Ue=g()(qe,[["render",Me],["__scopeId","data-v-588e4b2a"]]);var Pe=Ue,Fe=(n("66ce"),{name:"recipe",components:{mainArea:ge,instruction:xe,ingredients:Pe},props:{recipe:{type:Object,required:!0}},data:function(){return{currentRecipeId:this.$route.params.id,admin:!1}},methods:{IsAdmin:function(){var e=m["a"].auth().currentUser;e&&("jacob.klaren@me.com"!=e.email&&"klarenjacob00@gmail.com"!=e.email||(this.admin=!0))},deleteRecipe:function(){var e=this,t=[],n=m["a"].database().ref("recipes");if(n.on("value",(function(e){e.forEach((function(e){t.push(e.key)}))})),n.child(t[this.currentRecipeId]).remove(),alert("Recipe deleted!"),n.on("value",(function(t){t.forEach((function(t){t.val().recipeId>e.currentRecipeId&&n.child(t.key).update({recipeId:t.val().recipeId-1})}))})),1==t.length){var i={title:"Add a recipe",description:"Since this database shouldn't be empty, you should add a recipe!",recipeId:"0",ingredients:[{amount:"2",unit:"Large",name:"OOF's"}],instructions:[{checked:!1,id:"0",text:"Add a recipe"}],servings:"4",link:"foodlist-0921.web.app/#/add",imgLink:""};n.push(i)}this.$router.push("/")},confirmDelete:function(){confirm("Are you sure you want to delete this recipe? \r\nThis action cannot be undone.")&&this.deleteRecipe()}},mounted:function(){this.IsAdmin()}});n("4e68");const De=g()(Fe,[["render",se],["__scopeId","data-v-2f08b2f6"]]);var $e=De,Je=function(e){return Object(i["y"])("data-v-12027cc0"),e=e(),Object(i["w"])(),e},Ge={id:"addRecipe"},He=Je((function(){return Object(i["h"])("h2",null,"Add Recipe",-1)})),We={action:""},ze={class:"form-group"},Ye=Je((function(){return Object(i["h"])("label",{for:"recipeName"},"Recipe Name / Title:",-1)})),Ze={class:"form-group"},Ke=Je((function(){return Object(i["h"])("label",{for:"recipeDescription"},"Recipe Description:",-1)})),Qe={class:"form-group"},Xe=Object(i["i"])('<label for="recipeIngredients" data-v-12027cc0>Recipe Ingredients:</label><div id="labels" data-v-12027cc0><label for="amount" data-v-12027cc0>Quantity:</label><label for="ingredientUnit" data-v-12027cc0>Unit:</label><label for="ingredientName" data-v-12027cc0>Ingredient Name:</label></div>',2),et={class:"ingredients"},tt=Je((function(){return Object(i["h"])("input",{type:"number",placeholder:"2",name:"amount",class:"amount"},null,-1)})),nt=Je((function(){return Object(i["h"])("input",{type:"text",placeholder:"Large",name:"measurment"},null,-1)})),it={class:"form-group"},rt=Je((function(){return Object(i["h"])("label",{for:"recipeServings"},"Recipe Servings:",-1)})),ct={class:"form-group"},at=Je((function(){return Object(i["h"])("label",{for:"recipeInstructions"},"Recipe Instructions: ",-1)})),ot={class:"form-group"},st=Je((function(){return Object(i["h"])("label",{for:"recipeImage"},"Original Recipe Link:",-1)})),ut={class:"form-group"},lt=Je((function(){return Object(i["h"])("label",{for:"recipeImage"},"Recipe Image (Link):",-1)}));function dt(e,t,n,r,c,a){return Object(i["v"])(),Object(i["g"])("div",null,[Object(i["h"])("div",Ge,[He,Object(i["h"])("form",We,[Object(i["h"])("div",ze,[Ye,Object(i["M"])(Object(i["h"])("input",{type:"text",class:"form-control",id:"recipeName",placeholder:"Tomatoes and Cheese Pasta","onUpdate:modelValue":t[0]||(t[0]=function(e){return c.recipe.title=e}),required:""},null,512),[[i["J"],c.recipe.title]])]),Object(i["h"])("div",Ze,[Ke,Object(i["M"])(Object(i["h"])("textarea",{class:"form-control",id:"recipeDescription",rows:"3","onUpdate:modelValue":t[1]||(t[1]=function(e){return c.recipe.description=e}),placeholder:"A simple recipe for a tasty pasta dish with tomatoes and cheese."},null,512),[[i["J"],c.recipe.description]])]),Object(i["h"])("div",Qe,[Xe,Object(i["h"])("div",et,[tt,nt,Object(i["h"])("input",{type:"text",placeholder:"Tomatoes",name:"name",onChange:t[2]||(t[2]=function(){return a.fixIngredients&&a.fixIngredients.apply(a,arguments)}),required:""},null,32)])]),Object(i["h"])("button",{type:"button",onClick:t[3]||(t[3]=function(){return a.addIngredient&&a.addIngredient.apply(a,arguments)})},"Add Ingredient"),c.moreThanOneIngredient?(Object(i["v"])(),Object(i["g"])("button",{key:0,type:"button",onClick:t[4]||(t[4]=function(){return a.removeIngredient&&a.removeIngredient.apply(a,arguments)})}," Remove Ingredient ")):Object(i["f"])("",!0),Object(i["h"])("div",it,[rt,Object(i["M"])(Object(i["h"])("input",{type:"number",class:"form-control",id:"recipeServings",placeholder:"4","onUpdate:modelValue":t[5]||(t[5]=function(e){return c.recipe.servings=e}),onChange:t[6]||(t[6]=function(){return a.checkServings&&a.checkServings.apply(a,arguments)})},null,544),[[i["J"],c.recipe.servings]])]),Object(i["h"])("div",ct,[at,Object(i["h"])("textarea",{class:"form-control",id:"recipeInstructions",rows:"3",onChange:t[7]||(t[7]=function(){return a.fixInstructions&&a.fixInstructions.apply(a,arguments)}),placeholder:"1. Preheat oven to 350 degrees. ,2. Mix ingredients. ,3. Bake for 20 minutes."},null,32)]),Object(i["h"])("div",ot,[st,Object(i["M"])(Object(i["h"])("input",{type:"text",class:"form-control",id:"recipeImage",placeholder:"www.example.com/recipe.html","onUpdate:modelValue":t[8]||(t[8]=function(e){return c.recipe.link=e})},null,512),[[i["J"],c.recipe.link]])]),Object(i["h"])("div",ut,[lt,Object(i["M"])(Object(i["h"])("input",{type:"text",class:"form-control",id:"recipeImage",placeholder:"www.google.com(images/recipe.jpg)","onUpdate:modelValue":t[9]||(t[9]=function(e){return c.recipe.imgLink=e})},null,512),[[i["J"],c.recipe.imgLink]])]),Object(i["h"])("button",{onClick:t[10]||(t[10]=Object(i["N"])((function(){return a.post&&a.post.apply(a,arguments)}),["prevent"])),type:"submit"},"Submit")])])])}n("ac1f"),n("1276"),n("a9e3"),n("b680");var pt={name:"AddRecipe",data:function(){return{recipe:{recipeId:"",title:"",description:"",ingredients:[],instructions:[],servings:"",link:"",imgLink:""},moreThanOneIngredient:!1}},methods:{addIngredient:function(){for(var e=document.getElementsByClassName("ingredients")[0].cloneNode(!0),t=document.getElementsByClassName("ingredients")[0].querySelectorAll("input"),n=0;n<t.length;n++)t[n].value="";document.getElementsByClassName("ingredients")[0].parentNode.appendChild(e),this.moreThanOneIngredient=!0},removeIngredient:function(){var e=document.getElementsByClassName("ingredients");e.length>1&&e[e.length-1].remove(),1==e.length&&(this.moreThanOneIngredient=!1)},fixIngredients:function(){for(var e=[],t=document.getElementsByClassName("ingredients"),n=0;n<t.length;n++){for(var i={},r=t[n].querySelectorAll("input"),c=0;c<r.length;c++)i[r[c].name]=r[c].value;e.push(i)}this.recipe.ingredients=e,this.checkServings()},fixInstructions:function(){var e=document.getElementById("recipeInstructions").value,t=e.split(",").map((function(e,t){return{id:t,checked:!1,text:e}}));this.recipe.instructions=t},checkServings:function(){var e=document.getElementById("recipeServings").value;if(""!=e&&e){if(""==document.getElementsByClassName("amount")[0].value)return;for(var t=this.recipe.ingredients,n=document.getElementsByClassName("amount"),i=0;i<t.length;i++){if(""==n[i].value)return;var r=t[i].amount/e,c=4*r;c=Number(c.toFixed(1)),t[i].amount=c,n[i].value=c}this.recipe.ingredients=t}},post:function(){if("Test JKL"==this.recipe.title)return this.recipe.title="Test",this.recipe.description="Test",this.addRecipeId(),this.recipe.ingredients=[{name:"Test",amount:"1",measurment:"Test"}],this.recipe.instructions=[{id:0,checked:!0,text:"Test"}],this.recipe.servings="4",this.recipe.link="www.google.com",this.recipe.imgLink="",m["a"].database().ref("recipes").push(this.recipe),alert("Recipe added!"),void this.$router.push("/");""!=this.recipe.title&&""!=this.recipe.description&&""!=this.recipe.ingredients&&""!=this.recipe.instructions&&""!=this.recipe.link?(this.addRecipeId(),m["a"].database().ref("recipes").push(this.recipe),alert("Recipe added!"),this.$router.push("/")):alert("Please fill out all fields")},addRecipeId:function(){this.recipe.recipeId=this.recipesList.length}},mounted:function(){this.addRecipeId()},props:{recipesList:Array}};n("390f");const ht=g()(pt,[["render",dt],["__scopeId","data-v-12027cc0"]]);var mt=ht,bt={action:"",id:"container"},ft=Object(i["h"])("input",{type:"text",name:"title",id:"title",placeholder:"title"},null,-1),gt=Object(i["h"])("input",{type:"text",name:"description",id:"description",placeholder:"description"},null,-1),vt=Object(i["h"])("input",{type:"text",name:"imgLink",id:"imgLink",placeholder:"imgLink"},null,-1),Ot=Object(i["h"])("div",{id:"ingredientsList"},null,-1),jt={id:"ingredientsButtons"},yt=Object(i["h"])("div",{id:"instructionsList"},null,-1),It=Object(i["h"])("input",{type:"text",name:"servings",id:"servings",placeholder:"servings"},null,-1),kt=Object(i["h"])("input",{type:"text",name:"link",id:"link",placeholder:"link"},null,-1);function wt(e,t,n,r,c,a){return Object(i["v"])(),Object(i["g"])("div",null,[Object(i["h"])("form",bt,[ft,gt,vt,Ot,Object(i["h"])("div",jt,[Object(i["h"])("button",{type:"button",onClick:t[0]||(t[0]=function(){return a.addIngredient&&a.addIngredient.apply(a,arguments)})},"Add Ingredient"),c.moreThanOneIngredient?(Object(i["v"])(),Object(i["g"])("button",{key:0,type:"button",onClick:t[1]||(t[1]=function(){return a.removeIngredient&&a.removeIngredient.apply(a,arguments)})}," Remove Ingredient ")):Object(i["f"])("",!0)]),yt,It,kt,Object(i["h"])("button",{onClick:t[2]||(t[2]=Object(i["N"])((function(){return a.editFirebase&&a.editFirebase.apply(a,arguments)}),["prevent"])),type:"submit",id:"updateRecipeBtn"}," Update ")])])}var Lt={name:"edit-recipe",props:{recipesList:{type:Array,required:!0}},data:function(){return{admin:!1,moreThanOneIngredient:!1}},methods:{IsAdmin:function(){var e=m["a"].auth().currentUser;e&&("jacob.klaren@me.com"!=e.email&&"klarenjacob00@gmail.com"!=e.email||(this.admin=!0))},addIngredient:function(){for(var e=document.getElementsByClassName("editIngredients")[0].cloneNode(!0),t=0;t<e.length;t++)e.querySelector("input").value="";document.getElementsByClassName("editIngredients")[0].parentNode.appendChild(e),this.moreThanOneIngredient=!0},removeIngredient:function(){var e=document.getElementsByClassName("editIngredients");e.length>1&&e[e.length-1].remove(),1==e.length&&(this.moreThanOneIngredient=!1)},editFirebase:function(){if(this.admin){var e=m["a"].database(),t=m["a"].database().ref("recipes"),n=[];t.on("value",(function(e){e.forEach((function(e){n.push(e.key)}))}));for(var i=e.ref("recipes/"+n[this.$route.params.id]),r=document.getElementById("title").value,c=document.getElementById("description").value,a=[],o=document.getElementsByClassName("editIngredients"),s=0;s<o.length;s++){var u={amount:o[s].querySelectorAll("input")[0].value,measurment:o[s].querySelectorAll("input")[1].value,name:o[s].querySelectorAll("input")[2].value};a.push(u)}for(var l=[],d=document.getElementsByClassName("editInstructions"),p=0;p<d.length;p++){var h={checked:d[p].querySelectorAll("input")[0].value,id:d[p].querySelectorAll("input")[1].value,text:d[p].querySelectorAll("input")[2].value};"true"==h.checked&&(h.checked=!0),"false"==h.checked&&(h.checked=!1),l.push(h)}var b=document.getElementById("servings").value,f=document.getElementById("link").value,g=document.getElementById("imgLink").value,v=this.$route.params.id,O={title:r,description:c,ingredients:a,instructions:l,servings:b,link:f,imgLink:g,recipeId:v};i.update(O),alert("Recipe updated!"),this.$router.push("/recipe/"+this.$route.params.id)}},putRecipeDetailsInInputs:function(){var e=this.recipesList[this.$route.params.id];document.getElementById("title").value=e.title,document.getElementById("description").value=e.description,document.getElementById("imgLink").value=e.imgLink;var t=e.ingredients;t.length>1&&(this.moreThanOneIngredient=!0);for(var n=0;n<t.length;n++){var i=t[n],r=i.amount,c=i.measurment,a=i.name,o=document.createElement("div");o.classList.add("editIngredients"),o.innerHTML='\n\t\t\t\t\t<input type="text" name="amount" class="amount" value="'.concat(r,'">\n\t\t\t\t\t<input type="text" name="measurment" class="measurment" value="').concat(c,'">\n\t\t\t\t\t<input type="text" name="name" class="name" value="').concat(a,'">\n\t\t\t\t'),document.getElementById("ingredientsList").appendChild(o)}for(var s=e.instructions,u=0;u<s.length;u++){var l=s[u],d=l.checked,p=l.id,h=l.text,m=document.createElement("div");m.classList.add("editInstructions"),m.innerHTML='\n\t\t\t\t\t<input type="text" name="checked" class="checked" value="'.concat(d,'">\n\t\t\t\t\t<input type="number" name="id" class="id" value="').concat(p,'">\n\t\t\t\t\t<input type="text" name="text" class="text" value="').concat(h,'">\n\t\t\t\t'),document.getElementById("instructionsList").appendChild(m)}document.getElementById("servings").value=e.servings,document.getElementById("link").value=e.link}},mounted:function(){this.IsAdmin(),this.putRecipeDetailsInInputs()}};n("6aef");const xt=g()(Lt,[["render",wt]]);var Ct=xt,_t=function(e){return Object(i["y"])("data-v-6ee17a9b"),e=e(),Object(i["w"])(),e},Rt={id:"login"},Et=_t((function(){return Object(i["h"])("h2",null,"Login",-1)})),Bt=_t((function(){return Object(i["h"])("button",{type:"submit"},"Login",-1)}));function At(e,t,n,r,c,a){return Object(i["v"])(),Object(i["g"])("div",null,[Object(i["h"])("div",Rt,[Object(i["h"])("form",{onSubmit:t[2]||(t[2]=Object(i["N"])((function(){return a.login&&a.login.apply(a,arguments)}),["prevent"]))},[Et,Object(i["M"])(Object(i["h"])("input",{type:"email",placeholder:"Email address...","onUpdate:modelValue":t[0]||(t[0]=function(e){return c.email=e})},null,512),[[i["J"],c.email]]),Object(i["M"])(Object(i["h"])("input",{type:"password",placeholder:"password...","onUpdate:modelValue":t[1]||(t[1]=function(e){return c.password=e})},null,512),[[i["J"],c.password]]),Bt],32),Object(i["h"])("button",{onClick:t[3]||(t[3]=function(){return a.loginWithGoogle&&a.loginWithGoogle.apply(a,arguments)})},"Sign In with Google")])])}var St={name:"login",data:function(){return{email:"",password:""}},methods:{login:function(){var e=this;m["a"].auth().signInWithEmailAndPassword(this.email,this.password).then((function(){e.$router.push("/")})).catch((function(e){alert(e.message)}))},loginWithGoogle:function(){var e=this,t=new m["a"].auth.GoogleAuthProvider;m["a"].auth().signInWithPopup(t).then((function(){e.$router.push("/")})).catch((function(e){console.log("Error: ".concat(e))}))}}};n("bf23");const Nt=g()(St,[["render",At],["__scopeId","data-v-6ee17a9b"]]);var Tt=Nt,Vt=function(e){return Object(i["y"])("data-v-95ea28d6"),e=e(),Object(i["w"])(),e},Mt={id:"register"},qt=Vt((function(){return Object(i["h"])("h2",null,"Register",-1)})),Ut=Vt((function(){return Object(i["h"])("button",{type:"submit"},"Register",-1)}));function Pt(e,t,n,r,c,a){return Object(i["v"])(),Object(i["g"])("div",null,[Object(i["h"])("div",Mt,[Object(i["h"])("form",{onSubmit:t[2]||(t[2]=Object(i["N"])((function(){return a.register&&a.register.apply(a,arguments)}),["prevent"]))},[qt,Object(i["M"])(Object(i["h"])("input",{type:"email",placeholder:"Email address...","onUpdate:modelValue":t[0]||(t[0]=function(e){return c.email=e})},null,512),[[i["J"],c.email]]),Object(i["M"])(Object(i["h"])("input",{type:"password",placeholder:"password...","onUpdate:modelValue":t[1]||(t[1]=function(e){return c.password=e})},null,512),[[i["J"],c.password]]),Ut],32)])])}var Ft={name:"Register",data:function(){return{email:"",password:""}},methods:{register:function(){var e=this;m["a"].auth().createUserWithEmailAndPassword(this.email,this.password).then((function(){alert("Successfully registered! Welcome!"),e.$router.push("/")})).catch((function(e){alert(e.message)}))}}};n("ba1f");const Dt=g()(Ft,[["render",Pt],["__scopeId","data-v-95ea28d6"]]);var $t=Dt,Jt={apiKey:"AIzaSyDqfqIZoRXgkZJadMG5km-YZa3O1x344uA",authDomain:"foodlist-0921.firebaseapp.com",databaseURL:"https://foodlist-0921-default-rtdb.europe-west1.firebasedatabase.app",projectId:"foodlist-0921",storageBucket:"foodlist-0921.appspot.com",messagingSenderId:"652727898134",appId:"1:652727898134:web:bbdf18c26aa6696fe12537"};m["a"].initializeApp(Jt);var Gt=[],Ht=m["a"].database().ref("recipes");Ht.on("child_added",(function(e){Gt.push(e.val())})),Ht.on("child_removed",(function(e){var t=Gt.findIndex((function(t){return t.recipeId===e.val().recipeId}));Gt.splice(t,1)})),Ht.on("child_changed",(function(e){var t=Gt.findIndex((function(t){return t.recipeId===e.val().recipeId}));Gt[t]=e.val()}));var Wt=[{path:"/",name:"recipeList",component:te,props:{recipesList:Gt},meta:{title:"RecipeList"},beforeEnter:function(e,t,n){var i=setInterval((function(){Gt.length>0&&(clearInterval(i),n())}),400)}},{path:"/recipe/:id",name:"recipe",component:$e,props:{recipe:Gt},meta:{title:"Recipe"},beforeEnter:function(e,t,n){var i=setInterval((function(){Gt.length>0&&(clearInterval(i),n())}),400)}},{path:"/add",name:"addRecipe",component:mt,props:{recipesList:Gt},meta:{title:"Add recipe",authRequired:!0},beforeEnter:function(e,t,n){var i=setInterval((function(){Gt.length>0&&(clearInterval(i),n())}),400)}},{path:"/Login",name:"Login",component:Tt,meta:{title:"Login",guestRequired:!0}},{path:"/Register",name:"Register",component:$t,meta:{title:"Register",guestRequired:!0}},{path:"/edit/:id",name:"editRecipe",component:Ct,props:{recipesList:Gt},meta:{title:"Edit recipe"},beforeEnter:function(e,t,n){var i=setInterval((function(){Gt.length>0&&(clearInterval(i),n())}),400)}}],zt=Object(k["a"])({history:Object(k["b"])(),routes:Wt});zt.beforeEach((function(e,t,n){e.matched.some((function(e){return e.meta.authRequired}))?m["a"].auth().currentUser?n():(alert("You must be logged in to see this page"),n({path:"/Login"})):n()})),zt.beforeEach((function(e,t,n){e.matched.some((function(e){return e.meta.guestRequired}))&&m["a"].auth().currentUser||n()})),zt.beforeEach((function(e,t,n){var i=e.matched.slice().reverse().find((function(e){return e.meta&&e.meta.title})),r=e.matched.slice().reverse().find((function(e){return e.meta&&e.meta.metaTags})),c=t.matched.slice().reverse().find((function(e){return e.meta&&e.meta.metaTags}));if(i?document.title=i.meta.title:c&&(document.title=c.meta.title),Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map((function(e){return e.parentNode.removeChild(e)})),!r)return n();r.meta.metaTags.map((function(e){var t=document.createElement("meta");return Object.keys(e).forEach((function(n){t.setAttribute(n,e[n])})),t.setAttribute("data-vue-router-controlled",""),t})).forEach((function(e){return document.head.appendChild(e)})),n()}));var Yt,Zt=zt;m["a"].auth().onAuthStateChanged((function(){Yt||(Yt=Object(i["d"])(I).use(Zt).mount("#app"))}))},"6aef":function(e,t,n){"use strict";n("d168")},"6d68":function(e,t,n){"use strict";n("0681")},"7b12":function(e,t,n){"use strict";n("467c")},"7f15":function(e,t,n){},a0fe:function(e,t,n){},b09a:function(e,t,n){"use strict";n("a0fe")},ba1f:function(e,t,n){"use strict";n("33f1")},bf23:function(e,t,n){"use strict";n("0e0c")},c80c:function(e,t,n){},cc9a:function(e,t,n){},d168:function(e,t,n){},e2de:function(e,t,n){},e390:function(e,t,n){},f89d:function(e,t,n){"use strict";n("e390")}});
//# sourceMappingURL=app.73b7efef.js.map