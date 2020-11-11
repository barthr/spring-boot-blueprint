import Keycloak from "keycloak-js";

let initOptions = {
  url: process.env.VUE_APP_KEYCLOAK_URL,
  realm: "dashboard",
  clientId: "login-app",
  onLoad: "login-required"
};

export default Keycloak(initOptions);
