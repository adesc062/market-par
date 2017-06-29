import React from 'react'
import { ScrollView, Text, Image, View, StyleSheet, TextInput, TouchableHighlight, ListView } from 'react-native'
import { Button, Text as NBText } from 'native-base'
import { Images } from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'
import finance from '../Utils/finance';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StockCell from './FundSelectionComponents/StockCell';
import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux'

// Styles
//import styles from './Styles/LaunchScreenStyles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  topBlock: {
    backgroundColor: '#202020',
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  helpText: {
    color: 'white',
    fontSize: 12,
    alignSelf: 'center',
  },
  searchBar: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    paddingRight: 5,
  },
  searchBarInput: {
    flex: 4,
    flexDirection: 'column',
    height: 30,
    backgroundColor: '#424242',
    borderRadius: 4,
    color: 'white',
    paddingLeft: 10,
  },
  clearIcon: {
    paddingLeft: 2,
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#3CABDA',
  },
  cancelButton: {
    flex: 1,
    marginLeft: 4,
  },
  suggestion: {
    flex: 10,
    paddingHorizontal: 15,
  },
});

class FundSelectionScreen extends React.Component {
constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
      loaded: false,
      text: props.fund1x,
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
    finance.symbolSuggest(text.text)
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
     /*
      .then(response => response.text())
      .then((result) => {
        result = result.replace(/(YAHOO\.util\.ScriptNodeDataSource\.callbacks\()(.*)(\);)/g, '$2');
        console.log(result);
        return JSON.parse(result);
      })
      .then((json) => {
        that.setState({
          dataSource: that.state.dataSource.cloneWithRows(json.ResultSet.Result),
          loaded: true,
          helpText: 'Type a company name or stock symbol.',
        });
      })
      .catch((error) => {
        console.log('Request failed', error);
      }); */
  }

  onFundSelection (symbol) {
    this.props.changeFund1Dispatch(symbol);
  }

  render () {
    return (
       <View style={styles.container}>
              <View style={styles.topBlock}>
                <Text style={styles.helpText}>
                  {this.state.helpText}
                </Text>
                <View style={styles.searchBar}>
                  <Icon style={styles.searchIcon} name="search" size={20} color="white" />
                  <TextInput
                    style={styles.searchBarInput}
                    autoCapitalize={'characters'}
                    autoFocus={true}
                    placeholder="Search"
                    placeholderTextColor="gray"
                    onChangeText={text => this.onTyping({ text })}
                    value={this.state.text}
                  />
                  <TouchableHighlight
                    style={styles.cancelButton}
                    underlayColor="black"
                    onPress={this.onFundSelection}
                  >
                    <Text style={styles.cancelButtonText}>
                      Cancel
                    </Text>
                  </TouchableHighlight>
                </View>
              </View>

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

FundSelectionScreen.contextTypes = {
  drawer: React.PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    fund1x: state.login.fund1
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeFund1Dispatch: (fund) => dispatch(LoginActions.changeFund(fund))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FundSelectionScreen)
