<template>
  <div class="selectArea">
    <input type="number" pattern="[0-9]*" name="featureNumber" :placeholder="placeholder" v-model="featuresNo">
    <div class="tabButton" @click="submit">{{ buttonText }}</div>
    <el-dialog title="学员信息" :visible.sync="dialogVisible" width="80%" top="400px" center>
      <div v-if="isFound" class="displayInfo">
        {{successInfo}}
      </div>
      <div v-if="!isFound" class="displayInfo">
        {{errorInfo}}
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "selectNo",
  data() {
    return {
      featuresNo: "",
      placeholder: "请输入您的学号或手机号码",
      buttonText: "签到",
      dialogVisible: false,
      isFound: true,
      successInfo: "已成功获取学员信息",
      errorInfo: "您输入的号码无匹配学员"
    };
  },
  methods: {
    submit() {
      let submitData = {
        featuresNo: this.featuresNo
      };

      api
        .download(submitData)
        .then(res => {
          console.log(res);
          let status = res.data.status;
          if (status === "1") {
            console.log("查找成功");
          } else {
            console.log("查找失败");
          }
          this.$router.push("/signup");
        })
        .catch(err => {
          console.log(err);
        });
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
