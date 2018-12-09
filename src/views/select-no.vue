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
    <el-dialog title="学员信息" :visible.sync="dialogVisible" width="80%" top="420px" center>
      <div class="dialog">
        <span v-if="isFound">{{successInfo}}</span>
        <span v-if="!isFound">{{errorInfo}}</span>
        <span>正在跳转回主页面</span>
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
      successInfo: "成功获取学员信息",
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
            this.isFound = true
          } else {
            this.isFound = false
          }
          this.dialogVisible = true
          setTimeout(() => {
            this.$router.push("/signup");
          }, 3000);
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
.activeInfo{
  height: 400px;
  font-size: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.activeInfo > span:last-child{
  margin-top: 100px;
}
</style>
