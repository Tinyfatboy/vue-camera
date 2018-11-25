<template>
  <div class="reg">
    <div class="cam-video">
      <h1>{{ msg1 }}</h1>
      <video id="video" width="640" height="480" autoplay></video>
    </div>
    <div class="button-area">
      <button @click="snapshot">{{ msg3 }}</button>
    </div>
    <div class="sanpshot">
      <h1>{{ msg2 }}</h1>
      <canvas id="canvas" width="640" height="480"></canvas>
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
      a: {},
      msg1: "video from camera",
      msg2: "shot by user",
      msg3: "snap-shot"
    };
  },
  methods: {
    snapshot() {
      let video = document.getElementById("video");
      let canvas = document.getElementById("canvas");

      let ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);

      let image = canvas.toDataURL("image/jpg");
      // image = image.split(",")[1];

      let blob = api.base64toImage(image);
      let url = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", Date.now() + ".jpg");

      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);

      let formdata = new FormData();
      formdata.append("imagefile", blob, Date.now() + ".jpg");
      formdata.append("uid ", "10");
      formdata.append("ugroup", "1");
      console.log(formdata);

      api
        .register(formdata)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
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
video,
canvas {
  border: 1px solid slategray;
}

button {
  padding: 8px;
  border-radius: 12px;
  background: #000;
  background-color: #428bca;
  border: 1px solid transparent;
  color: #fff;
  font-size: 16px;
  vertical-align: middle;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-area {
  width: 150px;
}
</style>
