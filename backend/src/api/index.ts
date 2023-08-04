import express from 'express'
import cors from 'cors'
import { fetchData } from '../fetchData'
require('dotenv').config()

export const runAPI = () => {
  const port = 3001
  const app = express()

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })

  app.use(cors())

  app.get('/', async (req, res) => {
    try {
      const dataPoints = await fetchData('AAPL')

      const allButLast = dataPoints.slice(0, dataPoints.length - 1)
      const last = dataPoints[dataPoints.length - 1]

      const returnData = {
        dataPoints: allButLast,
        last,
        deciders: [],
      }
      console.log('🚀 ~ app.get ~ returnData:', returnData)
      res.json(returnData)
    } catch (error) {
      console.error('Error fetching data:', error)
      res.status(500).json({ error: 'Error fetching data' })
    }
  })
}
