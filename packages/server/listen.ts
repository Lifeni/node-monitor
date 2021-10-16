import { Server } from 'socket.io'
import { writeSystemInfo, writeSystemLoad } from './db'
import { log } from './log'

/**
 * 获取要监听的 WebSocket 端口
 * @type {number}
 * @constant
 * @default 9010
 */
const WS_PORT: number = Number(process.env.WS_PORT) || 9010

export const startListener = async () => {
  const io = new Server(WS_PORT)
  log('ws-server', `已启动 WebSocket 服务器 (${WS_PORT})`)

  io.on('connection', socket => {
    socket.on('system-info', async (data: ISystemInfoMessage) => {
      await writeSystemInfo(data)
      log('system-info', `获得来自 ${data.id} 的系统信息数据`)
    })
    socket.on('system-load', async (data: ISystemLoadMessage) => {
      await writeSystemLoad(data)
      log('system-load', `获得来自 ${data.id} 的系统负载数据`)
    })
  })
}
