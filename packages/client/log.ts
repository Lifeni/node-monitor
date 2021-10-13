/**
 * 返回当前时间
 * @returns {string} 格式是 `2021-10-01 21:17:20`
 */
const time = (): string => {
  const d = new Date()
  const z = (num: number) => (num < 10 ? `0${num}` : num)

  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())} ${z(
    d.getHours()
  )}:${z(d.getMinutes())}:${z(d.getSeconds())}`
}

/**
 * 正常的日志
 * @param scope 日志所属模块
 * @param message 日志内容
 */
export const log = (scope: string, message: string) => {
  console.log(`[${time()}] [INFO] (${scope}) ${message}`)
}

/**
 * 错误的日志
 * @param scope 日志所属模块
 * @param message 日志内容
 * @param error 错误信息（可选）
 */
export const error = (scope: string, message: string, error?: unknown) => {
  console.error(`[${time()}] [ERROR] (${scope}) ${message}`)
  error && console.error(`[${time()}] [ERROR]`, error)
}
