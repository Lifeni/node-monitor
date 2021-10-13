/**
 * 正常的日志
 * @param scope 日志所属模块
 * @param message 日志内容
 */
export const log = (scope: string, message: string) => {
  const time = new Date().toLocaleString('zh', { hour12: false })
  console.log(`[${time}] [INFO] (${scope}) ${message}`)
}

/**
 * 错误的日志
 * @param scope 日志所属模块
 * @param message 日志内容
 * @param error 错误信息（可选）
 */
export const error = (scope: string, message: string, error?: unknown) => {
  const time = new Date().toLocaleString('zh', { hour12: false })
  console.error(`[${time}] [ERROR] (${scope}) ${message}`)
  error && console.error(`[${time}] [ERROR]`, error)
}
