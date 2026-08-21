<template>
  <div :class="['ingredientsComponent', { mobileCookingView }]">
    <h2>Ingredients</h2>
    <h4>
      {{ displayedIngredients.length }}
      {{ mobileCookingView ? "items" : "Ingredients" }}
    </h4>
    <div class="ingredientActions">
      <button
        type="button"
        class="ingredientAction"
        :class="{ active: shoppingMode }"
        title="Shopping list mode"
        aria-label="Shopping list mode"
        @click="shoppingMode = !shoppingMode"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 8h12l-1 12H7L6 8Zm3 0a3 3 0 0 1 6 0M4 8h16" />
        </svg>
      </button>
      <button
        type="button"
        class="ingredientAction"
        :class="{ active: hideMode }"
        title="Hide ingredients already added"
        aria-label="Hide ingredients already added"
        @click="hideMode = !hideMode"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 4.2A10.7 10.7 0 0 1 12 4c5.5 0 9.5 5.1 9.5 8s-1.4 4.5-3.5 6.1M6.4 6.4C4 8 2.5 10.3 2.5 12c0 2.9 4 8 9.5 8 1.1 0 2.1-.2 3-.6"
          />
        </svg>
      </button>
      <button
        v-if="hiddenIngredientCount"
        type="button"
        class="showHidden"
        @click="showHidden = !showHidden"
      >
        {{
          showHidden ? "Hide hidden" : `Show hidden (${hiddenIngredientCount})`
        }}
      </button>
    </div>
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
        :class="{ small: this.livePortions < 10 }"
        :placeholder="this.livePortions"
        :value="this.livePortions"
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
      <label for="sortAlphabeticallyAndIgnoreSections"
        >Sort alphabetically and ignore sections</label
      >
    </div>
    <div v-if="sortAlphabeticallyAndIgnoreSections">
      <ul class="ingredients">
        <li
          v-for="ingredient in ingredientsSortedAlphabetically"
          :key="ingredient.id != null ? ingredient.id : ingredient.name"
          :class="{ owned: isOwned(ingredient) }"
        >
          <span>{{
            `${ingredient.amount} ${ingredient.measurement} ${ingredient.name}`
          }}</span>
          <label v-if="shoppingMode" class="ingredientCheck">
            <input
              type="checkbox"
              :checked="isOwned(ingredient)"
              @change="toggleOwned(ingredient)"
            />
            <span>Have it</span>
          </label>
          <button
            v-if="hideMode"
            type="button"
            class="hideIngredient"
            :title="
              isHidden(ingredient) ? 'Show ingredient' : 'Hide ingredient'
            "
            @click="toggleHidden(ingredient)"
          >
            {{ isHidden(ingredient) ? "Show" : "Hide" }}
          </button>
        </li>
      </ul>
    </div>
    <div
      v-else-if="!sortAlphabeticallyAndIgnoreSections"
      v-for="(sectionIngredients, section) in groupedIngredients"
      :key="section"
    >
      <h3 v-if="section">{{ section }}</h3>
      <ul class="ingredients">
        <li
          v-for="ingredient in sectionIngredients"
          :key="ingredient.id != null ? ingredient.id : ingredient.name"
          :class="{ owned: isOwned(ingredient) }"
        >
          <span>{{
            `${ingredient.amount} ${ingredient.measurement} ${ingredient.name}`
          }}</span>
          <label v-if="shoppingMode" class="ingredientCheck">
            <input
              type="checkbox"
              :checked="isOwned(ingredient)"
              @change="toggleOwned(ingredient)"
            />
            <span>Have it</span>
          </label>
          <button
            v-if="hideMode"
            type="button"
            class="hideIngredient"
            :title="
              isHidden(ingredient) ? 'Show ingredient' : 'Hide ingredient'
            "
            @click="toggleHidden(ingredient)"
          >
            {{ isHidden(ingredient) ? "Show" : "Hide" }}
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
        <h3>Other Ingredients</h3>
      </template>
      <ul
        class="ingredients"
        :style="{ marginTop: unsectionedIngredientsMargin + 'em' }"
      >
        <li
          v-for="ingredient in unsectionedIngredients"
          :key="ingredient.id != null ? ingredient.id : ingredient.name"
          :class="{ owned: isOwned(ingredient) }"
        >
          <span>{{
            `${ingredient.amount} ${ingredient.measurement} ${ingredient.name}`
          }}</span>
          <label v-if="shoppingMode" class="ingredientCheck">
            <input
              type="checkbox"
              :checked="isOwned(ingredient)"
              @change="toggleOwned(ingredient)"
            />
            <span>Have it</span>
          </label>
          <button
            v-if="hideMode"
            type="button"
            class="hideIngredient"
            :title="
              isHidden(ingredient) ? 'Show ingredient' : 'Hide ingredient'
            "
            @click="toggleHidden(ingredient)"
          >
            {{ isHidden(ingredient) ? "Show" : "Hide" }}
          </button>
        </li>
      </ul>
    </div>
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
      shoppingMode: false,
      hideMode: false,
      showHidden: false,
      ownedIngredientKeys: {},
      hiddenIngredientKeys: {},
    };
  },
  created() {
    this.loadIngredientState();
  },
  watch: {
    "$route.params.id"() {
      this.loadIngredientState();
    },
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
    displayedIngredients() {
      return this.showHidden
        ? this.ingredients
        : this.ingredients.filter((ingredient) => !this.isHidden(ingredient));
    },
    hiddenIngredientCount() {
      return this.ingredients.filter((ingredient) => this.isHidden(ingredient))
        .length;
    },
    unsectionedIngredientsMargin() {
      return `${this.groupedIngredients.length ? "4" : "1"}em`;
    },
    groupedIngredients() {
      return [...this.displayedIngredients].reduce((acc, ingredient) => {
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
      return [...this.displayedIngredients].filter(
        (ingredient) => !ingredient.section
      );
    },
    ingredientsSortedAlphabetically() {
      return [...this.displayedIngredients].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    },
  },
  methods: {
    ingredientStorageKey() {
      return `foodlist:ingredients:${this.$route.params.id || "unknown"}`;
    },
    ingredientKey(ingredient) {
      return String(ingredient.id ?? ingredient.name);
    },
    loadIngredientState() {
      try {
        const savedState = JSON.parse(
          localStorage.getItem(this.ingredientStorageKey()) || "{}"
        );
        this.ownedIngredientKeys = savedState.ownedIngredientKeys || {};
        this.hiddenIngredientKeys = savedState.hiddenIngredientKeys || {};
      } catch (error) {
        this.ownedIngredientKeys = {};
        this.hiddenIngredientKeys = {};
      }
    },
    saveIngredientState() {
      localStorage.setItem(
        this.ingredientStorageKey(),
        JSON.stringify({
          ownedIngredientKeys: this.ownedIngredientKeys,
          hiddenIngredientKeys: this.hiddenIngredientKeys,
        })
      );
    },
    isOwned(ingredient) {
      return Boolean(this.ownedIngredientKeys[this.ingredientKey(ingredient)]);
    },
    isHidden(ingredient) {
      return Boolean(this.hiddenIngredientKeys[this.ingredientKey(ingredient)]);
    },
    toggleOwned(ingredient) {
      const key = this.ingredientKey(ingredient);
      this.ownedIngredientKeys[key] = !this.ownedIngredientKeys[key];
      this.saveIngredientState();
    },
    toggleHidden(ingredient) {
      const key = this.ingredientKey(ingredient);
      this.hiddenIngredientKeys[key] = !this.hiddenIngredientKeys[key];
      this.saveIngredientState();
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

li {
  padding: 12px 24px;
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

  &.owned > span:first-child {
    opacity: 0.55;
    text-decoration: line-through;
  }
}

.ingredientActions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin: 0 0 0.7rem;
}

.ingredientAction,
.hideIngredient,
.showHidden {
  border: 1px solid #4a8ee7;
  background: white;
  color: #245d9b;
  cursor: pointer;
}

.ingredientAction {
  display: inline-grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border-radius: 50%;

  svg {
    width: 1.15rem;
    height: 1.15rem;
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.8;
  }

  &.active {
    background: #4a8ee7;
    color: white;
  }
}

.ingredientCheck {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  white-space: nowrap;
  font-size: 0.82rem;
}

.hideIngredient,
.showHidden {
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
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
