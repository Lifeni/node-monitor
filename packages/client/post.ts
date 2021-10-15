import { io } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import { collectSystemInfo, collectSystemLoad } from './collect'
import { error, log } from './log'

/**
 * 获取要连接的 WebSocket 地址
 * @default ws://localhost:9010
 */
const WS_URL = process.env.WS_URL || 'ws://localhost:9010'

/**
 * 从环境变量中获取 ID，如果没有就临时生成
 * @default uuidv4()
 * @example f452c768-f042-42a6-a0dc-faade8cd0261
 */
const getId = () => {
  const id = process.env.ID || uuidv4()
  log('uuid', `设备 ID ${id} ${process.env.ID ? '' : '(临时)'}`)
  return id
}

const UUID = getId()

const socket = io(WS_URL, { autoConnect: false })

export const connectToServer = async () => {
  log('socket-io', `尝试连接 ${WS_URL}`)
  socket.connect()
}

let errorCount = 0

/**
 * 与服务器建立连接，输出日志
 * @event socket-io#connect
 */
socket.on('connect', () => {
  log('socket-io', `已连接到 ${WS_URL}`)
  errorCount = 0
})

/**
 * 与服务器连接失败，输出日志
 * @event socket-io#connect_error
 * @see {@link https://socket.io/docs/v4/client-socket-instance/#connect_error}
 */
socket.on('connect_error', err => {
  error('socket-io', `连接出现错误，尝试重新连接 (${++errorCount})`, err)

  if (errorCount > 10) {
    error('socket-io', `连接到 ${WS_URL} 失败次数过多，程序退出`)
    process.exit(1)
  }
})

/**
 * 与服务器断开连接，输出日志
 * @event socket-io#disconnect
 * @see {@link https://socket.io/docs/v4/client-api/#event-disconnect}
 */
socket.on('disconnect', reason => log('socket-io', `已断开连接 (${reason})`))

export const postSystemInfo = async () => {
  const info = await collectSystemInfo()
  if (info) {
    const time = new Date().getTime()
    socket.emit('system-info', { id: UUID, time, info })
    log('system-info', `发送系统信息数据 (${time})`)
  }
}

export const postSystemLoad = async () => {
  const load = await collectSystemLoad()
  if (load) {
    const time = new Date().getTime()
    socket.emit('system-load', { id: UUID, time, load })
    log('system-load', `发送系统负载数据 (${time})`)
  }
}

/**
 * 监听更新数据的事件
 * @event socket-io#update-data
 */
socket.on('update-data', (id: string, type: string) => {
  if (UUID === id) {
    switch (type) {
      case 'system-info':
        postSystemInfo()
        break
      case 'system-load':
        postSystemLoad()
        break
    }
  }
})
