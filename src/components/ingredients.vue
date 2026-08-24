<template>
  <div :class="['ingredientsComponent', { mobileCookingView }]">
    <h2>Ingredients</h2>
    <h4>
      {{ ingredients.length }}
      {{ mobileCookingView ? "items" : "Ingredients" }}
    </h4>
    <div id="servingsContainer">
      <button v-on:click="remove2Portions()">
        <Minus :size="16" aria-label="Decrease servings" />
      </button>
      <input
        name="portions"
        id="portions"
        :class="{ small: this.livePortions < 10 }"
        :placeholder="this.livePortions"
        :value="this.livePortions"
        @change="changeToPortions"
      />
      <label for="portions">Servings</label>
      <button v-on:click="add2Portions()">
        <Plus :size="16" aria-label="Increase servings" />
      </button>
    </div>
    <div id="sortAlphabeticallyAndIgnoreSectionsCheckboxContainer">
      <input
        type="checkbox"
        id="sortAlphabeticallyAndIgnoreSections"
        v-model="sortAlphabeticallyAndIgnoreSections"
      />
      <label for="sortAlphabeticallyAndIgnoreSections"
        >Sort alphabetically and ignore sections</label
      >
    </div>
    <div v-if="sortAlphabeticallyAndIgnoreSections">
      <ul class="ingredients">
        <li
          v-for="ingredient in ingredientsSortedAlphabetically"
          :key="ingredient.id != null ? ingredient.id : ingredient.name"
          :class="{ completed: isCompleted(ingredient) }"
        >
          <span>{{
            `${ingredient.amount} ${ingredient.measurement} ${ingredient.name}`
          }}</span>
          <button
            type="button"
            class="ingredientIconButton"
            :class="{ active: isOwned(ingredient) }"
            :title="
              isOwned(ingredient)
                ? 'Remove from pantry'
                : 'Have this ingredient'
            "
            :aria-label="
              isOwned(ingredient)
                ? 'Remove from pantry'
                : 'Have this ingredient'
            "
            @click="toggleOwned(ingredient)"
          >
            <ShoppingBag :size="18" />
          </button>
          <button
            type="button"
            class="ingredientIconButton"
            :class="{ active: isCompleted(ingredient) }"
            :title="
              isCompleted(ingredient)
                ? 'Mark ingredient as needed'
                : 'Mark ingredient as done'
            "
            :aria-label="
              isCompleted(ingredient)
                ? 'Mark ingredient as needed'
                : 'Mark ingredient as done'
            "
            @click="toggleCompleted(ingredient)"
          >
            <CircleCheck :size="18" />
          </button>
        </li>
      </ul>
    </div>
    <div
      v-else-if="!sortAlphabeticallyAndIgnoreSections"
      v-for="(sectionIngredients, section) in groupedIngredients"
      :key="section"
    >
      <h3
        v-if="section"
        class="ingredientSectionTitle"
        :class="{ completed: isSectionCompleted(sectionIngredients) }"
      >
        <CircleCheck
          v-if="isSectionCompleted(sectionIngredients)"
          :size="18"
          aria-label="Section complete"
        />
        <span>{{ section }}</span>
      </h3>
      <ul
        :class="[
          'ingredients',
          { completed: isSectionCompleted(sectionIngredients) },
        ]"
      >
        <li
          v-for="ingredient in sectionIngredients"
          :key="ingredient.id != null ? ingredient.id : ingredient.name"
          :class="{ completed: isCompleted(ingredient) }"
        >
          <span>{{
            `${ingredient.amount} ${ingredient.measurement} ${ingredient.name}`
          }}</span>
          <button
            type="button"
            class="ingredientIconButton"
            :class="{ active: isOwned(ingredient) }"
            :title="
              isOwned(ingredient)
                ? 'Remove from pantry'
                : 'Have this ingredient'
            "
            :aria-label="
              isOwned(ingredient)
                ? 'Remove from pantry'
                : 'Have this ingredient'
            "
            @click="toggleOwned(ingredient)"
          >
            <ShoppingBag :size="18" />
          </button>
          <button
            type="button"
            class="ingredientIconButton"
            :class="{ active: isCompleted(ingredient) }"
            :title="
              isCompleted(ingredient)
                ? 'Mark ingredient as needed'
                : 'Mark ingredient as done'
            "
            :aria-label="
              isCompleted(ingredient)
                ? 'Mark ingredient as needed'
                : 'Mark ingredient as done'
            "
            @click="toggleCompleted(ingredient)"
          >
            <CircleCheck :size="18" />
          </button>
        </li>
      </ul>
    </div>
    <div
      v-if="
        unsectionedIngredients.length && !sortAlphabeticallyAndIgnoreSections
      "
    >
      <template v-if="ingredients.length !== unsectionedIngredients.length">
        <h3
          class="ingredientSectionTitle"
          :class="{ completed: isSectionCompleted(unsectionedIngredients) }"
        >
          <CircleCheck
            v-if="isSectionCompleted(unsectionedIngredients)"
            :size="18"
            aria-label="Section complete"
          />
          <span>Other Ingredients</span>
        </h3>
      </template>
      <ul
        class="ingredients"
        :style="{ marginTop: unsectionedIngredientsMargin + 'em' }"
      >
        <li
          v-for="ingredient in unsectionedIngredients"
          :key="ingredient.id != null ? ingredient.id : ingredient.name"
          :class="{ completed: isCompleted(ingredient) }"
        >
          <span>{{
            `${ingredient.amount} ${ingredient.measurement} ${ingredient.name}`
          }}</span>
          <button
            type="button"
            class="ingredientIconButton"
            :class="{ active: isOwned(ingredient) }"
            :title="
              isOwned(ingredient)
                ? 'Remove from pantry'
                : 'Have this ingredient'
            "
            :aria-label="
              isOwned(ingredient)
                ? 'Remove from pantry'
                : 'Have this ingredient'
            "
            @click="toggleOwned(ingredient)"
          >
            <ShoppingBag :size="18" />
          </button>
          <button
            type="button"
            class="ingredientIconButton"
            :class="{ active: isCompleted(ingredient) }"
            :title="
              isCompleted(ingredient)
                ? 'Mark ingredient as needed'
                : 'Mark ingredient as done'
            "
            :aria-label="
              isCompleted(ingredient)
                ? 'Mark ingredient as needed'
                : 'Mark ingredient as done'
            "
            @click="toggleCompleted(ingredient)"
          >
            <CircleCheck :size="18" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { CircleCheck, Minus, Plus, ShoppingBag } from "@lucide/vue";

