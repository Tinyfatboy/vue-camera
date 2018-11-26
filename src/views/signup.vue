<template>
  <div class="signup">
    <section class="info">
      <sys-clock></sys-clock>
      <div class="table">
        <div class="tableTitle">{{ classTitle }}</div>
        <common-table></common-table>
      </div>
    </section>
    <section class="introduction">
      <div class="banner">{{ banner }}</div>
      <div class="description">
        <p>{{intro}}</p>
        <p>{{intro}}</p>
        <p>{{intro}}</p>
      </div>
      <div class="slide">
        <img v-for="(item, index) in img" :key="index" :src="item.url" alt="">
      </div>
    </section>
  </div>
</template>

<script>
import api from "../common/api.js";
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
      intro: `Lorem ipsum dolor sit amet consectetur adipiscing elit. Aenean euismod bibendum laoreet.
              Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar
              sic tempor. Socis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci. sed rhoncus pronin
              sapien nunc accuan eget.`,
      img: [
        { url: "https://via.placeholder.com/230" },
        { url: "https://via.placeholder.com/230" },
        { url: "https://via.placeholder.com/230" }
      ],
      classTitle: "课程表"
    };
  },
  methods: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info {
  height: 472px;
  width: 724px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.table {
  width: 450px;
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

.tableTitle{
  margin-bottom: 0px;
}

.description > p {
  font-size: 18px;
  line-height: 23px;
}

.description > p:last-child {
  margin-bottom: 20px;
}

.slide {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
