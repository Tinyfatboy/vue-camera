<template>
  <div class="reg">
    <div class="cam-video">
      <video id="video" width="640" height="480" autoplay></video>
    </div>
    <div class="function-area">
      <el-button type="primary" size="medium" @click="snapshot">{{ buttonText }}</el-button>
    </div>
    <div class="canvas-area">
      <canvas id="canvas" width="640" height="480"></canvas>
    </div>
    <el-dialog title="注册信息" :visible.sync="dialogVisible" width="80%" top="95px" center>
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
    height: 480
  }
};

export default {
  name: "register",
  data() {
    return {
      buttonText: "采集信息",
      featuresNo: "",
      featuresType: "",
      dialogVisible: false,
      errReg: "错误，没有学员信息",
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

        // let url = window.URL.createObjectURL(blob);
        // let link = document.createElement("a");
        // link.style.display = "none";
        // link.href = url;
        // link.setAttribute("download", Date.now() + ".jpg");

        // document.body.appendChild(link);
        // link.click();
        // window.URL.revokeObjectURL(url);

        api
          .register(formdata)
          .then(res => {
            let status = res.data.status;
            if (status === "1") {
              this.isSuccess = true;
            } else {
              this.isSuccess = false;
            }

            this.dialogVisible = true;

            setTimeout(() => {
              this.dialogVisible === true ? (this.dialogVisible = false) : {};
            }, 2000);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    let queryString = window.location.search.substr(1).split("&");
    let stringArr = {};

    queryString.map((item, index) => {
      let parts = item.split("=");
      stringArr[decodeURIComponent(parts[0])] =
        decodeURIComponent(parts[1]) || "";
    });

    console.log(queryString);

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
video {
  vertical-align: top;
}

.function-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
}

.reg {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
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
