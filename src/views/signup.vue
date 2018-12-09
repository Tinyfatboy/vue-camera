<template>
  <div class="content home">
    <!-- <div class="logo">
      <img :src="img[0].url" width="100%" height="100%" alt="">
    </div> -->
    <div class="timImg">
      <img :src="img[0].url" width="100%" alt="">
      <span>{{ date }}</span><br>
      <span>{{ weekday }}</span>
    </div>
    <div class="signIn" @click="goToSelect">
      <img :src="img[1].url" width="100%" height="100%" alt="">
    </div>
    <div class="tableBk">
      <div class="titleBk">
        <span>课程表</span>
      </div>
      <table class="contenBK">
        <tr>
          <th>课程名称</th>
          <th>上课时间</th>
          <th>老师/教练</th>
        </tr>
        <tbody>
          <tr>
            <td>少儿跆拳道精英班</td>
            <td>14：00-15：00</td>
            <td>李教练</td>
          </tr>
          <tr>
            <td>少儿跆拳道精英班</td>
            <td>14：00-15：00</td>
            <td>李教练</td>
          </tr>
          <tr>
            <td>少儿跆拳道精英班</td>
            <td>14：00-15：00</td>
            <td>李教练</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="tableBk">
      <div class="titleBk">
        <span>机构介绍</span>
      </div>
      <p class="contenBK">北京耀武搏毅堂国际搏击俱乐部成立于2004年，在短短的几年时间里，以先进的管理，优质的教学发发展成为本行业的龙头企业，在京城超大规模连锁。</p>
      <div class="flexBk">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="videoBk">
      <div class="videoBkCont">
        <video id="video" style="width:100%; height:100%; object-fit: fill" autoplay></video>
        <img :src="img[2].url" width="270px" alt="">
      </div>
    </div>
    <div class="canvasBK">
      <canvas id="canvas" width="1280" height="720"></canvas>
    </div>
    <el-dialog title="签到信息" :visible.sync="dialogVisible" width="80%" top="420px" center>
      <div v-if="isSign" class="dialog success">
        <span>{{ signInfo }}</span>
      </div>
      <div v-if="!isSign" class="dialog">
        <span>{{ errorInfo1 }}</span>
        <span>{{ errorInfo2 }}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "../common/api.js";

const weekTable = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日"
];

const constraints = {
  video: {
    width: 1280,
    height: 720
  }
};

export default {
  name: "signup",
  data() {
    return {
      img: [
        { url: require("../assets/img/timImg.png") },
        { url: require("../assets/img/signIn.png") },
        { url: require("../assets/img/photo.png") }
      ],
      dialogVisible: false,
      signInfo: "签到成功，正在跳转...",
      errorInfo1: "暂无数据",
      errorInfo2: "请使用手动签到功能",
      isSign: false,
      timer: null
    };
  },
  computed: {
    intro() {
      return this.$store.getters.desc.slice(0, 5);
    },
    date() {
      let date = api.getDate();
      return date.year + "年" + date.month + "月" + date.date + "日";
    },
    weekday() {
      let date = api.getDate();
      let index = date.day === 0 ? "7" : date.day;
      return weekTable[index - 1];
    }
  },
  methods: {
    goToSelect() {
      this.$router.push("/selectNo");
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

    api
      .getInfo()
      .then(res => {
        let { classSchedule } = res.data.data;

        console.log(classSchedule);
      })
      .catch(err => {
        console.log(err);
      });

    this.timer = setInterval(() => {
      console.log('down')
      let video = document.getElementById("video");
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);
      video.pause()

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
          let status = res.data.status;
          let message = res.data.message;
          if (status === "1") {
            clearInterval(this.timer)
            this.timer = null
            
            let { successUrl } = res.data.data[0];
            this.isSign = true;
            this.dialogVisible = true;

            this.$store.commit("successLogin", successUrl);
            setTimeout(() => {
              this.$router.push("/successInfo");
            }, 2000);
          } else if (status === "0" && message.indexOf("not match") > -1) {
            this.isSign = false;
            this.dialogVisible = true;
            video.play()

            setTimeout(() => {
              this.dialogVisible === true ? (this.dialogVisible = false) : {};
            }, 2000);
          } else {
            video.play()
            console.log("下一轮");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }, 8000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.canvasBK {
  display: none;
}

.success > span {
  margin-top: 0 !important;
}
</style>
