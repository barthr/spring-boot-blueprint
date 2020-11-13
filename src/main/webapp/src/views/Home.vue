<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>
      Logged in Keycloak User : <i>{{ profile.username || profile.email }}</i>
    </h1>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import Keycloak from "@/keycloak";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      profile: {}
    };
  },
  async created() {
    this.profile = await Keycloak.loadUserProfile();
  }
};
</script>
