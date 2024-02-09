<template>
  <div>
    <div class="searchArea">
      <select name="sortBy" id="select" v-model="sortBy">
        <option value="listId">Id</option>
        <option value="alphabetically">Alphabetically</option>
      </select>
      <input
        type="text"
        v-model="searchValue"
        placeholder="Search list title"
        id="search-input"
      />
    </div>
    <transition-group class="cardList" tag="div" name="cardList">
      <div class="cardM" v-for="list in searchResult" :key="list.listId">
        <a
          @click="goToList(list)"
          class="card-body-link"
          v-if="searchResult != null || searchResult != []"
        >
          <div class="cardTitle">{{ list.title }}</div>
          <div class="cardDescription">{{ list.description }}</div>

          <div class="shoppingBasketIcon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192H32c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512H430c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32H458.4L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192H171.7L253.3 35.1zM192 304v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16zm128 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16z"
              />
            </svg>
          </div>
        </a>
      </div>

      <div
        class="cardM addCard"
        :key="addCard"
        v-if="this.$store.state.shoppingListsReady && !noResults"
      >
        <input
          type="text"
          placeholder="Title"
          v-model="newList.title"
          class="cardTitle"
        />
        <textarea
          placeholder="Description"
          v-model="newList.description"
          class="cardDescription"
        ></textarea>
        <button v-on:click="createNewList">Add</button>
      </div>

      <LoadedAndNoResult
        :recipeOrShoppingList="shoppingList"
        :noResults="noResults"
      />

      <GoToTop />
    </transition-group>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import LoadedAndNoResult from "../components/loadedAndNoResult.vue";
import GoToTop from "../components/goToTop.vue";

export default {
  name: "ShoppingLists",
  components: { LoadedAndNoResult, GoToTop },
  data() {
    return {
      lists: [],
      newList: {
        title: "",
        description: "",
        listId: Math.random().toString(36).substr(2, 9),
        items: [],
      },
      searchValue: "",
      sortBy: "listId",
    };
  },
  methods: {
    goToList(list) {
      this.$store.commit("setSelectedList", list);
      this.$router.push("/shoppingList/" + list.listId);
    },
    createNewList() {
      console.log(this.newList);
      alert("Creating new list");
      if (this.newList.title == "") {
        alert("Please enter a title");
        return;
      }
      if (this.newList.listId == "") {
        alert("Something went wrong creating the list id");
        return;
      }
      this.$store.commit("addShoppingList", this.newList);
      firebase.database().ref("shoppingLists").push(this.newList);
      alert("List added!");
      this.newList = {
        title: "",
        description: "",
        listId: Math.random().toString(36).substr(2, 9),
      };
      this.goToList(this.newList);
    },
  },
  computed: {
    searchResult() {
      var tempLists = this.$store.state.shoppingLists;
      if (this.searchValue != "" && this.searchValue) {
        tempLists = tempLists.filter((item) => {
          return item.title
            .toUpperCase()
            .includes(this.searchValue.toUpperCase());
        });
      }
      tempLists = tempLists.sort((a, b) => {
        if (this.sortBy == "alphabetically") {
          let fa = a.title.toLowerCase(),
            fb = b.title.toLowerCase();
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
          // Sort by id
        } else if (this.sortBy == "listId") {
          return a.listId - b.listId;
        }
      });
      return tempLists;
    },
    noResults() {
      if (this.searchResult == null || this.searchResult.length == 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.lists = this.$store.state.shoppingLists;
    window.scrollTo(0, localStorage.getItem("scrollLengthShoppingLists"));
  },
};
</script>

<style lang="scss" scoped>
.searchArea {
  display: flex;
  flex-direction: column;
  padding: 1em;
  width: 100%;
  align-items: center;
  gap: 0.5em;

  > * {
    max-width: 20em;
  }

  #search-input {
    padding: 0.4em;
    border-radius: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 10px rgba(128, 128, 128, 0.5);
    font-size: 1.2em;
    width: 100%;
    margin: 0px 1em;
  }

  select {
    padding: 0.4em;
    border-radius: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 10px rgba(128, 128, 128, 0.5);
    font-size: 1.2em;
    width: 100%;
    margin: 0px 1em;
  }
}

.cardList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.cardList-enter-active,
.cardList-leave-active,
.cardList-move {
  transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.cardList-enter {
  opacity: 0;
  transform: translateX(50px) scaleY(0.5);
}

.cardList-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.cardList-leave-active {
  position: absolute;
}

.cardList-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}

.cardM,
.cardS {
  background-color: white;
  margin: 1em;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(128, 128, 128, 0.5);
  transition: all 0.2s ease-in-out;
  position: relative;

  &:hover svg,
  &:focus svg {
    transition: 4s;
    transform: rotate(360deg);
  }
}

.card-body-link {
  box-sizing: border-box;
  text-decoration: none;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.addCard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;

  padding: 1em;
}

.cardM {
  width: 30em;

  .card-body-link {
    padding: 1em 1em 0 1em;
    text-align: center;
  }

  .card-body-link {
    text-decoration: none;
    color: black;

    width: 100%;
    height: 100%;
  }

  .card-text {
    margin-bottom: 3.5em;
  }

  .extras {
    margin-top: 0.5em;
    margin-bottom: 1em;
  }
}

.cardS {
  width: 13em;

  .card-body,
  .noResultCard-body {
    padding: 0.8em 0.5em 0em 0.5em;
  }

  .card-text {
    margin-bottom: 3em;
  }

  .extras {
    margin: 0.5em 0em;
  }
}

.shoppingBasketIcon {
  position: absolute;
  right: 1em;
  bottom: 1em;
  width: 2em;
  height: 2em;

  background-color: #4a8ee7;
  padding: 0.7em;
  border-radius: 50%;

  svg {
    position: relative;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    fill: white;
    transition: 4s;

    path {
      fill: white;
    }
  }
}

@media (max-width: 30em) {
  .cardS {
    width: 100%;
  }
}

@media (max-width: 650px) {
  .cardM,
  .cardS {
    margin: 0.3em;
  }
}
</style>
