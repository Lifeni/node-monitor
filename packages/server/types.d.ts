type SystemData = {
  /**
   * 硬件或虚拟机制造商
   */
  manufacturer: string
  /**
   * 硬件或虚拟机型号
   */
  model: string
  /**
   * 硬件或虚拟机版本号
   */
  version: number
  /**
   * 是否虚拟化
   */
  virtual: boolean
}

type OsData = {
  /**
   * 系统平台，例如 `linux` `win32`
   */
  platform: string
  /**
   * 系统发行版，例如 `ubuntu`
   */
  distro: string
  /**
   * 系统版本，例如 `18.04.5 LTS`
   */
  release: string
  /**
   * 系统架构，例如 `x64` `arm64`
   */
  arch: string
  /**
   * 系统主机名
   */
  hostname: string
}

type CpuData = {
  /**
   * CPU 制造商
   */
  manufacturer: string
  /**
   * CPU 型号
   */
  brand: string
  /**
   * CPU 频率
   */
  speed: number
  /**
   * CPU 逻辑核心数
   */
  cores: number
  /**
   * CPU 物理核心数
   */
  physicalCores: number
  /**
   * CPU 个数
   */
  processors: number
}

type NetworkData = {
  /**
   * 网卡类型，例如 `eth0`
   */
  iface: string
  /**
   * IPv4 地址
   */
  ip4: string
  /**
   * IPv6 地址
   */
  ip6: string
  /**
   * MAC 地址
   */
  mac: string
}

type FileSystemData = {
  /**
   * 文件系统
   */
  fs: string
  /**
   * 文件系统大小
   */
  size: number
  /**
   * 已用的文件系统大小
   */
  used: number
  /**
   * 可用的文件系统大小
   */
  available: number
  /**
   * 文件系统使用率
   */
  use: number
  /**
   * 挂载位置
   */
  mount: string
}

interface ISystemInfo {
  /**
   * 硬件或虚拟机信息
   */
  system: SystemData
  /**
   * 操作系统信息
   */
  os: OsData
  /**
   * CPU 信息
   */
  cpu: CpuData
  /**
   * 网络（网卡）信息
   */
  network: NetworkData[]
  /**
   * 文件系统信息
   */
  disk: FileSystemData[]
}

interface ISystemInfoMessage {
  /**
   * 设备 ID
   */
  id: string
  /**
   * 数据收集时间
   */
  time: number
  /**
   * 系统信息数据
   */
  info: ISystemInfo
}

type CpuLoadData = {
  /**
   * CPU 负载
   */
  load: number
}

type MemoryLoadData = {
  /**
   * 内存大小
   */
  total: number
  /**
   * 空闲内存大小
   */
  free: number
  /**
   * 已用内存大小
   */
  used: number
  /**
   * 可用内存大小
   */
  available: number
  /**
   * 交换分区或交换文件大小
   */
  swaptotal: number
  /**
   * 已用的交换分区或交换文件大小
   */
  swapused: number
  /**
   * 可用的交换分区或交换文件大小
   */
  swapfree: number
  /**
   * 缓存大小或使用量
   */
  buffcache: number
}

interface ISystemLoad {
  /**
   * 系统总的 CPU 负载
   */
  load: number
  /**
   * 各个逻辑内核 CPU 负载
   */
  cpu: number[]
  /**
   * 内存信息
   */
  memory: MemoryLoadData
}

interface ISystemLoadMessage {
  /**
   * 设备 ID
   */
  id: string
  /**
   * 数据收集时间
   */
  time: number
  /**
   * 系统负载数据
   */
  load: ISystemLoad
}

interface ISystemOverview {
  /**
   * 数据库 ID
   */
  id: number
  /**
   * 客户端名称
   */
  name: string
  /**
   * 数据时间戳
   */
  time: Decimal
  /**
   * 硬件或虚拟机数据
   */
  system: SystemData
  /**
   * 操作系统数据
   */
  os: OsData
}
