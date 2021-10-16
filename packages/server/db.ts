import { PrismaClient } from '@prisma/client'
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
 * @param data ISystemInfoMessage
 */
export const writeSystemInfo = async (data: ISystemInfoMessage) => {
  try {
    if (prisma) {
      const { id, time, info } = data
      const record = {
        time,
        system: { create: info.system },
        os: { create: info.os },
        cpu: { create: info.cpu },
        network: { create: info.network },
        disk: { create: info.disk },
      }
      await prisma.systemInfo.upsert({
        where: {
          name: id,
        },
        update: record,
        create: {
          name: id,
          ...record,
        },
        include: {
          system: true,
          os: true,
          cpu: true,
          network: true,
          disk: true,
        },
      })
    }
  } catch (err) {
    error('mongo-db', '写入 MongoDB 时出现错误', err)
  }
}

/**
 * 将系统负载数据写入数据库
 * @function writeSystemLoad
 * @param data ISystemLoadMessage
 */
export const writeSystemLoad = async (data: ISystemLoadMessage) => {
  try {
    if (prisma) {
      const { id, time, load } = data
      await prisma.systemLoad.create({
        data: {
          name: id,
          time,
          load: load.load,
          cpu: load.cpu,
          memory: { create: load.memory },
        },
        include: { memory: true },
      })
    }
  } catch (err) {
    error('mongo-db', '写入 MongoDB 时出现错误', err)
  }
}

export const readAllBots = async () => {
  try {
    if (prisma) {
      return await prisma.systemInfo.findMany({
        select: { id: true, name: true, time: true, system: true, os: true },
      })
    }
  } catch (err) {
    error('mongo-db', '读取 MongoDB 时出现错误', err)
  }
}
