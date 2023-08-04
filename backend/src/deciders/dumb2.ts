import { StockDataPoint, Decision } from '../types'

const decide = (data: StockDataPoint[]): Decision[] => {
  const decisions: Decision[] = []

  for (let i = 0; i < data.length; i++) {
    const { average } = data[i]

    if (i > 5 && data[i - 5].average < average) {
      decisions.push('sell')
    } else if (i > 5 && data[i - 5].average > average) {
      decisions.push('buy')
    } else {
      decisions.push('wait')
    }
  }

  return decisions
}

const name = 'dumb2'

export default { decide, name }
