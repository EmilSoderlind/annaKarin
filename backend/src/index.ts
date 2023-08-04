import { runAPI } from './api'
import { runDecider } from './deciders'
import { fetchData } from './fetchData'

require('dotenv').config()

const main = async () => {
  console.log('Initiating annaKarin robot 🤖')
  // const points = await fetchData('AAPL')
  // const allButLast = points.slice(0, points.length - 1)
  // const last = points[points.length - 1]
  // console.log('🚀 ~ main ~ allButLast:', allButLast.length)
  // console.log('🚀 ~ main ~ last:', last)

  await runDecider()
}

main()
