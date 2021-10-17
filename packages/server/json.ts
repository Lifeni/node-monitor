import dayjs from 'dayjs'

/**
 * 对数据中的 `time` 字段进行格式化，转化为 Unix 时间戳（毫秒）
 * 对数据中 `bigint` 类型的字段格式化，转换为字符串
 * @param obj 需要序列化的对象
 * @returns {string} 序列化后的字符串
 */
export const serialize = (obj: any) =>
  JSON.stringify(obj, (key, value) => {
    if (key === 'time') {
      return dayjs(value).valueOf()
    } else {
      return typeof value === 'bigint' ? value.toString() : value
    }
  })
