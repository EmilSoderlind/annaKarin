import { StockDataPoint, Decision } from '../types'

const decide = (data: StockDataPoint[]): Decision[] => {
  const decisions: Decision[] = []

  for (let i = 0; i < data.length; i++) {
    // Generate a random number between 0 and 1
    const randomValue = Math.random()

    if (randomValue < 0.33) {
      decisions.push('sell') // 33% chance of 'sell' decision
    } else if (randomValue < 0.66) {
      decisions.push('buy') // 33% chance of 'buy' decision
    } else {
      decisions.push('wait') // 33% chance of 'wait' decision
    }
  }

  return decisions
}

const name = 'random_guy'

export default { decide, name }
