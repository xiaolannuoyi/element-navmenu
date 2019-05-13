<template>
  <div>
    <div id="main" style="width: 50%;height:400px;"></div>
     <el-radio-group v-model="radio4" size="medium" @change="changehandel">
      <el-radio-button v-for='(item,index) in changeList' :key="index" :label="item" ></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      all: {
        "log-1": [120, 132, 101, 134, 90, 230, 210],
        "log-2": [320, 332, 301, 334, 390, 330, 320],
        "log-3": [456, 346, 167, 346, 124, 953, 341],
        "data-1": [534, 2567, 45, 134, 90, 230, 210],
        "data-2": [320, 332, 301, 334, 390, 330, 320],
        "data-3": [820, 932, 901, 934, 1290, 1330, 1320]
      },
      changeList: ["log", "data", "all"],
      radio4:'log',
    };
  },
  methods: {
    line(result) {
      let myChart = echarts.init(document.getElementById("main"));
      let legend = [];
      for (let key in result) {
        legend.push(key);
      }
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "折线图堆叠"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: legend
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: []
      };
      for (let key in result) {
        option.series.push({
          name: key,
          type: "line",
          stack: "总量",
          data: result[key]
        });
      }
      myChart.clear();//清空ECharts
      myChart.setOption(option);
    },
    changehandel(val) {
      let reg = new RegExp(val);
      let data = {};
      if (val !== "all") {
        for (let key in this.all) {
          if (reg.test(key)) {
            data[key] = this.all[key];
          }
        }
      } else {
        for (let key in this.all) {
          data[key] = this.all[key];
        }
      }
      
      
      this.line(data);
    }
  },
  mounted() {
    console.log('auth mounted');
    this.changehandel(this.radio4)
  }
};
</script>

<style>
</style>
