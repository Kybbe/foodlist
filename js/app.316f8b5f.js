(function(e){function t(t){for(var r,a,o=t[0],s=t[1],u=t[2],l=0,p=[];l<o.length;l++)a=o[l],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&p.push(i[a][0]),i[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);d&&d(t);while(p.length)p.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,o=1;o<n.length;o++){var s=n[o];0!==i[s]&&(r=!1)}r&&(c.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},i={app:0},c=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],s=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var d=s;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0009":function(e,t,n){},"042c":function(e,t,n){"use strict";n("0009")},"07cc":function(e,t,n){},"1a3a":function(e,t,n){"use strict";n("8653")},"3c12":function(e,t,n){"use strict";n("6e64")},"3db2":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23");function i(e,t,n,i,c,a){var o=Object(r["x"])("router-view");return Object(r["q"])(),Object(r["d"])(o)}var c={name:"App"},a=(n("b64f"),n("6b0d")),o=n.n(a);const s=o()(c,[["render",i]]);var u=s,d=n("6c02"),l=(n("a4d3"),n("e01a"),function(e){return Object(r["t"])("data-v-59e29428"),e=e(),Object(r["r"])(),e}),p=l((function(){return Object(r["f"])("div",{style:{"text-align":"center","background-color":"lightblue"}},[Object(r["f"])("h1",null,"Recipes:")],-1)})),f={class:"cardList"},b=l((function(){return Object(r["f"])("div",{class:"backgroundIMG"},null,-1)})),m={class:"textPart"};function h(e,t,n,i,c,a){var o=Object(r["x"])("router-link");return Object(r["q"])(),Object(r["e"])(r["a"],null,[p,Object(r["f"])("div",f,[(Object(r["q"])(!0),Object(r["e"])(r["a"],null,Object(r["w"])(n.recipesList,(function(e){return Object(r["q"])(),Object(r["e"])("div",{class:"long-card",key:e.title},[Object(r["h"])(o,{to:"/recipe/"+e.recipeId},{default:Object(r["D"])((function(){return[b,Object(r["f"])("div",m,[Object(r["f"])("h2",null,Object(r["z"])(e.title),1),Object(r["f"])("p",null,Object(r["z"])(e.description),1)])]})),_:2},1032,["to"])])})),128))])],64)}var j={name:"RecipeList",props:{recipesList:{type:Array,required:!0}}};n("fdcb");const O=o()(j,[["render",h],["__scopeId","data-v-59e29428"]]);var g=O,v=(n("9911"),{id:"content"}),k={class:"bigCard card",style:{display:"flex","flex-wrap":"wrap","justify-content":"space-evenly",padding:"0px"}},y={class:"mediumCard card"},_={class:"mediumCard card"};function x(e,t,n,i,c,a){var o=Object(r["x"])("navbar"),s=Object(r["x"])("mainArea"),u=Object(r["x"])("ingredients"),d=Object(r["x"])("instruction");return Object(r["q"])(),Object(r["e"])(r["a"],null,[Object(r["h"])(o,{link:n.recipe[c.currentRecipeId].link},null,8,["link"]),Object(r["f"])("div",v,[Object(r["f"])("div",k,[Object(r["h"])(s,{title:n.recipe[c.currentRecipeId].title,description:n.recipe[c.currentRecipeId].description,imgLink:n.recipe[c.currentRecipeId].imgLink},null,8,["title","description","imgLink"])]),Object(r["f"])("div",y,[Object(r["h"])(u,{ingredients:n.recipe[c.currentRecipeId].ingredients},null,8,["ingredients"])]),Object(r["f"])("div",_,[Object(r["h"])(d,{instructions:n.recipe[c.currentRecipeId].instructions},null,8,["instructions"])])])],64)}var I={id:"descriptionContainer"},w={class:"description"},q={id:"imgContainer"},P=["src"];function S(e,t,n,i,c,a){return Object(r["q"])(),Object(r["e"])(r["a"],null,[Object(r["f"])("div",I,[Object(r["f"])("h2",null,Object(r["z"])(n.title),1),Object(r["f"])("p",w,Object(r["z"])(n.description),1)]),Object(r["f"])("div",q,[Object(r["f"])("img",{src:n.imgLink,alt:"image of the dish"},null,8,P)])],64)}var L={name:"mainArea",props:{title:{type:String,required:!0},description:{type:String,required:!0},imgLink:{type:String,required:!0}}};n("3c12");const R=o()(L,[["render",S],["__scopeId","data-v-761dd6b1"]]);var C=R,M=function(e){return Object(r["t"])("data-v-44731264"),e=e(),Object(r["r"])(),e},E=M((function(){return Object(r["f"])("h3",{style:{"text-align":"center"}},"Instructions",-1)})),z={class:"instruction"},A=["name","id","onUpdate:modelValue","onClick"],B=["for"];function D(e,t,n,i,c,a){return Object(r["q"])(),Object(r["e"])(r["a"],null,[E,Object(r["f"])("ol",z,[(Object(r["q"])(!0),Object(r["e"])(r["a"],null,Object(r["w"])(n.instructions,(function(e){return Object(r["q"])(),Object(r["e"])("li",{key:e.id},[Object(r["E"])(Object(r["f"])("input",{type:"checkbox",name:e.id,id:e.id,"onUpdate:modelValue":function(t){return e.checked=t},onClick:function(t){return a.checkInstruction(e)}},null,8,A),[[r["B"],e.checked]]),Object(r["f"])("label",{for:e.id},Object(r["z"])(e.text),9,B)])})),128))])],64)}var T={name:"instruction",props:{instructions:{type:Array,required:!0}},methods:{checkInstruction:function(e){var t=document.getElementById(e.id).parentElement;e.checked?(t.style.opacity="",t.style.textDecoration=""):(t.style.opacity="0.7",t.style.textDecoration="line-through")}}};n("b8bb");const N=o()(T,[["render",D],["__scopeId","data-v-44731264"]]);var K=N,J=(n("b0c0"),n("99af"),function(e){return Object(r["t"])("data-v-a49ab3e2"),e=e(),Object(r["r"])(),e}),U=J((function(){return Object(r["f"])("h2",null,"Ingredients",-1)})),V={id:"servingsContainer"},Y=["placeholder","value"],F=J((function(){return Object(r["f"])("label",{for:"portions"},"Servings",-1)})),G={class:"ingredients"};function H(e,t,n,i,c,a){return Object(r["q"])(),Object(r["e"])(r["a"],null,[U,Object(r["f"])("h4",null,Object(r["z"])(n.ingredients.length)+" ingredients",1),Object(r["f"])("div",V,[Object(r["f"])("button",{onClick:t[0]||(t[0]=function(e){return a.remove2Portions()})},"-"),Object(r["f"])("input",{name:"portions",id:"portions",placeholder:this.portions,value:this.portions,onChange:t[1]||(t[1]=function(){return a.changeToPortions&&a.changeToPortions.apply(a,arguments)})},null,40,Y),F,Object(r["f"])("button",{onClick:t[2]||(t[2]=function(e){return a.add2Portions()})},"+")]),Object(r["f"])("ul",G,[(Object(r["q"])(!0),Object(r["e"])(r["a"],null,Object(r["w"])(n.ingredients,(function(e){return Object(r["q"])(),Object(r["e"])("li",{key:e.name},Object(r["z"])(" ".concat(e.amount," ").concat(e.measurment," ").concat(e.name," ")),1)})),128))])],64)}n("159b");var $={name:"ingredients",props:{ingredients:{type:Array,required:!0}},data:function(){return{portions:4}},methods:{add2Portions:function(){var e=this,t=this.portions+2;this.checkServings(t)&&(this.ingredients.forEach((function(n){""!=n.amount&&(n.amount/=e.portions,Math.round(n.amount*=t))})),this.portions+=2)},remove2Portions:function(){var e=this,t=this.portions-2;this.checkServings(t)&&(this.ingredients.forEach((function(n){""!=n.amount&&(n.amount/=e.portions,Math.round(n.amount*=t))})),this.portions-=2)},changeToPortions:function(e){var t=this,n=parseInt(e.target.value);if(this.checkServings(n)&&n%2==0&&this.portions!=n){var r=this.portions;this.portions=n,this.ingredients.forEach((function(e){""!=e.amount&&(e.amount/=r,Math.round(e.amount*=t.portions))}))}},checkServings:function(e){return""==e?(document.getElementById("portions").value=this.portions,!1):e>98?(alert("You can't have more than 98 servings!"),document.getElementById("portions").value=98,!1):e<2?(alert("You can't have less than 2 servings!"),document.getElementById("portions").value=2,!1):!isNaN(e)||(document.getElementById("portions").value=this.portions,!1)}}};n("1a3a");const Q=o()($,[["render",H],["__scopeId","data-v-a49ab3e2"]]);var W=Q,X={class:"header"},Z=Object(r["g"])("Home"),ee=["href"];function te(e,t,n,i,c,a){var o=Object(r["x"])("router-link");return Object(r["q"])(),Object(r["e"])("div",X,[Object(r["h"])(o,{to:"/"},{default:Object(r["D"])((function(){return[Z]})),_:1}),Object(r["f"])("a",{href:n.link,target:"_blank"},"Original Recipe",8,ee)])}var ne={name:"Navbar",props:{link:{type:String,required:!0}}};n("042c");const re=o()(ne,[["render",te],["__scopeId","data-v-5f7f0a3e"]]);var ie=re,ce={name:"recipe",components:{mainArea:C,instruction:K,ingredients:W,Navbar:ie},props:{recipe:{type:Object,required:!0}},data:function(){return{currentRecipeId:this.$route.params.id}}};n("6411");const ae=o()(ce,[["render",x]]);var oe=ae,se=[{recipeId:0,title:"Pasta med ost- och skinksås",description:"Ibland vill man bara fixa ihop en enkel men god pasta till middag! Då har du denna krämiga pastarätt med ost- och skinksås. Prästost ger en perfekt smak till såsen, och du adderar gräslök och tomater på toppen innan servering!",instructions:[{id:0,checked:!1,text:"Koka pastan enligt anvisningen på förpackningen."},{id:1,checked:!1,text:"Blanda i grädden och majsstärkelsen utrörd i mjölken. Koka upp under upprörning. Rör i skinkan och osten och låt allt bli varmt. Smaka av med salt och peppar."},{id:2,checked:!1,text:"Skär tomaterna och hacka gräslöken."},{id:3,checked:!1,text:"Servera pastan med ost- och skinksåsen, tomater och gräslök."}],ingredients:[{amount:4,measurment:"Portioner",name:"Pasta"},{amount:1,measurment:"msk",name:"Smör eller olja"},{amount:2.5,measurment:"dl",name:"Matlagningsgrädde"},{amount:1.5,measurment:"dl",name:"Mjölk"},{amount:2,measurment:"tsk",name:"Majsstärkelse"},{amount:2,measurment:"Förpackningar",name:"Strimlad Skinka"},{amount:1.5,measurment:"dl",name:"Riven smakrik ost"},{amount:"",measurment:"",name:"Salt"},{amount:"",measurment:"",name:"Peppar"}],link:"https://www.ica.se/recept/pasta-med-kramig-ost-och-skinksas-725815/",imgLink:"https://assets.icanet.se/e_sharpen:80,q_auto,dpr_1.25,w_718,h_718,c_lfill/imagevaultfiles/id_207924/cf_259/pasta_med_kramig_ost-_och_skinksas.jpg"},{recipeId:1,title:"Pasta med",description:"Ibland",instructions:[{id:0,checked:!1,text:"Koka pastan enligt anvisningen på förpackningen."}],ingredients:[{amount:4,measurment:"Portioner",name:"Pasta"}],link:"https://www.google.com",imgLink:"https://assets.icanet.se/e_sharpen:80,q_auto,dpr_1.25,w_718,h_718,c_lfill/imagevaultfiles/id_207924/cf_259/pasta_med_kramig_ost-_och_skinksas.jpg"}],ue=[{path:"/",name:"recipeList",component:g,props:{recipesList:se}},{path:"/recipe/:id",name:"recipe",component:oe,props:{recipe:se}}],de=Object(d["a"])({history:Object(d["b"])(),routes:ue}),le=de;Object(r["c"])(u).use(le).mount("#app")},6411:function(e,t,n){"use strict";n("f026")},"6e64":function(e,t,n){},8653:function(e,t,n){},"926a":function(e,t,n){},b64f:function(e,t,n){"use strict";n("926a")},b8bb:function(e,t,n){"use strict";n("3db2")},f026:function(e,t,n){},fdcb:function(e,t,n){"use strict";n("07cc")}});
//# sourceMappingURL=app.316f8b5f.js.map