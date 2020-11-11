<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <div>
      <ul>
        <li v-for="(story, key) in result" :key="key">
          <a :href="story.hackernewsUrl">{{ story.title }}</a> ({{
            story.score
          }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getBestStories } from "@/api/hackernews";

export default {
  name: "App",
  created() {
    getBestStories().then(stories => {
      this.result = stories.content;
    });
  },
  data() {
    return {
      result: []
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
