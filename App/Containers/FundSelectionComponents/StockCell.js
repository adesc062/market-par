import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'

// 3rd party libraries
import { Actions } from 'react-native-router-flux'

// Flux
// import StockActions from '../../../actions/stock-action';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 72,
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    textAlign: 'center'
  },
  stock: {
    flex: 8,
    flexDirection: 'column'
  },
  symbol: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  symbolText: {
    fontSize: 15,
    color: 'black',
    marginLeft: 15,
    marginTop: 10,
    marginRight: 10,
    textAlign: 'center'
  },
  companyText: {
    fontSize: 15,
    color: 'black',
    marginRight: 15,
    marginTop: 10,
    marginRight: 10,
    textAlign: 'center'
  },
  marketText: {
    fontSize: 15,
    color: '#A6A6A6',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 0,
    marginRight: 10
  },
  name: {
    flex: 1
  },
  nameText: {
    fontSize: 10,
    color: 'white',
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10
  }
})

export default class StockCell extends React.Component {
  onPressAdd (symbol) {
    this.props.onFundSelection(symbol)
    console.log('_onPressAdd', symbol)
    // StockActions.addStock(symbol);
    Actions.pop()
  }

  render () {
    return (
      <TouchableHighlight onPress={() => this.onPressAdd(this.props.stock.symbol)} underlayColor='#202020'>
        <View style={styles.container}>
          <View style={styles.stock}>
            <View style={styles.symbol}>
              <Text style={styles.symbolText}>
                {this.props.stock.symbol}
              </Text>
              <Text style={styles.companyText}>
                {this.props.stock.company}
              </Text>
            </View>
            <View style={styles.symbol}>
              <Text style={styles.symbolText}>
            Last year return
                          </Text>
              <Text style={[styles.companyText, {color: this.props.stock.lastYearReturn > 100 ? 'green' : 'red'}]}>
                {this.props.stock.lastYearReturn ? this.props.stock.lastYearReturn.toFixed(2) + '%' : 'Unavailable'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

StockCell.propTypes = {
  stock: React.PropTypes.shape({
    symbol: React.PropTypes.string,
    exchDisp: React.PropTypes.string,
    name: React.PropTypes.string
  })
}

StockCell.defaultProps = {
  stock: {}
}
