<template>
  <div class="content home">
    <div class="timImg">
      <div class="clock">
        <div class="minuteHand" :style="minDeg"></div>
        <div class="hourHand" :style="hourDeg"></div>
      </div>
      <!-- <img :src="img[0].url" width="100%" alt=""> -->
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
      <div class="table-wrapper">
        <div class="table-head">
          <table class="contenBK">
            <thead>
              <tr>
                <th style="width: 15rem;">课程名称</th>
                <th style="width: 13rem;">上课时间</th>
                <th style="width: 11rem;">老师/教练</th>
              </tr>
            </thead>
          </table>
        </div>
        <div v-if="noClass" class="no-class">
          <span>暂无课程安排</span>
        </div>
        <div v-if="!noClass" class="table-body">
          <table class="contenBK">
            <tbody>
              <tr v-for="(item, index) in tableData" :key="index">
                <td style="width: 15rem;">{{ item.className }}</td>
                <td style="width: 13rem;">{{ item.classTime }}</td>
                <td style="width: 11rem;">{{ item.teacher }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
      <canvas id="canvas" width="720" height="720"></canvas>
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
      tableData: [],
      dialogVisible: false,
      signInfo: "签到成功，正在跳转...",
      errorInfo1: "暂无数据",
      errorInfo2: "请使用手动签到功能",
      isSign: false,
      noClass: true,
      timer: null,
      clockTimer: null,
      clock: {
        hour: "",
        minute: "",
        second: ""
      },
      minDeg: {
        transform: ""
      },
      hourDeg: {
        transform: ""
      }
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
  watch: {
    tableData: {
      handler(val) {
        if (val.length === 0) {
          this.noClass = true;
        } else {
          this.noClass = false;
        }
      },
      deep: true
    },
    clock: {
      handler(val) {
        let { hour, minute, second } = val;
        let secondDeg = second / 60 * 360;
        let minuteDeg = minute / 60 * 360 + secondDeg / 360 * 6;
        let hourDeg = hour / 12 * 360 + minuteDeg / 60 * 6;

        this.minDeg.transform = `rotate(${minuteDeg}deg)`;
        this.hourDeg.transform = `rotate(${hourDeg}deg)`;
      },
      deep: true
    }
  },
  methods: {
    goToSelect() {
      this.$router.push("/selectNo");
    },
    getTime() {
      this.clock = api.getTime();
    },
    doSign() {
      console.log("begin");
      clearTimeout(this.timer);

      let video = document.getElementById("video");
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");
      ctx.drawImage(video, 280, 0, 720, 720, 0, 0, 720, 720);
      video.pause();

      let image = canvas.toDataURL("image/jpg");
      let blob = api.base64toImage(image);

      let formdata = new FormData();

      formdata.append("imagefile", blob, Date.now() + ".jpg");

      api
        .recognition(formdata)
        .then(res => {
          let status = res.data.status;
          let message = res.data.message;

          if (status === "1") {
            let { successUrl } = res.data.data[0];
            this.isSign = true;
            this.dialogVisible = true;

            this.$store.commit("successLogin", successUrl);
            setTimeout(() => {
              this.$router.push("/successInfo");
            }, 2000);
          } else {
            if (status === "0" && message.indexOf("not match") > -1) {
              this.isSign = false;
              this.dialogVisible = true;

              setTimeout(() => {
                this.dialogVisible === true ? (this.dialogVisible = false) : {};
              }, 2000);
            } else {
              console.log("下一轮");
            }
            video.play();
            this.timer = setTimeout(() => {
              this.doSign();
            }, 6000);
          }
          console.log("resolve");
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

    api
      .getInfo()
      .then(res => {
        let { classSchedule } = res.data.data;

        classSchedule.map((item, index) => {
          let time =
            item.startTime.slice(0, -3) + " - " + item.endTime.slice(0, -3);

          let unit = {
            className: item.name,
            teacher: item.teacherNames,
            classTime: time
          };

          this.tableData.push(unit);
        });

        console.log(this.tableData);
      })
      .catch(err => {
        console.log(err);
      });

    this.timer = setTimeout(() => {
      this.doSign();
    }, 6000);
    this.clockTimer = setInterval(() => {
      this.getTime()
    }, 1000);
  },
  beforeDestroy() {
    clearTimeout(this.timer);
    clearInterval(this.clockTimer)
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
