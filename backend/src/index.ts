import { runAllDeciders } from './deciders'
require('dotenv').config()

const main = async () => {
  console.log('Initiating Anna-Karin robot 🤖')

  await runAllDeciders()
}

main()
