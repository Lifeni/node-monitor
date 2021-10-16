import { Server } from 'socket.io'
import { writeSystemInfo, writeSystemLoad } from './db'

/**
 * 获取要监听的 WebSocket 端口
 * @default 9010
 */
const WS_PORT = Number(process.env.WS_PORT) || 9010

export const startListener = async () => {
  const io = new Server(WS_PORT)

  io.on('connection', socket => {
    socket.on('system-info', async (data: ISystemInfoMessage) => {
      await writeSystemInfo(data)
    })
    socket.on('system-load', async (data: ISystemLoadMessage) => {
      await writeSystemLoad(data)
    })
  })
}
