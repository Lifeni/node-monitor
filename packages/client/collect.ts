import { cpu, system } from 'systeminformation'

export const collect = async () => {
  try {
    const info = {
      cpu: await cpu(),
      system: await system(),
    }
    return info
  } catch (err) {
    console.log(err)
  }
}
