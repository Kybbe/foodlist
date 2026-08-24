<template>
  <div :class="['ingredientsComponent', { mobileCookingView }]">
    <h2>Ingredients</h2>
    <h4>
      {{ ingredients.length }} {{ mobileCookingView ? "items" : "Ingredients" }}
    </h4>
    <div id="servingsContainer">
      <button type="button" @click="changePortions(-2)">
        <Minus :size="16" />
      </button>
      <input id="portions" :value="livePortions" @change="setPortions" />
      <label for="portions">Servings</label>
      <button type="button" @click="changePortions(2)">
        <Plus :size="16" />
      </button>
    </div>
    <div id="sortAlphabeticallyAndIgnoreSectionsCheckboxContainer">
      <input
        id="sortIngredients"
        v-model="sortAlphabeticallyAndIgnoreSections"
        type="checkbox"
      />
      <label for="sortIngredients"
        >Sort alphabetically and ignore sections</label
      >
    </div>
    <section v-for="group in ingredientGroups" :key="group.key">
      <h3
        v-if="group.title"
        class="ingredientSectionTitle"
        :class="{ completed: isSectionCompleted(group.ingredients) }"
      >
        <button
          type="button"
          class="sectionCompletionButton"
          :class="{ completed: isSectionCompleted(group.ingredients) }"
          :title="sectionLabel(group.ingredients)"
          @click="toggleSection(group.ingredients)"
        >
          <CircleCheck :size="18" />
        </button>
        <span>{{ group.title }}</span>
      </h3>
      <ul
        class="ingredients"
        :class="{ completed: isSectionCompleted(group.ingredients) }"
      >
        <li
          v-for="ingredient in group.ingredients"
          :key="ingredientKey(ingredient)"
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
            @click="toggleCompleted(ingredient)"
          >
            <CircleCheck :size="18" />
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { CircleCheck, Minus, Plus, ShoppingBag } from "@lucide/vue";

