<template>
  <div :class="['ingredientsComponent', { mobileCookingView }]">
    <h2>Ingredients</h2>
    <h4 v-if="!mobileCookingView">
      {{ displayedIngredientCount }} Ingredients
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
        :checked="sortAlphabeticallyAndIgnoreSections"
        type="checkbox"
        @change="
          $emit(
            'update:sortAlphabeticallyAndIgnoreSections',
            $event.target.checked
          )
        "
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
    livePortions: { type: Number, default: 4 },
    completedIngredientKeys: { type: Object, default: () => ({}) },
    ownedIngredientKeys: { type: Object, default: () => ({}) },
    sortAlphabeticallyAndIgnoreSections: { type: Boolean, default: false },
    mobileCookingView: { type: Boolean, default: false },
  },
  emits: [
    "update:livePortions",
    "update:completedIngredientKeys",
    "update:ownedIngredientKeys",
    "update:sortAlphabeticallyAndIgnoreSections",
  ],
  computed: {
    scaledIngredients() {
      const basePortions = this.portions || 4;
      return this.ingredients.map((ingredient, index) => ({
        ...ingredient,
        amount:
          ingredient.amount === ""
            ? ""
            : Math.round(
                (ingredient.amount / basePortions) * this.livePortions * 100
              ) / 100,
        _uiKey: ingredient.id ?? `ingredient-${index}`,
      }));
    },
    ingredientGroups() {
      if (this.sortAlphabeticallyAndIgnoreSections)
        return [
          {
            key: "all",
            title: "",
            ingredients: this.combineIngredients(this.scaledIngredients).sort(
              (a, b) => a.name.localeCompare(b.name)
            ),
          },
        ];
      const groups = Object.entries(
        this.scaledIngredients.reduce((result, ingredient) => {
          if (ingredient.section) {
            if (!result[ingredient.section]) result[ingredient.section] = [];
            result[ingredient.section].push(ingredient);
          }
          return result;
        }, {})
      ).map(([title, ingredients]) => ({ key: title, title, ingredients }));
      const other = this.scaledIngredients.filter(
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
    displayedIngredientCount() {
      return this.ingredientGroups.reduce(
        (count, group) => count + group.ingredients.length,
        0
      );
    },
  },
  methods: {
    normalizedName(name) {
      return String(name || "")
        .normalize("NFKC")
        .trim()
        .replace(/\s+/g, " ")
        .toLocaleLowerCase();
    },
    normalizedMeasurement(measurement) {
      const normalized = String(measurement || "")
        .trim()
        .replace(/\s+/g, " ")
        .toLocaleLowerCase();
      const aliases = {
        l: "l",
        liter: "l",
        litre: "l",
        liters: "l",
        litres: "l",
        literar: "l",
        dl: "dl",
        deciliter: "dl",
        cl: "cl",
        centiliter: "cl",
        ml: "ml",
        milliliter: "ml",
        msk: "msk",
        matsked: "msk",
        matskedar: "msk",
        tsk: "tsk",
        tesked: "tsk",
        teskedar: "tsk",
        krm: "krm",
        kryddmått: "krm",
      };
      return aliases[normalized] || normalized;
    },
    numericAmount(amount) {
      if (typeof amount === "number") {
        return Number.isFinite(amount) ? amount : null;
      }
      if (typeof amount !== "string" || !amount.trim()) return null;
      const parsed = Number(amount.trim().replace(",", "."));
      return Number.isFinite(parsed) ? parsed : null;
    },
    sourceIngredientKeys(ingredient) {
      return ingredient._sourceKeys || [this.ingredientKey(ingredient)];
    },
    combineIngredients(ingredients) {
      const ingredientsByName = new Map();
      for (const ingredient of ingredients) {
        const nameKey = this.normalizedName(ingredient.name);
        if (!nameKey) {
          ingredientsByName.set(Symbol(), [ingredient]);
          continue;
        }
        if (!ingredientsByName.has(nameKey)) {
          ingredientsByName.set(nameKey, []);
        }
        ingredientsByName.get(nameKey).push(ingredient);
      }

      const combined = [];
      const volumeInMilliliters = {
        l: 1000,
        dl: 100,
        cl: 10,
        msk: 15,
        tsk: 5,
        ml: 1,
        krm: 1,
      };

      for (const nameIngredients of ingredientsByName.values()) {
        const measurementGroups = new Map();
        for (const ingredient of nameIngredients) {
          const measurement = this.normalizedMeasurement(
            ingredient.measurement
          );
          if (!measurementGroups.has(measurement)) {
            measurementGroups.set(measurement, []);
          }
          measurementGroups.get(measurement).push(ingredient);
        }

        const mergedGroups = [];
        for (const items of measurementGroups.values()) {
          const amounts = items.map((item) => this.numericAmount(item.amount));
          if (items.length > 1 && amounts.every((amount) => amount !== null)) {
            mergedGroups.push({
              ...items[0],
              amount: this.roundAmount(
                amounts.reduce((sum, amount) => sum + amount, 0)
              ),
              measurement: items[0].measurement,
              _sourceKeys: items.flatMap((item) =>
                this.sourceIngredientKeys(item)
              ),
            });
          } else {
            mergedGroups.push(...items);
          }
        }

        const convertibleGroups = mergedGroups.filter(
          (item) =>
            Object.prototype.hasOwnProperty.call(
              volumeInMilliliters,
              this.normalizedMeasurement(item.measurement)
            ) && this.numericAmount(item.amount) !== null
        );
        if (convertibleGroups.length > 1) {
          const totalMilliliters = convertibleGroups.reduce(
            (sum, item) =>
              sum +
              this.numericAmount(item.amount) *
                volumeInMilliliters[
                  this.normalizedMeasurement(item.measurement)
                ],
            0
          );
          const preferredUnits = ["l", "dl", "msk", "cl", "tsk", "ml"];
          const outputMeasurement =
            preferredUnits.find(
              (unit) => totalMilliliters >= volumeInMilliliters[unit]
            ) || "ml";
          const mergedVolume = {
            ...convertibleGroups[0],
            amount: this.roundAmount(
              totalMilliliters / volumeInMilliliters[outputMeasurement]
            ),
            measurement: outputMeasurement,
            _sourceKeys: convertibleGroups.flatMap((item) =>
              this.sourceIngredientKeys(item)
            ),
          };
          const convertibleSet = new Set(convertibleGroups);
          combined.push(
            ...mergedGroups.filter((item) => !convertibleSet.has(item)),
            mergedVolume
          );
        } else {
          combined.push(...mergedGroups);
        }
      }

      return combined;
    },
    roundAmount(amount) {
      return Math.round((amount + Number.EPSILON) * 100) / 100;
    },
    ingredientKey(ingredient) {
      return String(ingredient.id ?? ingredient._uiKey);
    },
    isOwned(ingredient) {
      return this.sourceIngredientKeys(ingredient).every(
        (key) => this.ownedIngredientKeys[key]
      );
    },
    isCompleted(ingredient) {
      return this.sourceIngredientKeys(ingredient).every(
        (key) => this.completedIngredientKeys[key]
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
      const keys = this.sourceIngredientKeys(ingredient);
      const owned = this.isOwned(ingredient);
      this.$emit("update:ownedIngredientKeys", {
        ...this.ownedIngredientKeys,
        ...Object.fromEntries(keys.map((key) => [key, !owned])),
      });
    },
    toggleCompleted(ingredient) {
      const keys = this.sourceIngredientKeys(ingredient);
      const completed = this.isCompleted(ingredient);
      this.$emit("update:completedIngredientKeys", {
        ...this.completedIngredientKeys,
        ...Object.fromEntries(keys.map((key) => [key, !completed])),
      });
    },
    toggleSection(items) {
      const done = !this.isSectionCompleted(items);
      const completedIngredientKeys = items.reduce(
        (state, ingredient) =>
          this.sourceIngredientKeys(ingredient).reduce(
            (keys, key) => ({ ...keys, [key]: done }),
            state
          ),
        { ...this.completedIngredientKeys }
      );
      this.$emit("update:completedIngredientKeys", completedIngredientKeys);
    },
    changePortions(delta) {
      const portions = this.livePortions + delta;
      if (this.validPortions(portions))
        this.$emit("update:livePortions", portions);
    },
    setPortions(event) {
      const portions = Number.parseInt(event.target.value, 10);
      if (this.validPortions(portions))
        this.$emit("update:livePortions", portions);
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.1rem;
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
  display: flex;
  align-items: center;
  justify-content: center;
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
.ingredientsComponent.mobileCookingView h2 {
  margin-top: 0;
  margin-bottom: 0.6rem;
  font-size: 1.15rem;
  letter-spacing: 0.01em;
}
.ingredientsComponent.mobileCookingView li {
  padding: 10px 12px;
  margin-bottom: 0.4rem;
  border-radius: 10px;
  font-size: 0.92rem;
}
.ingredientsComponent.mobileCookingView li.completed {
  padding-top: 3px;
  padding-bottom: 3px;
}
</style>
