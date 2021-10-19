<template>
  <a-col>
    <a-card
      hoverable
      class="card"
      bodyStyle="padding: 0.5rem 1.5rem 1.25rem 1.5rem;"
    >
      <template #title>
        <DesktopOutlined class="icon" />
        <a-typography-text strong> {{ props.bot.name }} </a-typography-text>
      </template>

      <a-table
        class="table"
        :columns="columns"
        :data-source="table"
        size="small"
        :showHeader="false"
        :pagination="false"
      />

      <a-space class="footer">
        <router-link class="more" :to="`/bot/${props.bot.name}`">
          查看更多数据 ...
        </router-link>
        <a-typography-text type="secondary" class="time">
          数据更新于 {{ dayjs(props.bot.time).toNow() }}
        </a-typography-text>
      </a-space>
    </a-card>
  </a-col>
</template>

<script setup lang="ts">
import { DesktopOutlined } from '@ant-design/icons-vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const props = defineProps<{
  bot: ISystemOverviewResponse
}>()

const columns = [
  { title: '名称', dataIndex: 'name' },
  { title: '属性', dataIndex: 'value' },
]

const table = [
  { name: '主机名', value: `${props.bot.os.hostname}` },
  {
    name: '操作系统',
    value: `${props.bot.os.distro} ${props.bot.os.release} (${props.bot.os.arch})`,
  },
  {
    name: '设备',
    value: `${props.bot.system.manufacturer} ${props.bot.system.model}`,
  },
]
</script>

<style scoped>
.card {
  max-width: 24rem;
  border-radius: 0.5rem;
}

.icon {
  margin: 0 1rem 0 0.25rem;
}

.footer {
  width: 100%;
  padding: 1rem 0.5rem 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
