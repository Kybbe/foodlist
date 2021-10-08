<template>
  <h3 style="text-align: center">Recipe</h3>
  <ol class="recipe">
    <li
      v-for="instruction in recipe"
      :key="instruction.id"
    >
      <input
        type="checkbox"
        :name="instruction.id"
        :id="instruction.id"
        v-model="instruction.checked"
        v-on:click="yup(instruction)"
      />
      <label :for="instruction.id"> {{ instruction.text }} </label>
    </li>
  </ol>
</template>

<script>
export default {
  name: "recipe",
  data() {
    return {
      recipe: [
        { id: 0, checked: false, text: "Koka pastan enligt anvisningen på förpackningen."},
        { id: 1, checked: false, text: "Stek löken i smöret i en stekpanna eller kastrull."},
        { id: 2, checked: false, text: "Sänk värmen och blanda i grädden och majsstärkelsen utrörd i mjölken. Koka upp under upprörning. Rör i skinkan och osten och låt allt bli varmt. Smaka av med salt och peppar."},
        { id: 3, checked: false, text: "Skär tomaterna och hacka gräslöken."},
        { id: 4, checked: false, text: "Servera pastan med ost- och skinksåsen, tomater och gräslök."},
      ],
    };
  },
  methods: {
      yup: function(instruction) {
        var elementinQuestion = document.getElementById(instruction.id).parentElement;
        if(instruction.checked) {
          var checkedInverted = false;
          elementinQuestion.style.opacity = "";
          elementinQuestion.style.textDecoration = ""
        } else {
          checkedInverted = true;
          elementinQuestion.style.opacity = "0.7"
          elementinQuestion.style.textDecoration = "line-through"
        }
        console.log(checkedInverted)


      }
  },
};
</script>

<style lang="scss" scoped>
ol {
  padding: 0;
}

li {
  list-style: none;
  border: 1px solid lightgrey;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: white;
  display: flex;

  label {
    padding: 12px 24px 12px 5px;
    width: 100%;
  }

  input[type='checkbox'] {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    margin: auto 0px auto 10px;
  }
}
</style>
