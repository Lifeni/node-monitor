<template>
  <a-col style="flex: 1">
    <a-card class="card" bodyStyle="padding: 1.25rem 1.5rem 1.5rem;">
      <template #title>
        <a-typography-text type="secondary" class="title">
          负载
        </a-typography-text>
      </template>
      <a-row :wrap="false" :gutter="12" style="margin: 0">
        <a-statistic
          title="CPU 负载"
          :value="`${props.data[data.length - 1].load.toFixed(2)}%`"
        />
        <a-col :flex="1"></a-col>
        <a-row class="row" :gutter="6">
          <a-col v-for="(d, i) in cpu" :span="6">
            <tiny-area-chart v-bind="cpuConfig(d, i)" />
          </a-col>
        </a-row>
      </a-row>
      <area-chart class="chart" v-bind="loadConfig" />
    </a-card>
  </a-col>
</template>

<script setup lang="ts">
import {
  AreaChart,
  AreaChartProps,
  TinyAreaChart,
  TinyAreaChartProps,
} from '@opd/g2plot-vue'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import { computed } from 'vue'

dayjs.extend(calendar)

const props = defineProps<{
  data: ISystemLoadResponse[]
}>()

const calendarFomatter = {
  sameDay: '[今天] HH:mm:ss',
  nextDay: '[明天] HH:mm:ss',
  nextWeek: 'MM-DD HH:mm:ss',
  lastDay: '[昨天] HH:mm:ss',
  lastWeek: 'MM-DD HH:mm:ss',
  sameElse: 'MM-DD HH:mm:ss',
}

const load = computed(() => {
  return props.data.map(d => {
    return {
      time: dayjs(d.time).calendar(null, calendarFomatter),
      load: Number(d.load.toFixed(2)),
    }
  })
})

const fontSans = document.documentElement.style.getPropertyValue('--font-sans')
const tooltipStyle = {
  fontFamily: fontSans,
  fontSize: '0.875rem',
  lineHeight: '1',
}

const loadConfig: AreaChartProps = {
  height: 120,
  appendPadding: 4,
  data: load.value,
  xField: 'time',
  yField: 'load',
  smooth: true,
  xAxis: false,
  yAxis: false,
  legend: false,
  areaStyle: {
    fill: '#1890ff',
  },
  tooltip: {
    formatter: datum => {
      return { name: '负载', value: datum.load + '%' }
    },
    domStyles: {
      'g2-tooltip': {
        ...tooltipStyle,
        padding: '0.5rem 1.25rem',
        boxShadow: `0 0.25rem 0.5rem -0.5rem rgb(0 0 0 / 6%),
                    0 0.5rem 1rem 0 rgb(0 0 0 / 5%),
                    0 0.75rem 2rem 0.5rem rgb(0 0 0 / 4%)`,
      },
      'g2-tooltip-title': {
        ...tooltipStyle,
        padding: '0 0 0.5rem 0',
        fontSize: '1rem',
      },
      'g2-tooltip-list': tooltipStyle,
      'g2-tooltip-list-item': tooltipStyle,
      'g2-tooltip-marker': tooltipStyle,
      'g2-tooltip-value': tooltipStyle,
      'g2-tooltip-name': tooltipStyle,
    },
  },
  meta: {
    value: {
      range: [0, 100],
    },
    time: {
      range: [0, 1],
    },
  },
}

const cpu = computed(() => {
  const t: number[][] = []
  props.data.map((d, i) => {
    d.cpu.map((c, j) => {
      if (Array.isArray(t[j])) t[j][i] = Number(c.toFixed(2))
      else t[j] = []
    })
  })
  return t
})

const cpuConfig = (data: number[], index: number): TinyAreaChartProps => ({
  width: 120,
  height: 40,
  appendPadding: 4,
  autoFit: false,
  data: data,
  tooltip: {
    domStyles: {
      'g2-tooltip': {
        ...tooltipStyle,
        padding: '0.5rem',
        boxShadow: `0 0.25rem 0.5rem -0.5rem rgb(0 0 0 / 6%),
                    0 0.5rem 1rem 0 rgb(0 0 0 / 5%),
                    0 0.75rem 2rem 0.5rem rgb(0 0 0 / 4%)`,
      },
    },
  },
  annotations: [
    {
      type: 'text',
      position: ['75%', '5%'],
      content: `CPU${index}`,
      style: { fontFamily: fontSans, fontWeight: 600 },
    },
  ],
})
</script>

<style scoped>
.card {
  border-radius: 0.5rem;
}

.chart {
  margin: 1rem -1.75rem -1.75rem;
}

.title {
  font-size: 0.875rem;
}

.row {
  width: fit-content;
  max-width: 60%;
}
</style>
