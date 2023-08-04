import { stockDataPoint } from '../fetchData'

type decision = 'buy' | 'sell' | 'wait'
type stockData = stockDataPoint[]

export const decide = (data: stockData): decision[] => {
  const decisions: decision[] = []

  for (let i = 0; i < data.length; i++) {
    const { open, close, average } = data[i]

    if (open < average) {
      // Buy decision
      decisions.push('buy')
    } else if (close > average) {
      // Sell decision
      decisions.push('sell')
    } else {
      // Wait decision
      decisions.push('wait')
    }
  }

  return decisions
}
