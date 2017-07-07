import StorageHelper from './StorageHelper'

exports.getStock = function getStock (opts, type) {
  const defs = {
    baseURL: 'https://query.yahooapis.com/v1/public/yql?q=',
    query: {
      quotes: 'select * from yahoo.Finance.quotes where symbol in ("{stock}")',
      historicaldata: 'select * from yahoo.Finance.historicaldata where symbol = "{stock}" and startDate = "{startDate}" and endDate = "{endDate}"'
    },
    suffixURL: {
      quotes: '&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys',
      historicaldata: '&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys'
    }
  }

  opts = opts || {}

  if (!opts.stock) {
    console.log('No stock defined')
    return
  }

  if (opts.stock instanceof Array) {
    opts.stock = opts.stock.join("', '")
  }

  console.log(opts.stock)

  const query = defs.query[type]
    .replace('{stock}', opts.stock)
    .replace('{startDate}', opts.startDate)
    .replace('{endDate}', opts.endDate)

  const url = defs.baseURL + query + (defs.suffixURL[type] || '')
  console.log(url)
  return fetch(url)  // eslint-disable-line no-undef
}

exports.properties = [
  'AfterHoursChangeRealtime',
  'AnnualizedGain',
  'Ask',
  'AskRealtime',
  'AverageDailyVolume',
  'Bid',
  'BidRealtime',
  'BookValue',
  'Change',
  'ChangeFromFiftydayMovingAverage',
  'ChangeFromTwoHundreddayMovingAverage',
  'ChangeFromYearHigh',
  'ChangeFromYearLow',
  'ChangePercentRealtime',
  'ChangeRealtime',
  'Change_PercentChange',
  'ChangeinPercent',
  'Commission',
  'Currency',
  'DaysHigh',
  'DaysLow',
  'DaysRange',
  'DaysRangeRealtime',
  'DaysValueChange',
  'DaysValueChangeRealtime',
  'DividendPayDate',
  'DividendShare',
  'DividendYield',
  'EBITDA',
  'EPSEstimateCurrentYear',
  'EPSEstimateNextQuarter',
  'EPSEstimateNextYear',
  'EarningsShare',
  'ErrorIndicationreturnedforsymbolchangedinvalid',
  'ExDividendDate',
  'FiftydayMovingAverage',
  'HighLimit',
  'HoldingsGain',
  'HoldingsGainPercent',
  'HoldingsGainPercentRealtime',
  'HoldingsGainRealtime',
  'HoldingsValue',
  'HoldingsValueRealtime',
  'LastTradeDate',
  'LastTradePriceOnly',
  'LastTradeRealtimeWithTime',
  'LastTradeTime',
  'LastTradeWithTime',
  'LowLimit',
  'MarketCapRealtime',
  'MarketCapitalization',
  'MoreInfo',
  'Name',
  'Notes',
  'OneyrTargetPrice',
  'Open',
  'OrderBookRealtime',
  'PEGRatio',
  'PERatio',
  'PERatioRealtime',
  'PercebtChangeFromYearHigh',
  'PercentChange',
  'PercentChangeFromFiftydayMovingAverage',
  'PercentChangeFromTwoHundreddayMovingAverage',
  'PercentChangeFromYearLow',
  'PreviousClose',
  'PriceBook',
  'PriceEPSEstimateCurrentYear',
  'PriceEPSEstimateNextYear',
  'PricePaid',
  'PriceSales',
  'SharesOwned',
  'ShortRatio',
  'StockExchange',
  'Symbol',
  'TickerTrend',
  'TradeDate',
  'TwoHundreddayMovingAverage',
  'Volume',
  'YearHigh',
  'YearLow',
  'YearRange'
]

exports.getNews = function getNews (symbol) {
  const url = `https://feeds.Finance.yahoo.com/rss/2.0/headline?s=${symbol}&region=US&lang=en-US`
  console.log(url)
  return fetch(url)  // eslint-disable-line no-undef
    .then(response => response.text())
    .catch(err => console.error(err))
}

