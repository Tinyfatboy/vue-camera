<template>
  <div id="app">
    <header v-if="isShow">
      <img class="logo" :src="logo" alt="" @click="showFullscreen">
    </header>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
    <footer v-if="isShow"></footer>
  </div>
</template>

<script>
import api from "@/common/api.js";

export default {
  data() {
    return {
      logo: "",
      isShow: true
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
      if (path === "/register" || path === "/successInfo") {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    }
  },
  mounted() {
    let path = this.$route.path;
    if (path === "/register" || path === "/successInfo") {
      this.isShow = false;
    } else {
      this.isShow = true;
      api
        .getInfo()
        .then(res => {
          let { logo, des, classSchedule } = res.data.data;

          this.logo = logo;
          this.$store.commit("login", des);
          this.$store.commit("class", classSchedule);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  height: 100%;
}

header,
footer {
  height: 102px;
  background: #666666;
}

header {
  position: relative;
}

footer {
  position: absolute;
  width: 100%;
  bottom: 0;
}

.logo {
  height: 72px;
  background: #f2f2f2;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
}
</style>
