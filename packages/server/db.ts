import { error, log } from './log'
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient | null = null

export const connectToDatabase = async () => {
  try {
    prisma = new PrismaClient()
    log('mongo-db', '连接到 MongoDB')
  } catch (err) {
    error('mongo-db', '连接 MongoDB 时出现错误', err)
  }
}

export const writeSystemInfo = async (data: ISystemInfoMessage) => {
  try {
    if (prisma) {
      const { id, time, info } = data
      await prisma.systemInfo.create({
        data: { name: id, time, ...info },
      })
    }
  } catch (err) {
    error('mongo-db', '写入 MongoDB 时出现错误', err)
  }
}

export const writeSystemLoad = async (data: ISystemLoadMessage) => {
  try {
    if (prisma) {
      const { id, time, load } = data
      await prisma.systemLoad.create({
        data: { name: id, time, ...load },
      })
    }
  } catch (err) {
    error('mongo-db', '写入 MongoDB 时出现错误', err)
  }
}
