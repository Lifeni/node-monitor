import { error } from './log'
import { connectToServer, postSystemInfo, postSystemLoad } from './post'

/** 读取数据发送时间间隔 */
const INTERVAL = (Number(process.env.INTERVAL) || 5) * 1000

const startApp = async () => {
  let timer: NodeJS.Timeout | null = null
  try {
    // 尝试连接到服务器
    await connectToServer()

    // 尝试发送系统数据
    timer = await postData()
  } catch (err) {
    error('client-app', '客户端运行异常', err)
    timer && clearInterval(timer)
  }
}

const postData = async () => {
  // 收集并发送系统信息数据
  await postSystemInfo()

  // 每隔一段时间收集并发送系统负载数据
  return setInterval(async () => await postSystemLoad(), INTERVAL)
}

startApp()
