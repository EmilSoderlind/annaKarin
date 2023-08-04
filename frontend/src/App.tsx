import React, { useEffect, useState } from 'react'
import './App.css'
import StockChart from './components/StockChart'
import { StockDataPoint } from './types'

function App() {
  const url = 'http://localhost:3001/'
  const [stockData, setStockData] = useState<StockDataPoint[]>([])
  const [lastStockPoint, setLastStockPoint] = useState<StockDataPoint | null>()
  console.log('🚀 ~ stockData:', stockData)

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('🚀 ~ .then ~ data:', data)

        const dataPoints = data['dataPoints'] as StockDataPoint[]
        setLastStockPoint(data.last as StockDataPoint)
        setStockData(dataPoints)
      })
      .catch((error) => console.error('Error fetching stock data:', error))
  }, [])

  if (!stockData || !lastStockPoint) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <div>
        <h1>Anna-Karin Robot 🤖</h1>
        <div>
          <div style={{ borderStyle: 'solid', padding: '16px', height: '100%' }}>
            <StockChart stockData={stockData} />
          </div>

          <div style={{ borderStyle: 'solid', padding: '16px', height: '100%' }}>
            <h3>Facit</h3>
            <p>{`${lastStockPoint.date.split(' ')[1]} - Average: ${lastStockPoint.average} ${
              lastStockPoint.average < stockData[stockData.length - 1].average ? '📉' : '📈'
            }`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
