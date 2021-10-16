import Hapi from '@hapi/hapi'
import { log } from './log'

/**
 * 获取要监听的 HTTP 端口
 * @type {number}
 * @constant
 * @default 9020
 */
const HTTP_PORT: number = Number(process.env.HTTP_PORT) || 9020

export const startServer = async () => {
  const server = Hapi.server({
    port: HTTP_PORT,
    host: '0.0.0.0',
  })
  await server.start()
  log('http-server', `已启动 HTTP 服务器 (${HTTP_PORT})`)

  /**
   * 测试接口
   * @name ping
   * @returns pong
   */
  server.route({
    method: 'GET',
    path: '/ping',
    handler: () => 'pong',
  })
}
