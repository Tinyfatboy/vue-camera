<template>
  <div id="app">
    <div class="logo" v-if="isShow" @click="showFullscreen">
      <img :src="imgUrl" width="100%" height="100%" alt="">
    </div>
    <router-view/>
  </div>
</template>

<script>
import api from "@/common/api.js";

export default {
  data() {
    return {
      isShow: true,
      imgUrl: require("./assets/img/brand.png")
    };
  },
  methods: {
    showFullscreen() {
      let element = document.documentElement;
      element.webkitRequestFullscreen();
    }
  },
  watch: {
    $route(to, from) {
      let path = to.path;
      if (path === "/successInfo" || path === "/register") {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    }
  },
  mounted() {
    let path = this.$route.path;
    if (path === "/successInfo" || path === "/register") {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  }
};
</script>


<style>
#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  height: 100vh;
}
</style>
