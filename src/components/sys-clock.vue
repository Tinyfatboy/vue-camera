<template>
  <div class="sysClock">
    <div class="wrapper">
      <div class="scale">
        <div class="unit" v-for="(item, index) in units" :key="index" :style="item"></div>
      </div>
      <div class="clock">
        <div class="secondHand" :style="secDeg"></div>
        <div class="minuteHand" :style="minDeg"></div>
        <div class="hourHand" :style="houDeg"></div>
        <div class="center"></div>
      </div>
    </div>
    <div class="timeDisplay">
      <div class="dateDisplay">
        {{ current }}
      </div>
      <div class="weekDisplay">
        {{ weekday }}
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/common/api.js";

const weekTable = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日"
];

export default {
  name: "sysClock",
  data() {
    return {
      units: [],
      Date: {
        year: "",
        month: "",
        date: "",
        day: ""
      },
      weekday: "",
      current: "",
      Time: {
        hour: "",
        minute: "",
        second: ""
      },
      secDeg: {
        transform: "",
        transition: "all 0.5s"
      },
      minDeg: {
        transform: ""
      },
      houDeg: {
        transform: ""
      }
    };
  },
  methods: {
    getTime() {
      this.Time = api.getTime();
    },
    getDate() {
      this.Date = api.getDate();

      let index = this.Date.day;
      this.weekday = weekTable[index - 1];
      this.current =
        this.Date.year + "年" + this.Date.month + "月" + this.Date.date + "日";
    }
  },
  watch: {
    Time: {
      handler(val) {
        let { hour, minute, second } = val;
        let secondDeg = second / 60 * 360 - 90;
        let minuteDeg = minute / 60 * 360 + secondDeg / 360 * 6 - 90;
        let hourDeg = hour / 12 * 360 + minuteDeg / 60 * 6 - 90;

        if (secondDeg === -90) {
          this.secDeg.transition = "all 0s";
        } else {
          this.secDeg.transition = "all 0.5s";
        }

        this.secDeg.transform = "rotate(" + secondDeg + "deg)";
        this.minDeg.transform = "rotate(" + minuteDeg + "deg)";
        this.houDeg.transform = "rotate(" + hourDeg + "deg)";
      },
      deep: true
    }
  },
  mounted() {
    for (let i = 0; i <= 59; i++) {
      let deg = i * 6 + 90;
      this.units.push({
        transform: "rotate(" + deg + "deg)"
      });
    }

    this.getTime();
    this.getDate();

    setInterval(() => {
      this.getTime();
    }, 1000);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sysClock {
  width: 250px;
}
.wrapper {
  border-radius: 50%;
  width: 250px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #838383;
  position: relative;
  margin-bottom: 10px;
}

.scale {
  position: absolute;
  width: 246px;
  height: 246px;
  top: 0px;
  left: 0px;
}

.unit {
  width: 123px;
  height: 3px;
  border-top: 0px solid transparent;
  border-right: 0px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 8px solid #838383;
  background-color: transparent;
  position: absolute;
  top: 50%;
  margin-top: -1.5px;
  margin-left: 3px;
  transform-origin: 120px 50%;
}

.clock {
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 50%;
}

.clock > div {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: 20px 50%;
}

.clock > .secondHand {
  height: 3px;
  margin-top: -2.5px;
  margin-left: -20px;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  border-left: 120px solid red;
  z-index: 3;
}

.clock > .minuteHand {
  height: 3px;
  margin-top: -2.5px;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  border-left: 120px solid #333333;
  margin-left: -20px;
  z-index: 2;
}

.clock > .hourHand {
  height: 5px;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
  border-left: 100px solid #333333;
  margin-top: -3.5px;
  margin-left: -20px;
  background-color: transparent;
}

.clock > .center {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
  display: inline-block;
  margin-left: -5px;
  margin-top: -5px;
  z-index: 3;
}

.timeDisplay > div {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 28px;
  line-height: 36px;
}
</style>
