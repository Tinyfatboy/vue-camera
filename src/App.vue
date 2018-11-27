<template>
  <div id="app">
    <header>
      <div class="logo" @click="showFullscreen">{{ logo }}</div>
    </header>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
    <footer></footer>
  </div>
</template>

<script>
import signup from "@/views/signup.vue";

export default {
  components: {
    signup
  },
  data() {
    return {
      logo: "培训机构logo"
    };
  },
  methods: {
    showFullscreen() {
      let element = document.documentElement;
      element.webkitRequestFullscreen();
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
  display: inline-block;
  width: 158px;
  height: 72px;
  background: #f2f2f2;
  font-size: 18px;
  text-align: center;
  line-height: 72px;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
}
</style>