exports.symbolSuggest = function symbolSuggest (query, year) {
  const url = `http://d.yimg.com/aq/autoc?query=${query}&region=US&lang=en-US&callback=YAHOO.util.ScriptNodeDataSource.callbacks`
  const that = this
  return fetch(url)
   .then(response => response.text())
      .then((result) => {
        result = result.replace(/(YAHOO\.util\.ScriptNodeDataSource\.callbacks\()(.*)(\);)/g, '$2')
        const parsed = JSON.parse(result)
        const symbols = parsed.ResultSet.Result.map(function (entry) { return entry.symbol })
        const companyNames = {}
        for (const entry of parsed.ResultSet.Result) {
          companyNames[entry.symbol] = entry.name
        }

        const start = 'https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?'
        const dateGTE = 'date.gte=' + year + '0105'
        const dateLT = '&date.lt=' + year + '1230'
        const tickerPart = '&ticker='
        const symbolsPart = symbols.join(',')
        const apiKey = '&api_key=Gk76mE3xGFbNcozxcY6J'

        const url = start + dateGTE + dateLT + tickerPart + symbolsPart + apiKey
        return fetch(url)
        .then(response => response.json())
          .then((result) => {
            const validFunds = new Set()
            if (!result.datatable || !result.datatable.data) return []
            for (const fund of result.datatable.data) {
              validFunds.add(fund['0'])
            }
            const dataSource = []
            for (let entry of validFunds) {
              dataSource.push({symbol: entry, company: companyNames[entry]})
            }
            let currentFundIndicator = 0
            let start = 1
            let end = 1
            const data = result.datatable.data
            let foundFund = false
            for (let i = 0; i < data.length; i++) {
              if (!foundFund && data[i]['0'] === dataSource[currentFundIndicator].symbol) {
                start = data[i]['5']
                foundFund = true
              } else if (data[i]['0'] !== dataSource[currentFundIndicator].symbol) {
                end = data[i - 1]['5']
                dataSource[currentFundIndicator].lastYearReturn = end / start * 100
                currentFundIndicator++
                foundFund = false
              }
            }
            if (foundFund) {
              end = data[data.length - 1]['5']
              dataSource[currentFundIndicator].lastYearReturn = end / start * 100
            }
            return dataSource
          })
        .catch(err => console.error(err))
      })
  .catch(err => console.error(err))
}

exports.getResults = function getResults (year, fund1, fund2) {
  const start = 'https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?'
  const dateGTE = 'date.gte=' + year + '0101'
  const dateLT = '&date.lt=' + year + '1230'
  const tickerPart = '&ticker='
  const symbolsPart = fund1 + ',' + fund2
  const apiKey = '&api_key=Gk76mE3xGFbNcozxcY6J'

  const url = start + dateGTE + dateLT + tickerPart + symbolsPart + apiKey
  return fetch(url)
        .then(response => response.text())
        .then((result) => {
          const parsedResult = JSON.parse(result)
          const data = parsedResult.datatable.data
          let start1 = 1
          let end1 = 1
          let start2 = 1
          let end2 = 1
          start1 = data[0]['5']
          if (data[0]['0'] === fund1) {
            start1 = data[0]['5']
            for (let i = 0; i < data.length; i++) {
              if (data[i]['0'] === fund2) {
                end1 = data[i - 1]['5']
                start2 = data[i]['5']
                break
              }
            }
            end2 = data[data.length - 1]['5']
          } else {
            start2 = data[0]['5']
            for (let i = 0; i < data.length; i++) {
              if (data[i]['0'] === fund1) {
                end2 = data[i - 1]['5']
                start1 = data[i]['5']
                break
              }
            }
            end1 = data[data.length - 1]['5']
          }
          const fund1Change = end1 / start1
          const fund2Change = end2 / start2
          const userChange = (fund1Change + fund2Change) / 2
          const marketChange = marketData['year' + (year + 1)] / marketData['year' + year]
          let outcome = 'tie'

          if (userChange > marketChange) {
            outcome = 'win'
          } else if (userChange < marketChange) {
            outcome = 'loss'
          }
          const results = {outcome, fund1Change, fund2Change, userChange, marketChange}
          StorageHelper.handleFinish(outcome)
          return results
        })
        .catch(err => console.error(err))
}

const getValidFunds = function getValidFunds (year) {
  const validFunds = []
  for (const fund of funds) {
    if (year >= fund.startYear) {
      validFunds.push({symbol: fund.ticker, company: companyNames[fund.ticker]})
    }
  }
  return validFunds
}

const getRandomInt = function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

const getFundsAsListData = function getFundsAsListData (funds) {
  const fundsAsListData = []
  for (const fund of funds) {
  }
  return fundsAsListData
}

