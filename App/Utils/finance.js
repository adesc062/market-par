exports.getStock = function getStock(opts, type) {
  const defs = {
    baseURL: 'https://query.yahooapis.com/v1/public/yql?q=',
    query: {
      quotes: 'select * from yahoo.finance.quotes where symbol in ("{stock}")',
      historicaldata: 'select * from yahoo.finance.historicaldata where symbol = "{stock}" and startDate = "{startDate}" and endDate = "{endDate}"',
    },
    suffixURL: {
      quotes: '&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys',
      historicaldata: '&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys',
    },
  };

  opts = opts || {};

  if (!opts.stock) {
    console.log('No stock defined');
    return;
  }

  if (opts.stock instanceof Array) {
    opts.stock = opts.stock.join("', '");
  }

  console.log(opts.stock);

  const query = defs.query[type]
    .replace('{stock}', opts.stock)
    .replace('{startDate}', opts.startDate)
    .replace('{endDate}', opts.endDate);

  const url = defs.baseURL + query + (defs.suffixURL[type] || '');
  console.log(url);
  return fetch(url);  // eslint-disable-line no-undef
};

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
  'YearRange',
];

exports.getNews = function getNews(symbol) {
  const url = `https://feeds.finance.yahoo.com/rss/2.0/headline?s=${symbol}&region=US&lang=en-US`;
  console.log(url);
  return fetch(url)  // eslint-disable-line no-undef
    .then(response => response.text())
    .catch(err => console.error(err));
};

exports.symbolSuggest = function symbolSuggest(query, year) {
  const url = `http://d.yimg.com/aq/autoc?query=${query}&region=US&lang=en-US&callback=YAHOO.util.ScriptNodeDataSource.callbacks`;
  console.log(url);
  const that = this;
  return fetch(url)
   .then(response => response.text())
      .then((result) => {
        result = result.replace(/(YAHOO\.util\.ScriptNodeDataSource\.callbacks\()(.*)(\);)/g, '$2');
        console.log(result);
        const parsed = JSON.parse(result)
        console.log('haha')
        const symbols = parsed.ResultSet.Result.map(function(entry) {return entry.symbol;});

        const start = 'https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?';
        const dateGTE = 'date.gte=' + year + '0101';
        const dateLT = '&date.lt=' + year + '0130';
        const tickerPart = '&ticker=';
        const symbolsPart = symbols.join(",");
        const apiKey = '&api_key=Gk76mE3xGFbNcozxcY6J';

        const url = start + dateGTE + dateLT + tickerPart + symbolsPart + apiKey;
        return fetch(url)
        .then(response => response.text())
          .then( (result) => {
            const parsedResult = JSON.parse(result);
            console.log('haHAA');

            const validFunds = new Set();
            if (!parsedResult.datatable || !parsedResult.datatable.data) return validFunds;
            for (const fund of parsedResult.datatable.data) {
              validFunds.add( fund['0'] );
            }
            return validFunds;
        })
        .catch(err => console.error(err));  // eslint-disable-line no-undef

        /*
        const promises = [];
        for (let i = 0; i < 2; i++) {
            promises.push(doAjax());
        }
        Promise.all(promises).then((results) => {
            // returned data is in arguments[0], arguments[1], ... arguments[n]
            // you can process it here
            const parsedResults = [];
            for (const entry of results) {
              parsedResults.push(JSON.parse(entry));
            }
            console.log('haHAA');
        }, function(err) {
            // error occurred
        }); */

        /*
       // const that = this;
        that.getStock({ stock: symbols, startDate: '2012-01-01', endDate: '2013-12-31' }, 'historicaldata')
          .then(response => response.json())
          .then((json) => {
            let quotes = json.query.results.quote;
            quotes = Array.isArray(quotes) ? quotes : [quotes];

            const watchlistResult = {};
            quotes.forEach((quote) => {
              watchlistResult[quote.symbol] = quote;
            });
            //store.save('watchlistResult', watchlistResult);
            //that.setState({ watchlistResult });
            console.log('haha');
          }).catch((error) => {
            console.log('Request failed', error);
            //store.get('watchlistResult')
            //.then(watchlistResult => that.setState({ watchlistResult }));
          }); */

      })
  .catch(err => console.error(err));  // eslint-disable-line no-undef
}

function getStock2() {
  const url = 'https://www.quandl.com/api/v3/datasets/WIKI/AAPL.json?column_index=4&order=asc&collapse=annual&start_date=2012-01-01&end_date=2013-12-31&api_key=Gk76mE3xGFbNcozxcY6J';
  return fetch(url);
}

function doAjax() {
    return new Promise(function(resolve, reject) {
        getStock2()
        .then(response => response.text())
        .then( (result) => {
          resolve(result);
        })
        .catch(err => reject(err));
    });
}

exports.getResults = function getResults(year, fund1, fund2) {
    const results2 = {
        outcome: 'loss',
        fund1Change: 0.7,
        fund2Change: 1.2,
        userChange: 0.95,
        marketChange: 1.1
    };

    const start = 'https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?';
    const dateGTE = 'date.gte=' + year + '0101';
    const dateLT = '&date.lt=' + year + '1230';
    const tickerPart = '&ticker=';
    const symbolsPart = fund1 + ',' + fund2;
    const apiKey = '&api_key=Gk76mE3xGFbNcozxcY6J';

    const url = start + dateGTE + dateLT + tickerPart + symbolsPart + apiKey;
    return fetch(url)
        .then(response => response.text())
        .then((result) => {
            const parsedResult = JSON.parse(result);
            const data = parsedResult.datatable.data;
            console.log('haHAA');
            let start1 = 1;
            let end1 = 1;
            let start2 = 1;
            let end2 = 1;
            start1 = data[0]['5'];
            for (let i = 0; i < data.length; i++) {
              if(data[i]['0'] === fund2) {
                end1 = data[i - 1]['5'];
                start2 = data[i]['5'];
                break;
              }
            }
            end2 = data[data.length - 1]['5'];
            const fund1Change = end1 / start1;
            const fund2Change = end2 / start2
            const userChange = (fund1Change + fund2Change) / 2;
            const marketChange = marketData['year' + (year + 1)] / marketData['year' + year];
            let outcome = 'tie';
            if (userChange > marketChange) {
              outcome = 'win';
            }
            else if (userChange < marketChange) {
              outcome = 'loss';
            }
            const results = {outcome, fund1Change, fund2Change, userChange, marketChange};
            return results;
        })
        .catch(err => console.error(err));
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
};
