<template>
  <div>
    <!-- 容器 -->
    <div id="box"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import * as echarts from "echarts";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  watch: {
    list: {
      handler() {
        var myChart = echarts.init(document.getElementById("box"));
        var option = {
          title: {
            text: "商品分类",
          },
          tooltip: {},
          legend: {
            data: ["数量"],
          },
          xAxis: {
            data: this.list.map((item) => item.catename),
          },
          yAxis: {},
          series: [
            {
              name: "数量",
              // bar 柱状图  line 折线图
              type: "bar",
              data: this.list.map((item) => item.children.length),
            },
          ],
        };
        myChart.setOption(option);
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      reqChangeList: "cate/reqChangeList",
    }),
  },
  mounted() {
    // 页面一进来请求数据
    this.reqChangeList();
  },
};
</script>
<style scoped>
#box {
  width: 80%;
  height: 400px;
  border: 1px solid red;
}
</style>