export default {
  name: "ingredientsComponent",
  components: {
    CircleCheck,
    Minus,
    Plus,
    ShoppingBag,
  },
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    portions: {
      type: Number,
      default: 4,
    },
    mobileCookingView: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sortAlphabeticallyAndIgnoreSections: false,
      originalIngredients: JSON.parse(JSON.stringify(this.ingredients)), // Deep copy of ingredients
      livePortions: this.portions || 4,
      ownedIngredientKeys: {},
      completedIngredientKeys: {},
    };
  },
  watch: {
    portions(newPortions) {
      // If the prop changes, update livePortions to match
      this.livePortions = newPortions || 4;
      this.updateIngredientAmounts(newPortions || 4);
    },
    livePortions(newLive) {
      // If live matches prop, reset to original amounts
      if (newLive === (this.portions || 4)) {
        this.updateIngredientAmounts(this.portions || 4);
      } else {
        this.updateIngredientAmounts(newLive);
      }
    },
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
    ingredientKey(ingredient) {
      return String(ingredient.id ?? ingredient.name);
    },
    isOwned(ingredient) {
      return Boolean(this.ownedIngredientKeys[this.ingredientKey(ingredient)]);
    },
    isCompleted(ingredient) {
      return Boolean(
        this.completedIngredientKeys[this.ingredientKey(ingredient)]
      );
    },
    isSectionCompleted(sectionIngredients) {
      return (
        sectionIngredients.length > 0 &&
        sectionIngredients.every((ingredient) => this.isCompleted(ingredient))
      );
    },
    toggleOwned(ingredient) {
      const key = this.ingredientKey(ingredient);
      this.ownedIngredientKeys = {
        ...this.ownedIngredientKeys,
        [key]: !this.ownedIngredientKeys[key],
      };
    },
    toggleCompleted(ingredient) {
      const key = this.ingredientKey(ingredient);
      this.completedIngredientKeys = {
        ...this.completedIngredientKeys,
        [key]: !this.completedIngredientKeys[key],
      };
    },
    roundToTwoDecimals(num) {
      return Math.round(num * 100) / 100;
    },
    add2Portions() {
      let newPortions;
      if (this.livePortions === 1) {
        newPortions = 2;
      } else {
        newPortions = this.livePortions + 2;
      }
      if (!this.checkServings(newPortions)) {
        return;
      }
      this.livePortions = newPortions;
    },
    remove2Portions() {
      const newPortions = this.livePortions - 2;
      if (!this.checkServings(newPortions)) {
        return;
      }
      this.livePortions = newPortions;
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

      this.livePortions = number;
    },
    updateIngredientAmounts(portionCount) {
      if (portionCount === (this.portions || 4)) {
        // Reset ingredients to their original amounts when matching default
        this.ingredients.forEach((ingredient) => {
          // Try to match by id first, fall back to name if id is not available
          const originalIngredient =
            ingredient.id != null
              ? this.originalIngredients.find(
                  (orig) => orig.id === ingredient.id
                )
              : this.originalIngredients.find(
                  (orig) => orig.name === ingredient.name
                );
          if (originalIngredient) {
            ingredient.amount = originalIngredient.amount;
          }
        });
      } else {
        // Update ingredient amounts based on the new portions
        for (const ingredient of this.ingredients) {
          // Try to match by id first, fall back to name if id is not available
          const originalIngredient =
            ingredient.id != null
              ? [...this.originalIngredients].find(
                  (orig) => orig.id === ingredient.id
                )
              : [...this.originalIngredients].find(
                  (orig) => orig.name === ingredient.name
                );
          if (!originalIngredient) {
            continue; // Skip if no original ingredient found
          }
          if (originalIngredient && originalIngredient.amount !== "") {
            ingredient.amount = this.roundToTwoDecimals(
              (originalIngredient.amount / (this.portions || 4)) * portionCount
            );
          }
        }
      }
    },
    checkServings(portions) {
      if (portions === "") {
        document.getElementById("portions").value = this.portions || 4;
        return false;
      }
      if (portions > 98) {
        this.$toast.add({
          severity: "error",
          summary: "Invalid servings",
          detail: "You can't have more than 98 servings!",
        });
        document.getElementById("portions").value = 98;
        this.changeToPortions(98);
        return false;
      }
      if (portions < 1) {
        this.$toast.add({
          severity: "error",
          summary: "Invalid servings",
          detail: "You can't have less than 1 serving!",
        });
        document.getElementById("portions").value = 1;
        this.changeToPortions(1);
        return false;
      }
      if (Number.isNaN(portions)) {
        this.$toast.add({
          severity: "error",
          summary: "Invalid servings",
          detail: `Please enter a valid number of servings, going back to ${
            this.portions || 4
          }.`,
        });
        document.getElementById("portions").value = this.portions || 4;
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.ingredientsComponent {
  min-height: 100%;
  box-sizing: border-box;
}

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
    width: 2.5em;
    padding: 1px 2px;
  }

  #portions.small {
    width: 2em;
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

.ingredientSectionTitle {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0.15rem;

  svg {
    color: #2f9e44;
  }

  &.completed span {
    opacity: 0.2;
    text-decoration: line-through;
  }
}

.ingredients {
  padding: 0;
  margin: 16px 0;

  &.completed {
    margin-top: 0;
  }
}

li {
  padding: 8px 16px;
  list-style: none;
  border: 1px solid lightgrey;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: white;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  display: flex;
  align-items: center;
  gap: 0.6rem;

  > span:first-child {
    flex: 1;
  }

  &.completed {
    padding-top: 3px;
    padding-bottom: 3px;

    > span:first-child {
      opacity: 0.2;
      text-decoration: line-through;
    }
  }

  > span:first-child {
    min-width: 0;
  }
}

.ingredientIconButton {
  display: inline-grid;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  flex: 0 0 auto;
  padding: 0;
  border: 0;
  background: transparent;
  box-shadow: none;
  color: #a7adb5;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #4a8ee7;
    outline-offset: 2px;
  }

  &.active {
    color: #4a8ee7;
  }
}

.ingredientActions,
.ingredientCheck,
.hideIngredient,
.showHidden {
  display: none;
}

.ingredientCheck {
  white-space: nowrap;
}

.hideIngredient,
.showHidden {
  padding: 0.3rem 0.5rem;
}

.ingredientsComponent.mobileCookingView {
  color: #16324f;

  h2,
  h4 {
    text-align: left;
  }

  h2 {
    margin-top: 0;
    font-size: 1.15rem;
  }

  h4 {
    margin-bottom: 0.65rem;
    font-size: 0.82rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #6481a1;
  }

  h3 {
    margin: 0.8rem 0 0.4rem;
    font-size: 0.88rem;
  }

  #servingsContainer {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 0.55rem;

    #portions {
      height: 1.75rem;
      font-size: 0.95rem;
      text-align: center;
    }

    label {
      font-size: 0.88rem;
      font-weight: 600;
    }

    button {
      width: 1.75rem;
      height: 1.75rem;
    }

    * {
      margin: 1px 3px 1px 0;
    }
  }

  #sortAlphabeticallyAndIgnoreSectionsCheckboxContainer {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    margin-bottom: 0.7rem;
    font-size: 0.82rem;
    line-height: 1.25;

    label {
      cursor: pointer;
    }
  }

  li {
    padding: 10px 12px;
    margin-bottom: 0.4rem;
    border-radius: 10px;
    font-size: 0.92rem;
    line-height: 1.28;
    box-shadow: rgba(31, 68, 120, 0.12) 0px 6px 16px;
  }
}

