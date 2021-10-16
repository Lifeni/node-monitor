import Hapi from '@hapi/hapi'
import { readAllBots } from './db'
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

  /**
   * 测试接口
   * @name ping
   * @returns pong
   */
  server.route({
    method: 'GET',
    path: '/ping',
    handler: async () => 'pong',
  })

  /**
   * 获取所有的连接过的客户端 ID
   * @name bots
   * @returns {Promise}
   */
  server.route({
    method: 'GET',
    path: '/bots',
    handler: async () => (await readAllBots()) || [],
  })

  await server.start()
  log('http-server', `已启动 HTTP 服务器 (${HTTP_PORT})`)
}
