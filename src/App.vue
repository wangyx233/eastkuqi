<!--
 * @Since: 2020-09-14 19:51:43
 * @LastAuthor: Yixuan
 * @LastTime: 2020-10-09 15:01:47
-->
<template>
  <div>
    <Preview />
    <Icp />
  </div>
</template>

<script>
import Preview from "./components/Preview.vue";
import Icp from "./components/Icp.vue";

export default {
  name: "App",
  components: {
    Preview,
    Icp,
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
}
</style>
