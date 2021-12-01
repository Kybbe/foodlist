<template>
  <h2>Ingredients</h2>
  <h4>{{ ingredients.length }} ingredients</h4>
  <div id="servingsContainer">
    <button v-on:click="remove2Portions()">-</button>
    <input
      name="portions"
      id="portions"
      :placeholder="this.portions"
      :value="this.portions"
      @change="changeToPortions"
    />
    <label for="portions">Servings</label>
    <button v-on:click="add2Portions()">+</button>
  </div>
  <ul class="ingredients">
    <li v-for="ingredient in ingredients" :key="ingredient.name">
      {{ ` ${ingredient.amount} ${ingredient.measurment} ${ingredient.name} ` }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "ingredients",
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      portions: 4,
    };
  },
  methods: {
    add2Portions() {
      let newPortions = this.portions + 2;
      if (!this.checkServings(newPortions)) {
        return;
      }
      this.ingredients.forEach((ingredient) => {
        if (ingredient.amount != "") {
          ingredient.amount /= this.portions;
          Math.round((ingredient.amount *= newPortions));
        }
      });
      this.portions += 2;
    },
    remove2Portions() {
      let newPortions = this.portions - 2;
      if (!this.checkServings(newPortions)) {
        return;
      }
      this.ingredients.forEach((ingredient) => {
        if (ingredient.amount != "") {
          ingredient.amount /= this.portions;
          Math.round((ingredient.amount *= newPortions));
        }
      });
      this.portions -= 2;
    },
    changeToPortions(e) {
      let number = parseInt(e.target.value);
      if (!this.checkServings(number)) {
        return;
      }
      if (number % 2 == 0) {
        if (this.portions != number) {
          let oldPortions = this.portions;
          this.portions = number;
          this.ingredients.forEach((ingredient) => {
            if (ingredient.amount != "") {
              ingredient.amount /= oldPortions;
              Math.round((ingredient.amount *= this.portions));
            }
          });
        }
      }
    },
    checkServings(portions) {
      if (portions == "") {
        document.getElementById("portions").value = this.portions;
        return false;
      } else if (portions > 98) {
        alert("You can't have more than 98 servings!");
        document.getElementById("portions").value = 98;
        return false;
      } else if (portions < 2) {
        alert("You can't have less than 2 servings!");
        document.getElementById("portions").value = 2;
        return false;
      } else if (isNaN(portions)) {
        document.getElementById("portions").value = this.portions;
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
h2,
h4 {
  margin: 0;
  text-align: center;
}

h2 {
  margin-top: 10px;
  margin-bottom: 3px;
}

h4 {
  margin-bottom: 10px;
}

#servingsContainer {
  text-align: center;

  #portions {
    width: 1.2em;
    padding: 1px 2px;
  }

  button {
    border-radius: 5px;
    width: calc(1em + 4px);
    border: 1px solid black;
    padding: 1px 2px;
    cursor: pointer;
    font-size: 1em;
    background-color: #4a8ee7;
    color: white;
  }

  * {
    margin: 2px;
  }
}

ul {
  padding: 0;
}

li {
  padding: 12px 24px;
  list-style: none;
  border: 1px solid lightgrey;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: white;
}
</style>
