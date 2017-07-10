import React from 'react'
import { ScrollView, Text, Image, View, Modal, TouchableHighlight, ListView } from 'react-native'
import { Button, Text as NBText, NBIcon } from 'native-base'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import LoginActions from '../Redux/LoginRedux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Tabs from 'react-native-tabs'
import StorageHelper from '../Utils/StorageHelper'

// Styles
import styles from './Styles/StatisticsScreenStyles'
const lorem = '1. Let the game pick a random year choose yourself\n'
               + '2. Choose two different funds by either'

class StatisticsScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {page: 'help', gamesPlayed: '...', gamesWon: '...', gamesLost: '...', winPercentage: '...'}
  }

  componentWillMount () {
    StorageHelper.getPlayerStatistics()
    .then(playerStatistics => {
      const gamesPlayedNumber = parseInt(playerStatistics.gamesPlayed)
      const gamesWonNumber = parseInt(playerStatistics.gamesWon)

      this.setState({
        gamesPlayed: playerStatistics.gamesPlayed,
        gamesWon: playerStatistics.gamesWon,
        gamesLost: gamesPlayedNumber - gamesWonNumber,
        winPercentage: (gamesWonNumber / gamesPlayedNumber * 100).toFixed(2)
      })
    })
    .catch(err => console.error(err))
  }

  getTab () {
    switch (this.state.page) {
      case 'help':
        return <View>
          <Text style={styles.title}>Help</Text>
          <Text style={styles.subtitle}>
            How to play
          </Text>
          <Text style={styles.flowText}>
          1. Let the game pick a random year choose yourself{'\n'}
          2. Choose two different funds by either{'\n'}
          </Text>
          <Text style={styles.indentedText}>
          a. Pressing on “Select fund” and typing a ticker symbol or company name{'\n'}
          b. Pressing “Suggest” to be given a choice of three funds{'\n'}
          </Text>
          <Text style={styles.text}>
          3. Press finish{'\n'}
          4. View the results{'\n'}
          </Text>
          <Text style={styles.subtitle}>
           How it works
          </Text>
          <Text style={styles.text}>
          The return of each fund is calculated by diving its value at the end of the year by its value at the beginning of the year.
          These two returns are averaged to give the user return for the round.{'\n'}
          The market return is calculated the same way. The outcome of the round is determined by comparing the user return and the market return.
          </Text>
        </View>
      case 'info':
        return <View>
          <Text style={styles.title}>Information</Text>
          <Text style={styles.subtitle}>
          Where is the data coming from?
          </Text>
          <Text style={styles.text}>
          Symbol autocompletion is provided by Yahoo Finance. {'\n'}
          The historical stock prices are provided by the WIKI database hosted by Quandl.
          </Text>
          <Text style={styles.subtitle}>
          What years are available?
          </Text>
          <Text style={styles.text}>
          From 1980 to 2015 because of the availability of the data.
          </Text>
          <Text style={styles.subtitle}>
          How is the market tracked?
          </Text>
          <Text style={styles.text}>
          The market is tracked according to Wilshire 5000 (Full Cap) Total Market.
          </Text>
        </View>
       case 'statistics':
        return <View>
          <Text style={styles.title}>Statistics</Text>
          <Text style={styles.subtitleX}>Games: played: {this.state.gamesPlayed}</Text>
          <Text style={styles.subtitleX}>Games: won: {this.state.gamesWon} </Text>
          <Text style={styles.subtitleX}>Games: lost: {this.state.gamesLost} </Text>
          <Text style={styles.subtitleX}>Win percentage: {this.state.winPercentage}%</Text>
          <Text style={styles.subtitleX}>Most picked fund: AAPL</Text>
        </View>
      default :
        return <View><Text style={styles.title}>Information about MarketPar</Text><Text style={styles.text}>{lorem}</Text></View>
    }
  }

  render () {
    var self = this
    return (
      <View style={styles.container}>
        <Tabs selected={this.state.page} style={{backgroundColor: 'white'}}
          selectedStyle={{color: 'red'}} onSelect={el => this.setState({page: el.props.name})}>
          <Text name='help' selectedStyle={{color: 'blue'}} selectedIconStyle={{borderTopWidth: 2, borderTopColor: 'blue'}}>Help</Text>
          <Text name='info' selectedStyle={{color: 'blue'}} selectedIconStyle={{borderTopWidth: 2, borderTopColor: 'blue'}}>Info</Text>
          <Text name='statistics' selectedStyle={{color: 'blue'}} selectedIconStyle={{borderTopWidth: 2, borderTopColor: 'blue'}}>Statistics</Text>
        </Tabs>
        {this.getTab()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    randomizeYear: () => dispatch(LoginActions.randomizeYear()),
    selectYear: (year) => dispatch(LoginActions.selectYear(year))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsScreen)
