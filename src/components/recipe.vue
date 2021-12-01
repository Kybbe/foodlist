<template>
  <h3 style="text-align: center">Recipe</h3>
  <ol class="recipe">
    <li v-for="instruction in instructions" :key="instruction.id">
      <input
        type="checkbox"
        :name="instruction.id"
        :id="instruction.id"
        v-model="instruction.checked"
        v-on:click="checkInstruction(instruction)"
      />
      <label :for="instruction.id"> {{ instruction.text }} </label>
    </li>
  </ol>
</template>

<script>
export default {
  name: "recipe",
  props: {
    instructions: {
      type: Array,
      required: true,
    },
  },
  methods: {
    checkInstruction: function (instruction) {
      var parent = document.getElementById(instruction.id).parentElement;
      if (instruction.checked) {
        parent.style.opacity = "";
        parent.style.textDecoration = "";
      } else {
        parent.style.opacity = "0.7";
        parent.style.textDecoration = "line-through";
      }
    },
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
  margin-bottom: 10px;
  background-color: white;
  display: flex;
  cursor: pointer;

  label {
    padding: 15px 25px 15px 5px;
    width: 100%;
    cursor: pointer;
  }

  input[type="checkbox"] {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    margin: auto 0px auto 10px;
    cursor: pointer;
  }
}
</style>
