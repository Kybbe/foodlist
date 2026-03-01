<template>
  <div class="auto-completing-ingredient-input">
    <AutoComplete
      name="name"
      :suggestions="filteredSuggestions"
      :modelValue="currentValue"
      :placeholder="placeholder"
      @update:modelValue="onModelValueUpdate"
      @focus="onFocus"
      @blur="onBlur"
      @complete="search"
    />
  </div>
</template>

<script>
import AutoComplete from "primevue/autocomplete";

export default {
  name: "autoCompletingIngredientInput",
  components: {
    AutoComplete,
  },
  emits: ["update:modelValue", "input"],
  props: {
    placeholder: {
      type: String,
      default: "Enter ingredient name",
    },
    modelValue: {
      type: String,
      default: undefined,
    },
    // Backward-compat: allow Vue 2-style v-model (value + input)
    value: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      showSuggestions: true,
      filteredSuggestions: [],
    };
  },
  computed: {
    currentValue() {
      return this.modelValue !== undefined ? this.modelValue : this.value || "";
    },
  },
  methods: {
    normalizeValue(payload) {
      // PrimeVue may emit the raw value (string) for update:modelValue,
      // while change emits an object like { originalEvent, value }.
      return payload && payload.value !== undefined ? payload.value : payload;
    },
    onModelValueUpdate(payload) {
      const nextValue = this.normalizeValue(payload);
      this.$emit("update:modelValue", nextValue);
      this.$emit("input", nextValue);
      this.showSuggestions = true;
    },
    onFocus() {
      this.showSuggestions = true;
    },
    onBlur() {
      this.showSuggestions = false;
    },
    selectSuggestion(suggestion) {
      this.showSuggestions = false;
    },
    getSuggestions() {
      const recipes = this.$store.state.recipesList;
      const ingredients = (recipes || []).flatMap((recipe) =>
        Array.isArray(recipe?.ingredients) ? recipe.ingredients : []
      );
      const uniqueIngredients = [
        ...new Set(
          ingredients
            .map((ingredient) => ingredient?.name)
            .filter((name) => typeof name === "string" && name.trim().length)
        ),
      ];
      return uniqueIngredients;
    },
    search(e) {
      setTimeout(() => {
        if (!e.query.trim().length) {
          this.filteredSuggestions = [...this.getSuggestions()].slice(0, 10);
        } else {
          this.filteredSuggestions = this.getSuggestions()
            .filter((suggestion) =>
              suggestion.toLowerCase().includes(e.query.toLowerCase())
            )
            .slice(0, 10);
        }
      }, 200);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
