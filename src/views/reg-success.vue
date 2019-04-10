<template>
    <div class="reg-sucess">
    </div>
</template>

<script>
import api from "../common/api.js";

export default {
  name: "regSuccess",
  data() {
    return {};
  },
  methods: {},
  mounted() {
    let hash = window.location.hash.split("?")[1];
    let queryString = [];

    hash = hash ? hash.split("&") : [];

    hash.map((item, index) => {
      let parts = item.split("=")[1];
      queryString.push(parts);
    });

    if (queryString.length !== 0) {
      const [featureNo, featureType] = queryString;
      api
        .regSucess(featureNo, featureType)
        .then(res => {
          console.log("success");
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
