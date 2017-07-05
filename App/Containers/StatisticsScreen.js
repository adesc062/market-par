import React from 'react'
import { ScrollView, Text, Image, View, Modal, TouchableHighlight, ListView } from 'react-native'
import { Button, Text as NBText, NBIcon } from 'native-base'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import LoginActions from '../Redux/LoginRedux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Tabs from 'react-native-tabs'

// Styles
import styles from './Styles/StatisticsScreenStyles'
const lorem = 'Lorem ipsum dolor sit amet, sed ex quot antiopam postulant. Usu veri copiosae hendrerit at, est bonorum labores et. Sed at adolescens accommodare, qui laudem everti at, in nam nonumy evertitur.gere populo ad, est ut inani homero graeci. At hinc prodesset vituperatoribus mel, eos option corpora neglegentur cu.'
class StatisticsScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {page: 'info'}
  }

  getTab () {
    switch (this.state.page) {
      case 'help':
        return <View><Text style={styles.title}>Help</Text><Text style={styles.text}>{lorem}</Text></View>
      case 'info':
        return <View><Text style={styles.title}>Information about MarketPar</Text><Text style={styles.text}>{lorem}</Text></View>
      case 'statistics':
        return <View>
          <Text style={styles.title}>Statistics</Text>
          <Text style={styles.text}>Games: played: 25</Text>
          <Text style={styles.text}>Games: won: 10</Text>
          <Text style={styles.text}>Games: lost: 15</Text>
          <Text style={styles.text}>Win percentage: 40%</Text>
          <Text style={styles.text}>Most picked fund: AAPL</Text>
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
