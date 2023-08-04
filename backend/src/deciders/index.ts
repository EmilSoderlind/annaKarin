import { fetchData } from '../fetchData'
import { StockDataPoint, Decision, DeciderModule } from '../types'
import dumb from './dumb'
import dumb2 from './dumb2'
import random_guy from './random_guy'

type deciderFunctionType = (data: StockDataPoint[]) => Decision[]

export const runDecider = (decider: DeciderModule, stockData: StockDataPoint[]) => {
  let fiatCredits = 10000
  let stockCount = 10
  let buyCount = 0
  let sellCount = 0

  const decisions = decider.decide(stockData)

  decisions.map((decision, index) => {
    const currentAveragePrice = stockData[index].average

    const gotCashToBuy = currentAveragePrice <= fiatCredits
    const gotStockToSell = stockCount > 0

    const currentData = {
      fiatCredits: parseFloat(fiatCredits.toFixed(2)),
      stockCount,
      stockData: stockData[index].average,
    }

    if (gotCashToBuy && decision === 'buy') {
      fiatCredits = fiatCredits - currentAveragePrice
      stockCount += 1
      buyCount += 1

      console.log(decider.name + ' 🤖 Im buying!', currentData)
      return
    }

    if (gotStockToSell && decision === 'sell') {
      fiatCredits = fiatCredits + currentAveragePrice
      stockCount -= 1
      sellCount += 1

      console.log(decider.name + ' 🤖 Im selling!', currentData)
      return
    }

    if (decision === 'wait') {
      console.log(decider.name + ' 🤖 Im waiting!', currentData)
      return
    }

    if (!gotStockToSell && decision === 'sell') {
      console.log(decider.name + ' 🤖 Want to sell, but got no stocks to sell')
      return
    }

    if (!gotCashToBuy && decision === 'buy') {
      console.log(decider.name + ' 🤖 Want to buy, but got no money')
      return
    }

    throw Error(
      `${decider.name} - Seems to be something wrong here ${{ currentData, decision, fiatCredits, stockCount }}`,
    )
  })

  const initialTotal = fiatCredits + stockCount * stockData[0].average
  const finalTotal = fiatCredits + stockCount * stockData[stockData.length - 1].average

  return {
    initial: { fiatCredits, stockCount, total: initialTotal },
    final: {
      fiatCredits,
      stockCount,
      total: finalTotal,
    },
    delta: finalTotal - initialTotal,
  }
}

const deciders = [dumb, dumb2, random_guy]

export const runAllDeciders = async () => {
  const stockData = await fetchData('spot', '5min')
  console.log('🚀 ~ runAllDeciders ~ stockData:', stockData)

  const res = deciders.map((decider) => ({ decisions: runDecider(decider, stockData), name: decider.name }))
  console.log('🚀 ~ runAllDeciders ~ res:', res, null, 4)
}
