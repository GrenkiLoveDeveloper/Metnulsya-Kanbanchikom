<template>
  <div class="chart-container relative">
    <div class="flex space-x-2 absolute top-0 left-40 z-10">
      <div
        :class="{ 'bg-blue-500 text-white rounded': tab === 'all' }"
        class="px-4 py-2 cursor-pointer flex items-center bg-gray-800 text-gray-400 rounded"
        @click="tab = 'all'"
      >
        Все
      </div>
      <div
        :class="{ 'bg-blue-500 text-white rounded': tab === 'plan' }"
        class="px-4 py-2 cursor-pointer flex items-center bg-gray-800 text-gray-400 rounded"
        @click="tab = 'plan'"
      >
        <span
          :style="{ backgroundColor: planColor }"
          class="w-1 h-1 mr-2 rounded-full inline-block"
        ></span>
        План
      </div>
      <div
        :class="{ 'bg-blue-500 text-white rounded': tab === 'fact' }"
        class="px-4 py-2 cursor-pointer flex items-center bg-gray-800 text-gray-400 rounded"
        @click="tab = 'fact'"
      >
        <span
          :style="{ backgroundColor: factColor }"
          class="w-1 h-1 mr-2 rounded-full bg-red-500 inline-block"
        ></span>
        Факт
      </div>
    </div>
    <div v-if="tab === 'all'">
      <v-chart class="chart" :option="allOption" />
    </div>
    <div v-if="tab === 'plan'">
      <v-chart class="chart" :option="planOption" />
    </div>
    <div v-if="tab === 'fact'">
      <v-chart class="chart" :option="factOption" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

provide(THEME_KEY, "dark");

const tab = ref("all");
let planColor = ref("#18A0FB");
let factColor = ref("#13D6FF");

const planData = ref([
  0, 45, 66, 75, 99, 110, 160, 180, 190, 240, 260, 270, 290, 295, 299, 315, 350,
  375, 400, 421, 430, 450, 470, 490, 510, 530, 540, 550, 570, 590, 600,
]);

const factData = ref([
  0, 15, 12, 200, 200, 200, 85, 90, 99, 115, 120, 130, 120, 100, 100, 100, 170,
  180, 190, 195, 205, 207, 201, 200, 190, 200, 260, 270, 280, 299, 310,
]);

const commonOptions = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
    backgroundColor: "rgba(0,0,0,0.9)",
    borderColor: "#333",
    borderWidth: 1,
    padding: 10,
    textStyle: {
      color: "#fff",
    },
  },
  xAxis: [
    {
      boundaryGap: false,
      min: 0,
      data: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
    },
    {
      type: "value",
      position: "top",
    },
  ],
  yAxis: [
    {
      boundaryGap: false,
      min: 0,
    },
    {
      type: "value",
      position: "right",
    },
  ],
};

const allOption = ref({
  ...commonOptions,
  backgroundColor: "#1B1B1E",
  series: [
    {
      data: planData.value,
      type: "line",
      smooth: true,
      areaStyle: {
        color: "rgba(24, 160, 251, 0.30)",
      },
      lineStyle: {
        color: planColor.value,
      },
      symbolSize: 10,
    },
    {
      data: factData.value,
      type: "line",
      smooth: true,
      areaStyle: {
        color: "rgba(189, 255, 255, 0.70)",
      },
      lineStyle: {
        color: factColor.value,
      },
      itemStyle: {
        color: factColor.value,
      },
      symbolSize: 10,
    },
  ],
});

const planOption = ref({
  ...commonOptions,
  backgroundColor: "#1B1B1E",
  series: [
    {
      data: planData.value,
      type: "line",
      smooth: true,
      stack: "x",
      areaStyle: {
        color: "rgba(24, 160, 251, 0.30)",
      },
      lineStyle: {
        color: planColor,
      },
      symbolSize: 10,
    },
  ],
});

const factOption = ref({
  ...commonOptions,
  backgroundColor: "#1B1B1E",
  series: [
    {
      data: factData.value,
      type: "line",
      smooth: true,
      stack: "x",
      areaStyle: {
        color: "rgba(189, 255, 255, 0.70)",
      },
      itemStyle: {
        color: factColor.value,
      },
      lineStyle: {
        color: factColor.value,
      },
      symbolSize: 10,
    },
  ],
});
</script>

<style scoped>
.chart-container {
  background-color: #1b1b1e;
  min-height: 100vh;
}
.chart {
  margin-top: 20px;
  height: 400px;
}
</style>
