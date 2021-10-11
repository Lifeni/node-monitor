import { connectToServer } from './post'

const startApp = async () => {
  await connectToServer()
}

startApp()
