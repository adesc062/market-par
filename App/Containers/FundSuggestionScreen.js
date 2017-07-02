import React from 'react'
import { ScrollView, Text, Image, View, StyleSheet, TextInput, TouchableHighlight, ListView } from 'react-native'
import { Button, Text as NBText } from 'native-base'
import { Images } from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'
import finance from '../Utils/finance';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StockCell from './FundSuggestionComponents/StockCell';
import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux'

// Styles
  import styles from './Styles/FundSelectionScreenStyles'

class FundSuggestionScreen extends React.Component {
constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows([{symbol: 'AAPL', company: 'Apple Inc.'}, {symbol: 'MSFT', company: 'Microsoft Corporation'}, {symbol: 'DIS', company: 'The Walt Disney Company'}]),
      loaded: false,
      text: props['fundx' + props.fundNumber],
      helpText: 'Type a company name or stock symbol.',
    };
    this.onFundSelection = this.onFundSelection.bind(this);
  }

  onTyping(text) {
    this.setState({
      text: text.text || '',
      helpText: 'Validating symbol...',
    });

    const that = this;
    finance.symbolSuggest(text.text, this.props.year)
    .then((result) => {
        const dataSource = [];
        for (let entry of result) {
          dataSource.push( {symbol: entry} );
        }
        that.setState({
          dataSource: that.state.dataSource.cloneWithRows(dataSource),
          loaded: true,
          helpText: 'Type a company name or stock symbol.',
        });
     })
     .catch((error) => {
             console.log('Request failed', error);
     });
  }

  onFundSelection (symbol) {
    if (this.props.fundNumber === 1)
      this.props.changeFund1Dispatch(symbol);
    else
      this.props.changeFund2Dispatch(symbol);
  }

  render () {
    return (
       <View style={styles.container}>
              <Text style={[styles.helpText, {marginBottom: 30}]}>
                Select one symbol
              </Text>
              <View style={styles.suggestion}>
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={stock => <StockCell stock={stock} watchlistCache={this.state.watchlistCache} onFundSelection={this.onFundSelection} />}
                />
              </View>
            </View>
    )
  }
}

FundSuggestionScreen.contextTypes = {
  drawer: React.PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    fundx1: state.login.fund1,
    fundx2: state.login.fund2,
    year: state.login.year
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeFund1Dispatch: (fund) => dispatch(LoginActions.changeFund(fund)),
    changeFund2Dispatch: (fund) => dispatch(LoginActions.changeFund2(fund))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FundSuggestionScreen)
