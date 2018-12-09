<template>
  <div class="signup">
    <iframe :src="successUrl" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: "successInfo",
  data() {
    return {};
  },
  computed: {
    successUrl() {
      return this.$store.state.successUrl;
    }
  },
  methods: {},
  mounted() {
    let timer = setTimeout(() => {
      this.$router.push("/signup");
    }, 3000);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
iframe{
  width: 100vw;
  height: 100vh;
  vertical-align: bottom;
}
</style>
