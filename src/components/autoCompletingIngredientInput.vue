<template>
  <div class="auto-completing-ingredient-input">
    <AutoComplete name="ingredient" :suggestions="getSuggestions()" v-model="inputValue" :placeholder="placeholder" @focus="onFocus" @blur="onBlur" @complete="search" />
  </div>
</template>

<script>
export default {
	name: "autoCompletingIngredientInput",
	props: {
		placeholder: {
			type: String,
			default: "Enter ingredient name",
		},
		value: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			inputValue: "",
			showSuggestions: true,
			filteredSuggestions: [],
		};
	},
	methods: {
		onFocus() {
			this.showSuggestions = true;
		},
		onBlur() {
			this.showSuggestions = false;
		},
		selectSuggestion(suggestion) {
			this.inputValue = suggestion;
			this.showSuggestions = false;
		},
		getSuggestions() {
			const recipes = this.$store.state.recipesList;
			const ingredients = recipes.flatMap((recipe) => recipe.ingredients);
			const uniqueIngredients = [
				...new Set(ingredients.map((ingredient) => ingredient.name)),
			];
			return uniqueIngredients;
		},
		search(e) {
			setTimeout(() => {
				if (e.query.trim().length) {
					this.filteredSuggestions = [...this.getSuggestions()];
				} else {
					this.filteredSuggestions = this.getSuggestions().filter(
						(suggestion) =>
							suggestion.toLowerCase().includes(e.query.toLowerCase()),
					);
				}
			}, 200);
		},
	},
	mounted() {},
};
</script>

<style lang="scss" scoped>

</style>
