import { createServer } from 'http'
import { createApp } from 'h3'
import { log } from './log'

/**
 * 获取要监听的 HTTP 端口
 * @type {number}
 * @constant
 * @default 9020
 */
const HTTP_PORT: number = Number(process.env.HTTP_PORT) || 9020

const app = createApp()

export const startServer = async () => {
  createServer(app).listen(HTTP_PORT)
  log('http-server', `已启动 HTTP 服务器 (${HTTP_PORT})`)
}

/**
 * 测试接口
 * @name ping
 * @returns pong
 */
app.use('/ping', () => 'pong')
