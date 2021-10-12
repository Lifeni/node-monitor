type SystemData = {
  manufacturer: string
  model: string
  version: string
  virtual: boolean
}

type OsData = {
  platform: string
  distro: string
  release: string
  arch: string
  hostname: string
}

type CpuData = {
  manufacturer: string
  brand: string
  speed: number
  cores: number
  physicalCores: number
  processors: number
}

type NetworkData = {
  iface: string
  ip4: string
  ip6: string
  mac: string
}

type FileSystemData = {
  fs: string
  size: number
  used: number
  available: number
  use: number
  mount: string
}

interface ISystemInfo {
  system: SystemData
  os: OsData
  cpu: CpuData
  network: NetworkData[]
  disk: FileSystemData[]
}

interface ISystemLoad {}
