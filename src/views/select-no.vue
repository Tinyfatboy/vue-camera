<template>
  <div class="selectArea">
    <input type="number" pattern="[0-9]*" name="featureNumber" :placeholder="placeholder" v-model="featureNo">
    <div class="tabButton" @click="submit">{{ buttonText }}</div>
  </div>
</template>

<script>
export default {
  name: "selectNo",
  data() {
    return {
      featureNo: "",
      placeholder: "请输入您的学号或手机号码",
      buttonText: "签到"
    };
  },
  methods: {
    submit() {
      let submitData = {
        featureNo: this.featureNo
      };

      // api
      //   .download(submitData)
      //   .then(res => {
      //     console.log(res);
          this.$router.push("/signup");
        // })
        // .catch(err => {
        //   console.log(err);
        // });
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.selectArea {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: calc(100% - 204px);
}

input {
  border: 3px solid #cacaca;
  outline: none;
  text-align: center;
  height: 110px;
  width: 680px;
  font-size: 36px;
  border-radius: 20px;
}

input::-webkit-input-placeholder {
  color: #cacaca;
}
</style>
