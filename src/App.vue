<template>
    <recipe-list></recipe-list>
</template>

<script>
import recipeList from './views/recipe-list.vue'
export default {
    name: 'App',
    components: {
        recipeList,
    },
}
</script>

<style lang="scss">
html {
    min-height: 100vh;
}

body {
    background-color: #f5f5f5;

    min-height: 100vh;
    width: 100%;
    margin: 0px;
}
</style>