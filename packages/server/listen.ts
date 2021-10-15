import { Server } from 'socket.io'

/**
 * 获取要监听的 WebSocket 端口
 * @default 9010
 */
const WS_PORT = Number(process.env.WS_PORT) || 9010

/**
 * 获取 InfluxDB 连接地址
 * @default http://localhost:8086
 */
const DB_URL = process.env.DB_URL || 'http://localhost:8086'

export const startServer = async () => {
  const io = new Server(WS_PORT)

  io.on('connection', socket => {
    socket.on('system-info', ({ id, time, info }: ISystemInfoMessage) => {})
    socket.on('system-load', ({ id, time, load }: ISystemLoadMessage) => {})
  })
}
