<template>
  <div class="signup">
    <section class="info">
      <sys-clock></sys-clock>
      <div class="table">
        <div class="tableTitle">{{ classTitle }}</div>
        <common-table></common-table>
        <div class="tabButton signButton" @click="goToSelect">{{ buttonText }}</div>
      </div>
    </section>
    <section class="introduction">
      <div class="banner">{{ banner }}</div>
      <div class="description">
        <p v-for="(item, index) in intro" :key="index">
          {{ item }}
          <br v-if="item === ''">
        </p>
      </div>
      <!-- <div class="slide">
        <img v-for="(item, index) in img" :key="index" :src="item.url" alt="">
      </div> -->
    </section>
    <div class="function">
      <div class="camArea">
        <video id="video" width="640" height="360" autoplay></video>
      </div>
      <div class="canvasArea">
        <canvas id="canvas" width="1280" height="720"></canvas>
      </div>
    </div>
    <el-dialog title="签到信息" :visible.sync="dialogVisible" width="80%" top="280px" center>
      <div v-if="isSign" class="signDialog">
        <span>{{ signInfo }}</span>
        <span>签到的号码为{{ number }} 类型为{{ type }}</span>
      </div>
      <div v-if="!isSign" class="signDialog">
        <span>{{ errorInfo1 }}</span>
        <span>{{ errorInfo2 }}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "../common/api.js";
import sysClock from "@/components/sys-clock.vue";
import commonTable from "@/components/common-table.vue";

const constraints = {
  video: {
    width: 1280,
    height: 720
  }
};

export default {
  name: "signup",
  components: {
    sysClock,
    commonTable
  },
  data() {
    return {
      banner: "机构介绍",
      buttonText: "手动签到",
      img: [
        { url: "https://via.placeholder.com/230" },
        { url: "https://via.placeholder.com/230" },
        { url: "https://via.placeholder.com/230" }
      ],
      classTitle: "课程表",
      dialogVisible: true,
      signInfo: "签到成功",
      errorInfo1: "暂无数据",
      errorInfo2: "请使用手动签到功能",
      isSign: false,
      number: "",
      type: ""
    };
  },
  computed: {
    intro() {
      return this.$store.getters.desc.slice(0, 22);
    }
  },
  methods: {
    goToSelect() {
      this.$router.push("/selectNo");
    },
    startSign() {
      let video = document.getElementById("video");
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);

      let image = canvas.toDataURL("image/jpg");

      let blob = api.base64toImage(image);
      let formdata = new FormData();

      formdata.append("imagefile", blob, Date.now() + ".jpg");

      // let url = window.URL.createObjectURL(blob);
      // let link = document.createElement("a");
      // link.style.display = "none";
      // link.href = url;
      // link.setAttribute("download", Date.now() + ".jpg");

      // document.body.appendChild(link);
      // link.click();
      // window.URL.revokeObjectURL(url);

      api
        .recognition(formdata)
        .then(res => {
          // let status = res.data.status;
          // let message = res.data.message;
          // if (status === "1") {
          //   this.isSign = true;
          //   this.dialogVisible = true;
          //   setTimeout(() => {
          //     this.dialogVisible === true ? (this.dialogVisible = false) : {};
          //   }, 2000);
          // } else if (status === "0" && message.indexOf("not match") > -1) {
          //   this.isSign = false;
          //   this.dialogVisible = true;
          //   setTimeout(() => {
          //     this.dialogVisible === true ? (this.dialogVisible = false) : {};
          //   }, 2000);
          // } else {
          //   console.log("下一轮");
          // }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
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

    setTimeout(() => {
      this.startSign();
    }, 3000);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info {
  height: 442px;
  width: 724px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
}

.table {
  width: 452px;
  position: relative;
}

.signButton {
  position: absolute;
  bottom: 0px;
  right: 0px;
}

.introduction {
  width: 724px;
  margin: 0 auto;
}

.banner,
.tableTitle {
  background: #999999;
  height: 52px;
  text-align: center;
  line-height: 52px;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}

.tableTitle {
  margin-bottom: 0px;
}

.description > p {
  font-size: 24px;
  line-height: 26px;
}

.description > p:last-child {
  margin-bottom: 20px;
}

.slide {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.signDialog {
  height: 768px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 36px;
  font-weight: 600;
}

.signDialog > span:first-child {
  margin-bottom: 30px;
}

.function {
  display: none;
}

.camArea {
  width: 640px;
  margin: 0 auto;
}
</style>
