import { fetchData } from '../fetchData'
import { decide } from './dumb'

const deciders = {
  dumb: decide,
}

export const runDecider = async () => {
  const deciderFunction = deciders['dumb']

  let fiatCredits = 10000
  let stockCount = 10
  let buyCount = 0
  let sellCount = 0

  const stockData = await fetchData('spot')

  const decisions = deciderFunction(stockData)

  decisions.map((decision, index) => {
    const currentAveragePrice = stockData[index].average

    const gotCashToBuy = currentAveragePrice <= fiatCredits
    const gotStockToSell = stockCount > 0

    const currentData = { fiatCredits, stockCount, stockData: stockData[index].average }

    if (gotCashToBuy && decision === 'buy') {
      fiatCredits = fiatCredits - currentAveragePrice
      stockCount += 1
      buyCount += 1

      console.log('🤖 Im buying!', currentData)
      return
    }

    if (gotStockToSell && decision === 'sell') {
      fiatCredits = fiatCredits + currentAveragePrice
      stockCount -= 1
      sellCount += 1

      console.log('🤖 Im selling!', currentData)
      return
    }

    if (decision === 'wait') {
      console.log('🤖 Im waiting!', currentData)
      return
    }

    throw Error(`Seems to be something wrong here ${{ currentData, decision, fiatCredits, stockCount }}`)
  })

  console.log('BEFORE: ', { fiatCredits, stockCount, total: fiatCredits + stockCount * stockData[0].average })

  console.log('AFTER: ', {
    fiatCredits,
    stockCount,
    total: fiatCredits + stockCount * stockData[stockData.length - 1].average,
    buyCount,
    sellCount,
  })
}
