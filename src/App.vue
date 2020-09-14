<!--
 * @Since: 2020-09-14 19:51:43
 * @LastAuthor: Yixuan
 * @LastTime: 2020-09-14 20:24:59
-->
<template>
  <Preview />
</template>

<script>
import Preview from "./components/Preview.vue";

export default {
  name: "App",
  components: {
    Preview,
  },
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
