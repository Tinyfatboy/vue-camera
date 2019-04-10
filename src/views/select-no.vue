<template>
  <div class="content activate">
    <div class="inputActivate">
      <div class="people">
      </div>
      <input type="number" pattern="[0-9]*" v-model="featuresNo" placeholder="请输入您的手机号或者学号">
    </div>
    <div class="redSignIn" @click="submit">
      <span>签到</span>
    </div>
    <el-dialog title="学员信息" :visible.sync="dialogVisible" width="80%" :top="dialogTop" center>
      <div class="dialog">
        <span v-if="isFound">已成功获取学员信息</span>
        <span v-if="!isFound">{{errorInfo}}</span>
        <span>正在跳转回主页面...</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "../common/api.js";

export default {
  name: "selectNo",
  data() {
    return {
      featuresNo: "",
      dialogVisible: false,
      isFound: false,
      errorInfo: "暂无匹配学员信息"
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
            this.isFound = true;
          } else {
            this.isFound = false;
            this.errorInfo = "暂无匹配学员信息";
          }
          this.dialogVisible = true;
          setTimeout(() => {
            this.$router.push("/signup");
          }, 3000);
        })
        .catch(err => {
          this.isFound = false;
          this.errorInfo = "后端接口错误，请检查";
          this.dialogVisible = true;
          setTimeout(() => {
            this.$router.push("/signup");
          }, 3000);
          console.log(err);
        });
    }
  },
  computed: {
    dialogTop() {
      const height = window.innerHeight;
      return `${height * 0.3}px`;
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
