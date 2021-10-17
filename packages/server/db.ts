import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'
import { error, log } from './log'

let prisma: PrismaClient | null = null

export const connectToDatabase = async () => {
  try {
    prisma = new PrismaClient({})
    log('mongo-db', '连接到 MongoDB')
  } catch (err) {
    error('mongo-db', '连接 MongoDB 时出现错误', err)
  }
}

/**
 * 将系统信息数据写入数据库
 * @function writeSystemInfo
 * @param data {ISystemInfoMessage} WebSocket 接收到的消息
 */
export const writeSystemInfo = async (data: ISystemInfoMessage) => {
  try {
    if (prisma) {
      const { id, time, info } = data

      // 需要写入的数据
      const record = {
        time: dayjs(time).toDate(),
        system: { create: info.system },
        os: { create: info.os },
        cpu: { create: info.cpu },
        network: { create: info.network },
        disk: { create: info.disk },
      }

      // 包含的嵌套关系
      const include = {
        system: true,
        os: true,
        cpu: true,
        network: true,
        disk: true,
      }

      await prisma.systemInfo.upsert({
        where: { name: id },
        update: record,
        create: { name: id, ...record },
        include,
      })
    }
  } catch (err) {
    error('mongo-db', '写入 MongoDB 时出现错误', err)
  }
}

/**
 * 将系统负载数据写入数据库
 * @function writeSystemLoad
 * @param data {ISystemLoadMessage} WebSocket 接收到的消息
 */
export const writeSystemLoad = async (data: ISystemLoadMessage) => {
  try {
    if (prisma) {
      const { id, time, load } = data

      // 需要写入的数据
      const record = {
        name: id,
        time: dayjs(time).toDate(),
        load: load.load,
        cpu: load.cpu,
        memory: { create: load.memory },
      }

      await prisma.systemLoad.create({
        data: record,
        include: { memory: true },
      })
    }
  } catch (err) {
    error('mongo-db', '写入 MongoDB 时出现错误', err)
  }
}

/**
 * 读取所有连接过的客户端及其简略信息
 * @function readAllBots
 * @returns {Promise<ISystemOverviewResponse[] | undefined>}
 */
export const readAllBots = async (): Promise<
  ISystemOverviewResponse[] | undefined
> => {
  try {
    if (prisma) {
      // 需要选择的数据
      const select = {
        id: true,
        name: true,
        time: true,
        system: true,
        os: true,
      }

      return await prisma.systemInfo.findMany({ select })
    }
  } catch (err) {
    error('mongo-db', '读取 MongoDB 时出现错误', err)
  }
}

/**
 * 读取指定客户端的系统信息数据
 * @function readBotInfo
 * @param id {string} 客户端 ID
 * @returns {Promise<ISystemInfo | undefined>}
 */
export const readBotInfo = async (
  id: string
): Promise<ISystemInfo | null | undefined> => {
  try {
    if (prisma) {
      // 需要选择的数据
      const select = {
        id: true,
        name: true,
        time: true,
        system: true,
        os: true,
        cpu: true,
        network: true,
        disk: true,
      }

      return await prisma.systemInfo.findUnique({
        where: { name: id },
        select,
      })
    }
  } catch (err) {
    error('mongo-db', '读取 MongoDB 时出现错误', err)
  }
}

/**
 * 读取指定客户端的多个系统负载数据
 * @function readBotLoad
 * @param id {string} 客户端 ID
 * @param query {ISystemLoadQuery} 查询参数
 * @returns {Promise<ISystemLoad[] | undefined>}
 */
export const readBotLoad = async (
  id: string,
  query: ISystemLoadQuery
): Promise<ISystemLoad[] | undefined> => {
  try {
    if (prisma) {
      const { from, to, count } = query

      // 按时间筛选
      const time = {
        lte: to ? dayjs(Number(to)).toDate() : undefined,
        gte: from ? dayjs(Number(from)).toDate() : undefined,
      }

      // 需要选择的数据
      const select = {
        id: true,
        name: true,
        time: true,
        load: true,
        cpu: true,
        memory: true,
      }

      // 查询的数据数量，默认为 100
      const take = Number(count) || 100

      return await prisma.systemLoad.findMany({
        where: { name: id, time },
        select,
        take,
        orderBy: { time: 'asc' },
      })
    }
  } catch (err) {
    error('mongo-db', '读取 MongoDB 时出现错误', err)
  }
}
