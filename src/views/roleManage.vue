<template>
  <div>
    <div id="main" style="width: 50%;height:400px;"></div>
    <el-radio-group v-model="radio4" size="medium" @change="changehandel">
      <el-radio-button v-for="(item,index) in changeList" :key="index" :label="item"></el-radio-button>
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
      radio4: "all"
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

      //折线图点击事件-start
      function triggerAction(action, selected) {
        legend = [];

        for (let name in selected) {
          if (selected.hasOwnProperty(name)) {
            legend.push({ name: name });
          }
        }

        myChart.dispatchAction({
          type: action,
          batch: legend
        });
      }

      function click({name: legend, selected}) {
        let isBegin = true;
        //判断是否是第一次点击
        //name = legend时, 当是true时,不是第一次
        //name!=legend, 有false,不是第一次
        for (let name in selected) {
            if (selected.hasOwnProperty(name)) {
                if (name === legend) {
                    if (selected[name] === true) {
                        isBegin = false;
                    }
                } else {
                    if (selected[name] === false) {
                        isBegin = false;
                    }
                }
            }
        }
        //是第一次的时候, name = legend时,选中;其他不选中
        //不是第一次,当selectd[legend] = true;说明他之前是false,不选中状态. 点击它是要选中它,所以name = legend时,选中;其他不选中;
        //............................= false;说明他之前是true,选中状态. 点击它是要选中全部,所以全部选中.
        if (isBegin) {
            for (let name in selected) {
                if (selected.hasOwnProperty(name)) {
                    if (name === legend) {
                        myChart.dispatchAction({type: 'legendSelect', name});
                    } else {
                        myChart.dispatchAction({type: 'legendUnSelect', name});
                    }
                }
            }
        } else {
            if (isBegin || (!isBegin && selected[legend])) {
                for (let name in selected) {
                    if (selected.hasOwnProperty(name)) {
                        if (name === legend) {
                            myChart.dispatchAction({type: 'legendSelect', legend});
                        } else {
                            myChart.dispatchAction({type: 'legendUnSelect', name});
                        }
                    }
                }
            } else {
                for (let name in selected) {
                    if (selected.hasOwnProperty(name)) {
                        myChart.dispatchAction({type: 'legendSelect', name});
                    }
                }
            }
        }
    }
    // myChart.off("legendselectchanged");
    myChart.on("legendselectchanged", click);

      myChart.clear(); //清空ECharts
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
    this.changehandel(this.radio4);
  }
};
</script>

<style>
</style>
