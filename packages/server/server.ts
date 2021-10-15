import { startServer } from './listen'
import { error, log } from './log'

const startApp = async () => {
  log('client-app', '服务端已启动')
  try {
    await startServer()
  } catch (err) {
    error('server-app', '服务端运行异常', err)
  }
}

startApp()
