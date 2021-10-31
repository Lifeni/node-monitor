import Hapi from '@hapi/hapi'
import { readAllBots, readBotInfo, readBotLoad } from './db'
import { serialize } from './json'
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
    routes: {
      cors: {
        origin: ['*'],
        credentials: true,
      },
    },
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
   * 获取所有的连接过的客户端 ID 及其简略信息
   * @name bots
   * @returns {ISystemOverviewResponse[]>}
   */
  server.route({
    method: 'GET',
    path: '/bots',
    handler: async (request, h) => {
      const result = await readAllBots()
      return result?.length
        ? h.response(serialize(result)).type('application/json')
        : h.response({ message: '还没有连接过的客户端数据' }).code(404)
    },
  })

  /**
   * 获取指定客户端的系统信息数据
   * @name bot/:name/info
   * @returns {ISystemInfo}
   */
  server.route({
    method: 'GET',
    path: '/bot/{name}/info',
    handler: async ({ params }, h) => {
      const result = await readBotInfo(params.name)
      return result
        ? h.response(serialize(result)).type('application/json')
        : h.response({ message: '没有找到指定客户端的系统信息数据' }).code(404)
    },
  })

  /**
   * 获取指定客户端的多个系统负载数据
   * @name bot/:name/load
   * @query from {number} Unix 时间戳（毫秒），从该时间戳开始获取（包含）
   * @query to {number} Unix 时间戳（毫秒），到该时间戳结束获取（包含）
   * @query count {number} 获取的数据最大条数
   * @returns {ISystemLoad[]}
   */
  server.route({
    method: 'GET',
    path: '/bot/{name}/load',
    handler: async ({ params, query }, h) => {
      const result = await readBotLoad(params.name, query)
      return result?.length
        ? h.response(serialize(result.reverse())).type('application/json')
        : h.response({ message: '没有找到指定客户端的系统负载数据' }).code(404)
    },
  })

  await server.start()
  log('http-server', `已启动 HTTP 服务器 (${HTTP_PORT})`)
}
