<template>
  <div class="header">
    <router-link :to="'/'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        id="Capa_1"
        x="0px"
        y="0px"
        viewBox="0 0 27.02 27.02"
        style="enable-background: new 0 0 27.02 27.02; width: 27px"
        xml:space="preserve"
      >
        <g>
          <path
            style="fill: #030104"
            d="M3.674,24.876c0,0-0.024,0.604,0.566,0.604c0.734,0,6.811-0.008,6.811-0.008l0.01-5.581   c0,0-0.096-0.92,0.797-0.92h2.826c1.056,0,0.991,0.92,0.991,0.92l-0.012,5.563c0,0,5.762,0,6.667,0   c0.749,0,0.715-0.752,0.715-0.752V14.413l-9.396-8.358l-9.975,8.358C3.674,14.413,3.674,24.876,3.674,24.876z"
          />
          <path
            style="fill: #030104"
            d="M0,13.635c0,0,0.847,1.561,2.694,0l11.038-9.338l10.349,9.28c2.138,1.542,2.939,0,2.939,0   L13.732,1.54L0,13.635z"
          />
          <polygon
            style="fill: #030104"
            points="23.83,4.275 21.168,4.275 21.179,7.503 23.83,9.752  "
          />
        </g>
      </svg>
    </router-link>
    <router-link :to="'/add'"> Add Recipe </router-link>
    <router-link :to="'/login'" v-if="!loggedIn"> Login </router-link>
    <router-link :to="'/register'" v-if="!loggedIn"> Register </router-link>
    <a v-if="this.link" :href="link" target="_blank">Original Recipe</a>
    <button @click="logout" v-if="loggedIn">logout</button>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "Navbar",
  props: {
    link: {
      type: String,
    },
  },
  data() {
    return {
      loggedIn: false,
      email: "",
      password: "",
    };
  },
  methods: {
    IsLoggedIn() {
      let user = firebase.auth().currentUser;

      if (user) {
        this.loggedIn = true; // If it exists
      } else {
        this.loggedIn = false; // If it doesn't
      }
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Successfully logged out");
          this.loggedIn = false;
          this.$router.push("/");
        })
        .catch((error) => {
          alert(error.message);
          this.$router.push("/");
        });
    },
  },
  mounted() {
    setTimeout(() => {
      this.IsLoggedIn();
    }, 10);
  },
};
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 50px;
  display: flex;
  overflow: hidden;
  justify-content: space-evenly;
  border-bottom: 1px solid grey;
  box-shadow: 2px 2px 4px grey;
  background-color: var(--card-color);
  align-items: center;
  margin-bottom: 0px;
}

a {
  padding: 5px 10px;
  border-radius: 15px;
  background-color: #4a8ee7;
  color: white;
  text-decoration: none;
  flex-shrink: 0;

  p {
    margin: 0;
  }
}

a:hover {
  text-decoration: underline;
}

svg * {
  fill: white !important;
}
</style>
