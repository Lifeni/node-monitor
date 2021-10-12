import { get } from 'systeminformation'

export const collectSystemInfo = async () => {
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
    } as ISystemInfo
  } catch (err) {
    console.error(`[ERROR] (system-info) 获取系统信息数据失败`)
    console.error(err)
  }
}

export const collectSystemLoad = async () => {
  try {
    return await get({
      currentLoad: 'currentLoad, cpus',
      mem: 'total, free, used, available, buffcache, swaptotal, swapused, swapfree',
    })
  } catch (err) {
    console.error(`[ERROR] (system-load) 获取系统负载数据失败`)
    console.error(err)
  }
}
