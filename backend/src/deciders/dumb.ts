import { StockDataPoint, Decision } from '../types'

const decide = (data: StockDataPoint[]): Decision[] => {
  console.log('🚀 ~ decide ~ data:', data)
  const decisions: Decision[] = []

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

const name = 'dumb'

export default { decide, name }
