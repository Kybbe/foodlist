<template>
  <h2>Ingredients</h2>
  <h4>{{ ingredients.length }} Ingredients</h4>
  <div id="servingsContainer">
    <button v-on:click="remove2Portions()">
      <svg
        version="1.1"
        viewBox="0 0 32 32"
        role="presentation"
        aria-label="Decrease servings"
        class="svg-icon svg-fill"
      >
        <path
          pid="0"
          fill-rule="evenodd"
          d="M23.768 15H9a.249.249 0 00-.223.138l-.75 1.5A.25.25 0 008.25 17h15.518a.258.258 0 00.259-.259v-1.483a.258.258 0 00-.26-.258"
        ></path>
      </svg>
    </button>
    <input
      name="portions"
      id="portions"
      :placeholder="this.portions"
      :value="this.portions"
      @change="changeToPortions"
    />
    <label for="portions">Servings</label>
    <button v-on:click="add2Portions()">
      <svg
        version="1.1"
        viewBox="0 0 32 32"
        role="presentation"
        aria-label="Increase servings"
        class="svg-icon svg-fill"
      >
        <path
          pid="0"
          fill-rule="evenodd"
          d="M23.768 14.994h-6.744V8.258A.26.26 0 0016.766 8h-1.477a.257.257 0 00-.262.262v6.732H9a.249.249 0 00-.223.138l-.75 1.5a.25.25 0 00.223.362h6.777v6.748c0 .142.116.258.258.258l1.48-.004a.25.25 0 00.259-.258v-6.744h6.744a.258.258 0 00.259-.259v-1.483a.258.258 0 00-.26-.258"
        ></path>
      </svg>
    </button>
  </div>
	<div id="sortAlphabeticallyAndIgnoreSectionsCheckboxContainer">
		<input
			type="checkbox"
			id="sortAlphabeticallyAndIgnoreSections"
			v-model="sortAlphabeticallyAndIgnoreSections"
		/>
		<label for="sortAlphabeticallyAndIgnoreSections">Sort alphabetically and ignore sections</label>
	</div>
	<div v-if="sortAlphabeticallyAndIgnoreSections">
		<ul class="ingredients">
			<li v-for="ingredient in ingredientsSortedAlphabetically" :key="ingredient.name">
				{{ `${ingredient.amount} ${ingredient.measurment} ${ingredient.name}` }}
			</li>
		</ul>
	</div>
  <div v-else-if="!sortAlphabeticallyAndIgnoreSections" v-for="(sectionIngredients, section) in groupedIngredients" :key="section">
    <h3 v-if="section">{{ section }}</h3>
    <ul class="ingredients">
      <li v-for="ingredient in sectionIngredients" :key="ingredient.name">
        {{ `${ingredient.amount} ${ingredient.measurment} ${ingredient.name}` }}
      </li>
    </ul>
  </div>
  <div v-if="unsectionedIngredients.length && !sortAlphabeticallyAndIgnoreSections">
		<h3>Other Ingredients</h3>
			<ul class="ingredients" :style="{ marginTop: unsectionedIngredientsMargin + 'em' }">
      <li v-for="ingredient in unsectionedIngredients" :key="ingredient.name">
        {{ `${ingredient.amount} ${ingredient.measurment} ${ingredient.name}` }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
	name: "ingredientsComponent",
	props: {
		ingredients: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			portions: 4,
			sortAlphabeticallyAndIgnoreSections: false,
		};
	},
	computed: {
		unsectionedIngredientsMargin() {
			return `${this.groupedIngredients.length ? "4" : "1"}em`;
		},
		groupedIngredients() {
			return [...this.ingredients].reduce((acc, ingredient) => {
				const section = ingredient.section;
				if (!section) {
					return acc;
				}
				if (!acc[section]) {
					acc[section] = [];
				}
				acc[section].push(ingredient);
				return acc;
			}, {});
		},
		unsectionedIngredients() {
			return [...this.ingredients].filter((ingredient) => !ingredient.section);
		},
		ingredientsSortedAlphabetically() {
			return [...this.ingredients].sort((a, b) => {
				const nameA = a.name.toLowerCase();
				const nameB = b.name.toLowerCase();
				if (nameA < nameB) return -1;
				if (nameA > nameB) return 1;
				return 0;
			});
		},
	},
	methods: {
		add2Portions() {
			const newPortions = this.portions + 2;
			if (!this.checkServings(newPortions)) {
				return;
			}
			for (const ingredient of this.ingredients) {
				if (ingredient.amount !== "") {
					ingredient.amount /= this.portions;
					ingredient.amount = Math.round(ingredient.amount * newPortions);
				}
			}
			this.portions += 2;
		},
		remove2Portions() {
			const newPortions = this.portions - 2;
			if (!this.checkServings(newPortions)) {
				return;
			}
			for (const ingredient of this.ingredients) {
				if (ingredient.amount !== "") {
					ingredient.amount /= this.portions;
					ingredient.amount = Math.round(ingredient.amount * newPortions);
				}
			}
			this.portions -= 2;
		},
		changeToPortions(e) {
			let number = 0;
			if (typeof e === "number") {
				number = e;
			} else {
				number = Number.parseInt(e.target.value);
			}

			if (!this.checkServings(number)) {
				return;
			}

			if (this.portions !== number) {
				const oldPortions = [...this.portions];
				this.portions = number;

				for (const ingredient of this.ingredients) {
					if (ingredient.amount !== "") {
						ingredient.amount /= oldPortions;
						ingredient.amount = Math.round(ingredient.amount * this.portions);
					}
				}
			}
		},
		checkServings(portions) {
			if (portions === "") {
				document.getElementById("portions").value = this.portions;
				return false;
			}
			if (portions > 98) {
				alert("You can't have more than 98 servings!");
				document.getElementById("portions").value = 98;
				this.changeToPortions(98);
				return false;
			}
			if (portions < 1) {
				alert("You can't have less than 1 serving!");
				document.getElementById("portions").value = 1;
				this.changeToPortions(1);
				return false;
			}
			if (Number.isNaN(portions)) {
				document.getElementById("portions").value = this.portions;
				return false;
			}
			return true;
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
    border-radius: 50%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border: 1px solid black;
    padding: 0px;
    cursor: pointer;
    background-color: white;
    overflow: hidden;
    width: 1.5rem;
    height: 1.5rem;
    margin: 0px 2px;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: lightsalmon;
    }

    svg {
      width: 1rem;
      height: 1rem;
      fill: #4a8ee7;
      display: inline-block;
      vertical-align: middle;
    }
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
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
}
</style>
