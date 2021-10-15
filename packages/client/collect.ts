import { pick } from 'lodash'
import { get } from 'systeminformation'
import { error } from './log'

/**
 * 收集系统信息相关数据，包含硬件、操作系统、CPU、网络（IP 地址、MAC 地址）、文件系统等数据
 * @returns {Promise<ISystemInfo | undefined>} 返回 `ISystemInfo`，可能为 `undefined`
 */
export const collectSystemInfo = async (): Promise<ISystemInfo | undefined> => {
  try {
    const data = await get({
      system: 'manufacturer, model, version, virtual',
      osInfo: 'platform, distro, release, arch, hostname',
      cpu: 'manufacturer, brand, speed, cores, physicalCores, processors',
      networkInterfaces: 'iface, ip4, ip6, mac',
      fsSize: 'fs, size, used, available, use, mount',
    })

    return {
      system: data.system,
      os: data.osInfo,
      cpu: data.cpu,
      network: data.networkInterfaces,
      disk: data.fsSize,
    }
  } catch (err) {
    error('system-info', '获取系统信息数据失败', err)
  }
}

/**
 * 收集系统负载相关数据，包含 CPU 负载（每个逻辑内核）、内存等数据
 * @returns {Promise<ISystemLoad | undefined>} 返回 `ISystemLoad`，可能为 `undefined`
 */
export const collectSystemLoad = async (): Promise<ISystemLoad | undefined> => {
  try {
    const data = await get({
      currentLoad: 'currentLoad, cpus',
      mem: 'total, free, used, available, buffcache, swaptotal, swapused, swapfree',
    })

    return {
      load: data.currentLoad.currentLoad,
      cpu: data.currentLoad.cpus.map((cpu: CpuLoadData) => cpu.load),
      memory: data.mem,
    }
  } catch (err) {
    error('system-load', '获取系统负载数据失败', err)
  }
}
