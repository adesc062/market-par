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

exports.symbolSuggest = function symbolSuggest(query) {
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
        const dateGTE = 'date.gte=20150101';
        const dateLT = '&date.lt=20150130';
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
    const results = {
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
            console.log('haHAA');

            return results;
        })
        .catch(err => console.error(err));
}

/*
exports.symbolSuggest = function symbolSuggest(query) {
  const url = `http://d.yimg.com/aq/autoc?query=${query}&region=US&lang=en-US&callback=YAHOO.util.ScriptNodeDataSource.callbacks`;
  console.log(url);
  return fetch(url).catch(err => console.error(err));  // eslint-disable-line no-undef

}; */
