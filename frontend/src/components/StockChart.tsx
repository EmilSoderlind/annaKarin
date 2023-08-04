import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { StockDataPoint } from '../types'

type props = {
  stockData: StockDataPoint[]
}

const StockChart: React.FC<props> = ({ stockData }) => {
  const [showOnlyAverage, setShowOnlyAverage] = useState(true)

  return (
    <div>
      <ResponsiveContainer width={700} height={400}>
        <LineChart
          data={stockData.map((val) => ({ ...val, date: val.date.split(' ')[1] }))}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" allowDataOverflow={true} />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Legend />
          {showOnlyAverage ? (
            <Line type="monotone" dataKey="average" stroke="#000000" />
          ) : (
            <>
              <Line type="monotone" dataKey="open" stroke="#8884d8" />
              <Line type="monotone" dataKey="high" stroke="#82ca9d" />
              <Line type="monotone" dataKey="low" stroke="#ff0000" />
              <Line type="monotone" dataKey="close" stroke="#00ff00" />
              <Line type="monotone" dataKey="average" stroke="#000000" />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
      <button onClick={() => setShowOnlyAverage(!showOnlyAverage)}>
        {showOnlyAverage ? 'Show all' : 'Show only average'}
      </button>
    </div>
  )
}

export default StockChart
