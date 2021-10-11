import { cpu, system } from 'systeminformation'

export const collectSystemInfo = async () => {
  try {
    const info = {
      system: await system(),
    }
    return info
  } catch (err) {
    console.log(err)
  }
}

export const collectSystemLoad = async () => {}
