import { io } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'

/** 获取要连接的地址 */
const WS_URL = process.env.WS_URL || 'ws://localhost:9010'

/** 从环境变量中获取 ID，如果没有就临时生成 */
const getId = () => {
  const id = process.env.ID || uuidv4()
  console.log(`[INFO] (uuid) 设备 ID ${id}${process.env.ID || ' (临时)'}`)
  return id
}

const UUID = getId()

/** 声明 socket.io 实例，取消自动连接 */
const socket = io(WS_URL, { autoConnect: false })

/** 与服务器建立连接，输出日志 */
socket.on('connect', () => {
  console.log(`[INFO] (socket-io) 已连接到 ${WS_URL}`)
})

/**
 * 与服务器断开连接，输出日志并退出程序，
 * 参考事件：https://socket.io/docs/v4/client-api/#event-disconnect
 */
socket.on('disconnect', reason => {
  console.log(`[INFO] (socket-io) 已断开连接 (${reason})`)
  process.exitCode = 1
})

/** 尝试与服务器建立连接 */
export const connectToServer = async () => {
  console.log(`[INFO] (socket-io) 尝试连接 ${WS_URL}`)
  socket.connect()
}

export const postSystemInfo = async (data: ISystemInfo) => {
  socket.send('system-info', { id: UUID, data })
}

export const postSystemLoad = async (data: ISystemLoad) => {
  socket.emit('system-load', { id: UUID, data })
}
