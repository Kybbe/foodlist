<template>
  <div>
    <div id="login">
      <form @submit.prevent="login">
        <h2>Login</h2>
        <input type="email" placeholder="Email address..." v-model="email" />
        <input type="password" placeholder="password..." v-model="password" />
        <button type="submit">Login</button>
      </form>

      <button @click="loginWithGoogle">Sign In with Google</button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";

var store = useStore();

export default {
  name: "loginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      store
        .dispatch("login", { email: this.email, password: this.password })
        .then(() => {
          this.$router.push("/");
        });
    },
    loginWithGoogle() {
      store.dispatch("loginWithGoogle").then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  margin: 20px auto;
  padding: 10px;
  max-width: 500px;
  background-color: lightsteelblue;
  border-radius: 10px;

  * {
    box-sizing: border-box;
  }
}
input {
  display: block;
  width: 100%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  padding: 10px;
  margin-top: 10px;
}
button {
  display: block;
  margin: 20px auto;
  background-color: lightblue;
  border-radius: 5px;
  border: 1px solid black;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
</style>
