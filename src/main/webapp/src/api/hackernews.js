import Keycloak from "../keycloak";

const baseUrl = process.env.VUE_APP_API_BASE_URL;

const getBestStories = () => {
  return fetch(`${baseUrl}/api/hackernews`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Keycloak.token}`
    }
  }).then(response => response.json());
};

export { getBestStories };
