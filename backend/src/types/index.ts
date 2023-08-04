export type StockDataPoint = {
  date: string
  open: number
  high: number
  low: number
  close: number
  average: number
}

export type Decision = 'buy' | 'sell' | 'wait'
export type stockData = StockDataPoint[]

export type Interval = '1min' | '5min' | '15min' | '30min' | '60min'

export interface AlphaTimeSeriesEntry {
  '1. open': string
  '2. high': string
  '3. low': string
  '4. close': string
  '5. volume': string
}

export interface AlphaMetaData {
  '1. Information': string
  '2. Symbol': string
  '3. Last Refreshed': string
  '4. Interval': Interval
  '5. Output Size': string
  '6. Time Zone': string
}

// Define keys explicitly based on the Interval type
export interface AlphaStockData {
  'Meta Data': AlphaMetaData
  'Time Series (1min)': AlphaTimeSeriesData
  'Time Series (5min)': AlphaTimeSeriesData
  'Time Series (15min)': AlphaTimeSeriesData
  'Time Series (30min)': AlphaTimeSeriesData
  'Time Series (60min)': AlphaTimeSeriesData
}

export interface AlphaTimeSeriesData {
  [timestamp: string]: AlphaTimeSeriesEntry
}

export interface DeciderModule {
  decide: DeciderFunction
  name: string
}

export type DeciderFunction = (data: StockDataPoint[]) => Decision[]
