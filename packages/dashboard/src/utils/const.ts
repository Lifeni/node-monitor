/**
 * 请求 API 的前缀，开发环境和生产环境下分开配置
 * @constant
 */
export const BASE_API =
  import.meta.env.VITE_BASE_API ||
  (process.env.NODE_ENV === 'development' ? 'http://localhost:9020' : '/api')
