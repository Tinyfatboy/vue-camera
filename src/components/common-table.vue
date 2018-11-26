<template>
  <v-table :width="450" :columns="columns" :table-data="tableData" :title-row-height="TRHeight" :row-height="RHeight" :show-vertical-border="false" :show-horizontal-border="false"></v-table>
</template>

<script>
export default {
  data() {
    return {
      TRHeight: 38,
      RHeight: 60,
      tableData: [
        {
          class: "少儿跆拳道精英课",
          time: "14:00 - 15:00",
          teacher: "李教练",
        },
        {
          class: "少儿跆拳道精英课",
          time: "16:00 - 17:00",
          teacher: "李教练",
        },
        {
          class: "少儿跆拳道精英课",
          time: "19:00 - 20:00",
          teacher: "李教练",
        }
      ],
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
          titleAlign: "center",
          columnAlign: "center"
        }
      ]
    };
  }
};
</script>