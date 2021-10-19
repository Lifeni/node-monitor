import { message } from 'ant-design-vue'

/**
 * Get 请求的 fetch 封装，出错则弹出提示
 * @function get
 * @param url 要请求的地址
 * @returns {Promise<T | null>} 返回一个 Promise 对象，包含数据或者 null
 */
export const get = async <T>(url: string): Promise<T | null> => {
  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    credentials: 'include',
  })

  switch (res.status) {
    case 200:
      return res.json()
    case 404:
      return null
    default:
      message.error(`服务器出错了 ${res.status} ${res.statusText}`)
      console.error(res.status, res.statusText)
      return null
  }
}
