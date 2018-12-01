<template>
  <div class="reg">
    <div class="cam-video">
      <h1>{{ msg1 }}</h1>
      <video id="video" width="640" height="360" autoplay></video>
    </div>
    <div class="function-area">
      <form>
        <label for="featuresNo">featuresNo</label>
        <input type="number" pattern="[0-9]*" name="featureNumber" :placeholder="placeholder1" v-model="featuresNo">
        <br>
        <label for="featuresType">featuresType</label>
        <input type="number" pattern="[0-9]*" name="featuresType" :placeholder="placeholder2" v-model="featuresType">
      </form>
      <div class="tabButton" @click="snapshot">{{ buttonText }}</div>
    </div>
    <div class="canvas-area">
      <canvas id="canvas" width="640" height="360"></canvas>
    </div>
    <el-dialog title="注册信息" :visible.sync="dialogVisible" width="80%" top="400px" center>
      <div v-if="isRegErr" class="regDialog">
        {{ errReg }}
      </div>
      <div v-if="!isRegErr" class="regDialog">
        <span v-if="isSuccess">{{ successReg }}</span>
        <span v-if="!isSuccess">{{ issueReg }}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "../common/api.js";
import { throws } from "assert";

const constraints = {
  video: {
    width: 640,
    height: 360
  }
};

export default {
  name: "register",
  data() {
    return {
      msg1: "请对准摄像头",
      placeholder1: "请输入您的学号",
      placeholder2: "请输入学员类型",
      buttonText: "采集信息",
      featuresNo: "",
      featuresType: "",
      dialogVisible: false,
      errReg: "请输入学员学号和学员类型",
      isRegErr: false,
      isSuccess: false,
      successReg: "学员注册成功",
      issueReg: "未检测到人脸，请重试"
    };
  },
  methods: {
    snapshot() {
      let featuresNo = this.featuresNo;
      let featuresType = this.featuresType;

      if (featuresNo === "" || featuresType === "") {
        this.isRegErr = true;
        this.dialogVisible = true;

        setTimeout(() => {
          this.dialogVisible === true ? (this.dialogVisible = false) : {};
        }, 2000);

        return;
      } else {
        this.isRegErr = false;

        let video = document.getElementById("video");
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0);

        let image = canvas.toDataURL("image/jpg");

        let blob = api.base64toImage(image);
        let formdata = new FormData();

        formdata.append("imagefile", blob, Date.now() + ".jpg");
        formdata.append("featuresNo", featuresNo);
        formdata.append("featuresType", featuresType);

        let url = window.URL.createObjectURL(blob);
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", Date.now() + ".jpg");

        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);

        // api
        //   .register(formdata)
        //   .then(res => {
        //     let status = res.data.status;
        //     if (status === "1") {
        //       this.isSuccess = true;
        //     } else {
        //       this.isSuccess = false;
        //     }

        //     this.dialogVisible = true;

        //     setTimeout(() => {
        //       this.dialogVisible === true ? (this.dialogVisible = false) : {};
        //     }, 2000);
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
      }
    }
  },
  mounted() {
    // let queryString = window.location.search.substr(1).split("&");
    // let stringArr = [];

    // queryString.map((item, index) => {
    //   let query = item.split("=")[1];
    //   stringArr.push(query);
    // });

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(mediaStream => {
        let video = document.querySelector("video");
        video.srcObject = mediaStream;
        video.onloadedmetadata = () => {
          video.play();
        };
      })
      .catch(err => {
        console.log(err.name + ": " + err.message);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  text-align: center;
}

video {
  border: 1px solid #666666;
}

.cam-video {
  margin-bottom: 30px;
}

.function-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

label {
  width: 150px;
  font-size: 24px;
  display: inline-block;
}

input {
  border: 2px solid #cacaca;
  outline: none;
  text-align: center;
  height: 52px;
  width: 300px;
  font-size: 24px;
  border-radius: 10px;
  margin-bottom: 20px;
}

input[name="featureNumber"] {
  margin-bottom: 30px;
}

.reg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.regDialog {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 600;
  height: 300px;
}

.canvas-area {
  display: none;
}
</style>
