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
    <el-dialog title="签到信息" :visible.sync="dialogVisible" width="80%" top="299px" center>
      <div class="signDialog">
        {{ signInfo }}
      </div>
    </el-dialog>
  </div>
</template>

<script>
import sysClock from "@/components/sys-clock.vue";
import commonTable from "@/components/common-table.vue";

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
      dialogVisible: false,
      signInfo: "签到成功"
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
    signIn() {}
  },
  mounted() {
    setTimeout(() => {
      this.dialogVisible = true;
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
  justify-content: center;
  font-size: 36px;
  font-weight: 600;
}
</style>
