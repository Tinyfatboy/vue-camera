<template>
  <div class="reg">
    <div class="cam-video">
      <h1>{{ msg1 }}</h1>
      <video id="video" width="640" height="360" autoplay></video>
    </div>
    <div class="function-area">
      <form>
        <label for="featureNo">featureNo</label>
        <input type="number" pattern="[0-9]*" name="featureNumber" :placeholder="placeholder1" v-model="featureNo">
        <br>
        <label for="featureType">featureType</label>
        <input type="number" pattern="[0-9]*" name="featureType" :placeholder="placeholder2" v-model="featureType">
      </form>
      <div class="tabButton" @click="snapshot">{{ buttonText }}</div>
    </div>
    <div class="canvas-area">
      <canvas id="canvas" width="1280" height="720"></canvas>
    </div>
  </div>
</template>

<script>
import api from "../common/api.js";

const constraints = {
  video: {
    width: 1280,
    height: 720
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
      featureNo: "",
      featureType: ""
    };
  },
  methods: {
    snapshot() {
      let video = document.getElementById("video");
      let canvas = document.getElementById("canvas");

      let ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);

      let image = canvas.toDataURL("image/jpg");

      let blob = api.base64toImage(image);
      let formdata = new FormData();

      formdata.append("imagefile", blob, Date.now() + ".jpg");

      // api
      //   .register(formdata)
      //   .then(response => {
      //     console.log(response);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    }
  },
  mounted() {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function(mediaStream) {
        let video = document.querySelector("video");
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
          video.play();
        };
      })
      .catch(function(err) {
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
  margin-bottom: 50px;
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
  margin-bottom: 30px;
}

input[name="featureNumber"] {
  margin-bottom: 30px;
}

form {
  margin-bottom: 50px;
}

.reg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.canvas-area {
  display: none;
}
</style>