exports.getSuggestionFunds = function getSuggestionFunds (year) {
  const validFunds = getValidFunds(year)
  const firstRandom = getRandomInt(0, validFunds.length)
  const secondRandom = getRandomInt(0, validFunds.length)
  const thirdRandom = getRandomInt(0, validFunds.length)
  if (secondRandom === firstRandom) {
    const secondRandom = getRandomInt(0, validFunds.length)
  }
  if (thirdRandom === firstRandom || thirdRandom === secondRandom) {
    const thirdRandom = getRandomInt(0, validFunds.length)
  }
  const suggestedFunds = [validFunds[firstRandom], validFunds[secondRandom], validFunds[thirdRandom]]
  suggestedFunds.sort(function compare (a, b) {
    if (a.symbol < b.symbol) {
      return -1
    }
    if (a.symbol > b.symbol) {
      return 1
    }
    return 0
  })

  const symbols = [validFunds[firstRandom].symbol, validFunds[secondRandom].symbol, validFunds[thirdRandom].symbol]
  const start = 'https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?'
  const dateGTE = 'date.gte=' + year + '0105'
  const dateLT = '&date.lt=' + year + '1230'
  const tickerPart = '&ticker='
  const symbolsPart = symbols.join(',')
  const apiKey = '&api_key=Gk76mE3xGFbNcozxcY6J'

  const url = start + dateGTE + dateLT + tickerPart + symbolsPart + apiKey
  return fetch(url)
        .then(response => response.json())
          .then((result) => {
            let currentFundIndicator = 0
            let start = 1
            let end = 1
            const data = result.datatable.data
            let foundFund = false
            for (let i = 0; i < data.length; i++) {
              if (!foundFund && data[i]['0'] === suggestedFunds[currentFundIndicator].symbol) {
                start = data[i]['5']
                foundFund = true
              } else if (data[i]['0'] !== suggestedFunds[currentFundIndicator].symbol) {
                end = data[i - 1]['5']
                suggestedFunds[currentFundIndicator].lastYearReturn = end / start * 100
                currentFundIndicator++
                foundFund = false
              }
            }
            if (foundFund) {
              end = data[data.length - 1]['5']
              suggestedFunds[currentFundIndicator].lastYearReturn = end / start * 100
            }
            return suggestedFunds
          })
        .catch(err => console.error(err))
}

// Data source: https://wilshire.com/indexcalculator/
const marketData = {
  year1980: 1.9,
  year1981: 2.54,
  year1982: 2.44,
  year1983: 2.9,
  year1984: 3.58,
  year1985: 2.69,
  year1986: 4.89,
  year1987: 5.67,
  year1988: 5.8,
  year1989: 6.84,
  year1900: 8.84,
  year1991: 8.29,
  year1992: 11.13,
  year1993: 12.13,
  year1994: 13.5,
  year1995: 13.49,
  year1996: 18.4,
  year1997: 22.31,
  year1998: 29.29,
  year1999: 37.37,
  year2000: 44.67,
  year2001: 38.46,
  year2002: 35.58,
  year2003: 28.91,
  year2004: 36.84,
  year2005: 41.58,
  year2006: 44.20,
  year2007: 51.19,
  year2008: 53.41,
  year2009: 34.98,
  year2010: 44.86,
  year2011: 51.77,
  year2012: 52.08,
  year2013: 61.96,
  year2014: 80.38,
  year2015: 90.81,
  year2016: 89.23
}

const funds = [
  {ticker: 'AAPL', startYear: 1981},
  {ticker: 'MSFT', startYear: 1987},
  {ticker: 'AMZN', startYear: 1998},
  {ticker: 'DIS', startYear: 1963},
  {ticker: 'FB', startYear: 2013},
  {ticker: 'CMCSA', startYear: 1989},
  {ticker: 'TWX', startYear: 1993},
  {ticker: 'NWSA', startYear: 2014},
  {ticker: 'GOOG', startYear: 2015},
  {ticker: 'F', startYear: 1973},
  {ticker: 'AMD', startYear: 1984},
  {ticker: 'INTC', startYear: 1981},
  {ticker: 'NVDA', startYear: 2000},
  {ticker: 'GE', startYear: 1963},
  {ticker: 'JPM', startYear: 1984},
  {ticker: 'XOM', startYear: 1971},
  {ticker: 'CVX', startYear: 1971},
  {ticker: 'IBM', startYear: 1962},
  {ticker: 'BRK_A', startYear: 1981},
  {ticker: 'PG', startYear: 1971},
  {ticker: 'JNJ', startYear: 1971},
  {ticker: 'KO', startYear: 1963}]

const companyNames = {
  AAPL: 'Apple Inc.',
  MSFT: 'Microsoft Corporation',
  AMZN: 'Amazon.com, Inc.',
  DIS: 'The Walt Disney Company',
  FB: 'Facebook, Inc.',
  CMCSA: 'Comcast Corporation',
  TWX: 'Time Warner Inc.',
  NWSA: 'News Corporation',
  GOOG: 'Alphabet Inc.',
  F: 'The Ford Motor Company',
  AMD: 'Advanced Micro Devices, Inc.',
  INTC: 'Intel Corporation',
  NVDA: 'Nvidia Corporation',
  GE: 'General Electric Co.',
  JPM: 'JPMorgan Chase & Co.',
  XOM: 'Exxon Mobil Corporation',
  CVX: 'Chevron Corporation',
  IBM: 'International Business Machines',
  BRK_A: 'Berkshire Hathaway Inc.',
  PG: 'Procter & Gamble Co.',
  JNJ: 'Johnson & Johnson',
  KO: 'The Coca-Cola Company'
}
