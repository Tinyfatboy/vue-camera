<template>
  <v-table is-vertical-resize style="width:100%" is-horizontal-resize :height='270' :columns="columns" :error-content="errorContent" :table-data="tableData" :title-row-height="TRHeight" :row-height="RHeight" :show-vertical-border="false" :show-horizontal-border="false">
  </v-table>
</template>

<script>
export default {
  data() {
    return {
      TRHeight: 38,
      RHeight: 58,
      errorContent: "暂无课程安排",
      tableData: [],
      columns: [
        {
          field: "class",
          title: "课程",
          width: 150,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "time",
          title: "上课时间",
          width: 150,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "teacher",
          title: "老师/教练",
          width: 150,
          titleAlign: "center",
          columnAlign: "center"
        }
      ]
    };
  },
  mounted() {}
};
</script>