import { startServer } from './api'
import { connectToDatabase } from './db'
import { startListener } from './listen'
import { error, log } from './log'

const startApp = async () => {
  log('client-app', '服务端已启动')
  try {
    await connectToDatabase()
    await startServer()
    await startListener()
  } catch (err) {
    error('server-app', '服务端运行异常', err)
  }
}

startApp()
