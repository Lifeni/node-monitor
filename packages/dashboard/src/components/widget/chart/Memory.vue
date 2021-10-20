<template>
  <a-col style="flex: 1">
    <a-card class="card" bodyStyle="padding: 1.25rem 1.5rem 1.5rem;">
      <template #title>
        <a-typography-text type="secondary" class="title">
          内存
        </a-typography-text>
      </template>
      <a-space :size="28" style="flex-wrap: wrap">
        <a-statistic
          title="总内存"
          :value="byteSize(Number(data[data.length - 1].memory.total))"
        />
        <a-statistic
          title="使用中"
          :value="byteSize(Number(data[data.length - 1].memory.used))"
        />
        <a-statistic
          title="空闲"
          :value="byteSize(Number(data[data.length - 1].memory.free))"
        />
        <a-statistic
          title="已缓存"
          :value="byteSize(Number(data[data.length - 1].memory.buffcache))"
        />
        <a-statistic
          title="可用"
          :value="byteSize(Number(data[data.length - 1].memory.available))"
        />
        <a-divider type="vertical" style="height: 2rem" />
        <a-statistic
          title="Swap 大小"
          :value="byteSize(Number(data[data.length - 1].memory.swaptotal))"
        />
        <a-statistic
          title="Swap 使用中"
          :value="byteSize(Number(data[data.length - 1].memory.swapused))"
        />
        <a-statistic
          title="Swap 空闲"
          :value="byteSize(Number(data[data.length - 1].memory.swapfree))"
        />
      </a-space>
      <area-chart class="chart" v-bind="config" />
    </a-card>
  </a-col>
</template>

<script setup lang="ts">
import { AreaChart, AreaChartProps } from '@opd/g2plot-vue'
import byteSize from 'byte-size'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import { computed } from 'vue'

dayjs.extend(calendar)

const props = defineProps<{
  data: ISystemLoadResponse[]
}>()

const calendarFomatter = {
  sameDay: 'HH:mm:ss',
  nextDay: '[明天] HH:mm:ss',
  nextWeek: 'MM-DD HH:mm:ss',
  lastDay: '[昨天] HH:mm:ss',
  lastWeek: 'MM-DD HH:mm:ss',
  sameElse: 'MM-DD HH:mm:ss',
}

const chart = computed(() => {
  return props.data
    .map(d => {
      return [
        {
          time: dayjs(d.time).calendar(null, calendarFomatter),
          value: (Number(d.memory.free) * 100) / Number(d.memory.total),
          type: 'free',
        },
        {
          time: dayjs(d.time).calendar(null, calendarFomatter),
          value: (Number(d.memory.buffcache) * 100) / Number(d.memory.total),
          type: 'buffcache',
        },
        {
          time: dayjs(d.time).calendar(null, calendarFomatter),
          value: (Number(d.memory.used) * 100) / Number(d.memory.total),
          type: 'used',
        },
      ]
    })
    .flat()
})

const fontSans = document.documentElement.style.getPropertyValue('--font-sans')
const tooltipStyle = {
  fontFamily: fontSans,
  fontSize: '0.875rem',
  lineHeight: '1',
}

const config: AreaChartProps = {
  height: 120,
  appendPadding: 4,
  data: chart.value,
  xField: 'time',
  yField: 'value',
  seriesField: 'type',
  isPercent: true,
  smooth: true,
  color: ['#AED581', '#DCE775', 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff'],
  xAxis: false,
  yAxis: false,
  legend: false,

  tooltip: {
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
    time: {
      range: [0, 1],
    },
  },
}
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
</style>
