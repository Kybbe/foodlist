<template>
  <div>
    <div id="content">
      <div
        class="bigCard card"
        style="
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
          padding: 0px;
        "
      >
        <div style="width: 100%; text-align: center">
          <h1>{{ this.currentShoppingList.title }}</h1>
          <p>{{ this.currentShoppingList.description }}</p>
          <ul>
            <li
              v-for="item in this.currentShoppingList.items"
              :key="item.itemId"
              v-bind:class="{ checked: item.checked }"
            >
              <input
                type="checkbox"
                :name="item.itemId"
                :id="item.itemId"
                v-model="item.checked"
              />
              <label :for="item.itemId"> {{ item.name }} </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="footer">
      <button id="delete" @click="confirmDelete" v-if="this.$store.state.admin">
        Delete this shoppingList
      </button>
    </div>
  </div>
</template>

<script>
/* import instruction from "../components/instructions.vue";
import ingredients from "../components/ingredients.vue"; */
import firebase from "firebase/app";
import "firebase/database";

import { useStore } from "vuex";

export default {
  name: "shoppingList",
  components: {
    /* instruction,
    ingredients, */
  },
  methods: {
    deleteShoppingList() {
      var dbKeys = [];
      var database = firebase.database().ref("shoppingLists");

      database.on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          dbKeys.push(childSnapshot.key);
        });
      });

      database.child(dbKeys[this.currentShoppingListId]).remove();
      alert("ShoppingList deleted!");

      // get id of all database entries and update their shoppingListIds
      database.on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().shoppingListId > this.currentShoppingListId) {
            database.child(childSnapshot.key).update({
              shoppingListId: childSnapshot.val().shoppingListId - 1,
            });
          }
        });
      });

      if (dbKeys.length == 1) {
        //should still be 1 even if database has 0 entries after deletion
        let templateShoppingList = {
          title: "Add a shoppingList",
          description:
            "Since this database shouldn't be empty, you should add a shoppingList!",
          shoppingListId: "0",
          ingredients: [
            {
              amount: "2",
              unit: "Large",
              name: "OOF's",
            },
          ],
          instructions: [
            {
              checked: false,
              id: "0",
              text: "Add a shoppingList",
            },
          ],
          servings: "4",
          link: "foodlist-0921.web.app/#/add",
          imgLink: "",
        };
        database.push(templateShoppingList);
      }

      this.$router.push("/shoppingLists");
    },
    confirmDelete() {
      if (
        confirm(
          "Are you sure you want to delete this shoppingList? \r\nThis action cannot be undone."
        )
      ) {
        this.deleteShoppingList();
      }
    },
  },
  computed: {
    currentShoppingListId() {
      return this.$route.params.id;
    },
    currentShoppingList() {
      return this.$store.state.shoppingLists.find(
        (list) => list.listId == this.currentShoppingListId
      );
    },
    store() {
      return useStore();
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  margin: 0;
}

#content {
  display: flex;
  flex-wrap: wrap;

  max-width: 75em;
  margin: 0 auto;
}

.card {
  padding: 10px;
  width: 100%;
  margin: 7px auto 7px auto;
}

.mediumCard {
  background-color: rgba(0, 0, 0, 0.01);
}

#footer {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0px;
  text-align: center;
  margin-bottom: 30px;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-evenly;
  }
}

#ogLink,
#delete,
#edit {
  text-decoration: none;
  color: white;
  background-color: #4a8ee7;
  padding: 5px 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(128, 128, 128, 0.5);
  border: none;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.2s ease-in;
  margin: 0px 20px 10px 20px;

  &:hover {
    background-color: #386baf;
    box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.4);
  }

  @media (min-width: 600px) {
    margin: 0px !important;
  }
}

#delete {
  background-color: orange;
  &:hover {
    background-color: red;
  }
}

@media (min-width: 800px) {
  #content {
    padding: 10px;
  }

  .card {
    border-radius: 10px;
    background-color: white;
    border: solid rgb(192, 192, 192) 1px;
    height: 100%;
  }

  .bigCard {
    width: 100%;
  }

  .mediumCard {
    width: calc(50% - 32px);
    margin: 7px 0px;
  }

  .mediumCard:nth-child(2n) {
    margin-right: 20px;
  }

  .smallCard {
    width: 32%;
  }
}
</style>