export default {
  name: "ingredientsComponent",
  components: { CircleCheck, Minus, Plus, ShoppingBag },
  props: {
    ingredients: { type: Array, required: true },
    portions: { type: Number, default: 4 },
    mobileCookingView: { type: Boolean, default: false },
  },
  data() {
    return {
      sortAlphabeticallyAndIgnoreSections: false,
      livePortions: this.portions || 4,
      originalIngredients: JSON.parse(JSON.stringify(this.ingredients)),
      ownedIngredientKeys: {},
      completedIngredientKeys: {},
    };
  },
  watch: {
    portions(value) {
      this.livePortions = value || 4;
      this.updateAmounts();
    },
    livePortions() {
      this.updateAmounts();
    },
  },
  computed: {
    ingredientGroups() {
      if (this.sortAlphabeticallyAndIgnoreSections)
        return [
          {
            key: "all",
            title: "",
            ingredients: [...this.ingredients].sort((a, b) =>
              a.name.localeCompare(b.name)
            ),
          },
        ];
      const groups = Object.entries(
        this.ingredients.reduce((result, ingredient) => {
          if (ingredient.section) {
            if (!result[ingredient.section]) result[ingredient.section] = [];
            result[ingredient.section].push(ingredient);
          }
          return result;
        }, {})
      ).map(([title, ingredients]) => ({ key: title, title, ingredients }));
      const other = this.ingredients.filter(
        (ingredient) => !ingredient.section
      );
      if (other.length)
        groups.push({
          key: "other",
          title: groups.length ? "Other Ingredients" : "",
          ingredients: other,
        });
      return groups;
    },
  },
  methods: {
    ingredientKey(ingredient) {
      return String(
        ingredient.id ??
          `${ingredient.name}-${ingredient.amount}-${ingredient.measurement}`
      );
    },
    isOwned(ingredient) {
      return Boolean(this.ownedIngredientKeys[this.ingredientKey(ingredient)]);
    },
    isCompleted(ingredient) {
      return Boolean(
        this.completedIngredientKeys[this.ingredientKey(ingredient)]
      );
    },
    isSectionCompleted(items) {
      return (
        items.length > 0 &&
        items.every((ingredient) => this.isCompleted(ingredient))
      );
    },
    sectionLabel(items) {
      return this.isSectionCompleted(items)
        ? "Mark all ingredients as needed"
        : "Mark all ingredients as done";
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
    toggleSection(items) {
      const done = !this.isSectionCompleted(items);
      this.completedIngredientKeys = items.reduce(
        (state, ingredient) => ({
          ...state,
          [this.ingredientKey(ingredient)]: done,
        }),
        { ...this.completedIngredientKeys }
      );
    },
    changePortions(delta) {
      const portions = this.livePortions + delta;
      if (this.validPortions(portions)) this.livePortions = portions;
    },
    setPortions(event) {
      const portions = Number.parseInt(event.target.value, 10);
      if (this.validPortions(portions)) this.livePortions = portions;
    },
    validPortions(portions) {
      if (Number.isNaN(portions) || portions < 1 || portions > 98) {
        this.$toast.add({
          severity: "error",
          summary: "Invalid servings",
          detail: "Please enter between 1 and 98 servings.",
        });
        return false;
      }
      return true;
    },
    updateAmounts() {
      this.ingredients.forEach((ingredient) => {
        const original = this.originalIngredients.find(
          (item) =>
            item.id === ingredient.id ||
            (!item.id && item.name === ingredient.name)
        );
        if (original?.amount !== "")
          ingredient.amount =
            Math.round(
              (original.amount / (this.portions || 4)) * this.livePortions * 100
            ) / 100;
      });
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
  margin: 10px 0 3px;
}
h4 {
  margin-bottom: 10px;
}
#servingsContainer,
#sortAlphabeticallyAndIgnoreSectionsCheckboxContainer {
  text-align: center;
  margin-bottom: 0.7rem;
}
#servingsContainer button {
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 2px;
  border: 1px solid black;
  border-radius: 50%;
  background: white;
  color: #4a8ee7;
  cursor: pointer;
}
#portions {
  width: 2.5em;
  padding: 1px 2px;
}
.ingredientSectionTitle {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0.8rem 0 0.15rem;
}
.ingredientSectionTitle.completed span {
  opacity: 0.2;
  text-decoration: line-through;
}
.sectionCompletionButton,
.ingredientIconButton {
  display: inline-grid;
  place-items: center;
  padding: 0;
  border: 0;
  background: transparent;
  box-shadow: none;
  cursor: pointer;
}
.sectionCompletionButton {
  color: #a7adb5;
}
.sectionCompletionButton.completed {
  color: #2f9e44;
}
.ingredientIconButton {
  width: 1.75rem;
  height: 1.75rem;
  color: #a7adb5;
}
.ingredientIconButton.active {
  color: #4a8ee7;
}
.ingredients {
  padding: 0;
  margin: 16px 0 24px 0;
}
.ingredients.completed {
  margin: 0 0 12px 0;
}
li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 8px 16px;
  margin-bottom: 5px;
  list-style: none;
  border: 1px solid lightgrey;
  border-radius: 5px;
  background: white;
  box-shadow: rgba(17, 17, 26, 0.1) 0 0 16px;
}
li > span {
  flex: 1;
  min-width: 0;
}
li.completed {
  padding-top: 3px;
  padding-bottom: 3px;
}
li.completed > span {
  opacity: 0.2;
  text-decoration: line-through;
}
.ingredientsComponent.mobileCookingView {
  color: #16324f;
}
.ingredientsComponent.mobileCookingView h2,
.ingredientsComponent.mobileCookingView h4 {
  text-align: left;
}
.ingredientsComponent.mobileCookingView li {
  padding: 10px 12px;
  margin-bottom: 0.4rem;
  border-radius: 10px;
  font-size: 0.92rem;
}
</style>
