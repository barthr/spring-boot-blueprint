import router from "./router";
import store from "./store";
import { createApp } from "vue";
import App from "./App";
import Keycloak from "./keycloak";

const app = createApp(App)
  .use(store)
  .use(router);

Keycloak.init({ onLoad: "login-required" })
  .then(auth => {
    if (!auth) {
      window.location.reload();
    } else {
      app.mount("#app");
    }
    //Token Refresh
    setInterval(() => {
      Keycloak.updateToken(70).catch(() => {
        console.error("Failed to refresh token");
      });
    }, 6000);
  })
  .catch(() => {
    console.error("Authenticated Failed");
  });
