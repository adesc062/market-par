import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyles'
import NavigationDrawer from './NavigationDrawer'

// screens identified by the router
import LaunchScreen from '../Containers/LaunchScreen'
import FundSelectionScreen from '../Containers/FundSelectionScreen'
import ListviewExample from '../Containers/ListviewExample'
import CardExample from '../Containers/CardExample'
import Login from '../Containers/LoginScreen'
import ResultScreen from '../Containers/ResultScreen'
import HomeScreen from '../Containers/HomeScreen'
import FundSuggestionScreen from '../Containers/FundSuggestionScreen'
import StatisticsScreen from '../Containers/StatisticsScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='loginScreen' component={Login} title='Login' />
          <Scene key='launchScreen' component={LaunchScreen} title='LaunchScreen' />
          <Scene key='listViewExample' component={ListviewExample} />
          <Scene key='cardExample' component={CardExample} />
          <Scene key='fundSelectionScreen' component={FundSelectionScreen} title='Fund Selection Screen' />
          <Scene key='fundSuggestionScreen' component={FundSuggestionScreen} title='Fund Suggestion Screen' />
          <Scene key='resultScreen' component={ResultScreen} title='Result Screen' />
          <Scene initial key='homeScreen' component={HomeScreen} title='Home Screen' />
          <Scene key='statisticsScreen' component={StatisticsScreen} title='Statistics Screen' />
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