.ingredientsComponent.mobileCookingView {
  color: #16324f;

  h2,
  h4 {
    text-align: left;
  }

  h2 {
    margin-top: 0;
    font-size: 1.15rem;
  }

  h4 {
    margin-bottom: 0.65rem;
    font-size: 0.82rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #6481a1;
  }

  h3 {
    margin: 0.8rem 0 0.4rem;
    font-size: 0.88rem;
  }

  #servingsContainer {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 0.55rem;

    #portions {
      height: 1.75rem;
      font-size: 0.95rem;
      text-align: center;
    }

    label {
      font-size: 0.88rem;
      font-weight: 600;
    }

    button {
      width: 1.75rem;
      height: 1.75rem;
    }

    * {
      margin: 1px 3px 1px 0;
    }
  }

  #sortAlphabeticallyAndIgnoreSectionsCheckboxContainer {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    margin-bottom: 0.7rem;
    font-size: 0.82rem;
    line-height: 1.25;

    label {
      cursor: pointer;
    }
  }

  li {
    padding: 10px 12px;
    margin-bottom: 0.4rem;
    border-radius: 10px;
    font-size: 0.92rem;
    line-height: 1.28;
    box-shadow: rgba(31, 68, 120, 0.12) 0px 6px 16px;
  }
}
</style>
