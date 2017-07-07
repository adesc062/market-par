import React from 'react'
import { ScrollView, Text, Image, View, Modal, TouchableHighlight, ListView } from 'react-native'
import { Button, Text as NBText } from 'native-base'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import LoginActions from '../Redux/LoginRedux'
import Icon from 'react-native-vector-icons/MaterialIcons'

// Styles
import styles from './Styles/ResultScreenStyles'

class ResultScreen extends React.Component {

  constructor () {
    super()
    const years = []
    for (let i = 1980; i < 2016; i++) {
      years.push(i)
    }
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      modalVisible: false,
      dataSource: ds.cloneWithRows(years)
    }
  }

  handlePressRandomYear = () => {
    this.props.randomizeYear()
    NavigationActions.pop()
    NavigationActions.loginScreen()
  }

  setModalVisible (visible) {
    this.setState({modalVisible: visible})
  }

  onYearSelect = (year) => {
    this.props.selectYear(year)
    NavigationActions.pop(15)
    NavigationActions.loginScreen()
  }

  getMessage (symbol, change) {
    let message = ''
    if (change < 1) {
      message = symbol + ' went down by ' + ((1 - change) * 100).toFixed(2) + '%'
    } else if (change > 1) {
      message = symbol + ' went up by ' + ((change - 1) * 100).toFixed(2) + '%'
    } else {
      message = +' did not change'
    }
    return message
  }
  render () {
    const { outcome, year, fund1, fund2, fund1Change, fund2Change, userChange, marketChange } = this.props
    const message1 = this.getMessage(fund1, fund1Change)
    const message2 = this.getMessage(fund2, fund2Change)
    const messageUser = this.getMessage('Overall, you', userChange)
    const messageMarket = this.getMessage('The market', marketChange)
    const advantage = userChange - marketChange
    const advantageString = Math.abs(((userChange - marketChange) * 100)).toFixed(2)
    let outcomeMessage = ''
    let outcomeColor = 'white'
    if (outcome === 'win') {
      outcomeMessage = 'Win!'
      outcomeColor = '#00ff00'
    } else if (outcome === 'loss') {
      outcomeMessage = 'Loss'
      outcomeColor = 'red'
    } else if (outcome === 'tie') {
      outcomeMessage = 'Tie'
    } else {
      console.log('Invalid outcome')
    }
    let advantageMessage = ''
    if (outcome === 'win') {
      advantageMessage = 'You came ' + advantageString + ' percentage points higher!'
    } else if (outcome === 'loss') {
      advantageMessage = 'You came ' + advantageString + ' percentage points under'
    }
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered} >
            <NBText style={{fontSize: 25, margin: 50, color: outcomeColor}}>
              Outcome — {outcomeMessage}
            </NBText>
            <NBText style={{color: 'white', margin: 3}}>
              {message1}
            </NBText>
            <NBText style={{color: 'white', margin: 3}}>
              {message2}
            </NBText>
            <NBText style={{color: 'white', margin: 3}}>
              {messageUser}
            </NBText>
            <NBText style={{color: 'white', margin: 3}}>
              {messageMarket}
            </NBText>
            <NBText style={{color: 'white', margin: 3, color: outcomeColor, marginBottom: 80}}>
              {advantageMessage}
            </NBText>
          </View>
          <Button rounded style={{alignSelf: 'center'}} onPress={this.handlePressRandomYear} >
            <NBText>Random Year</NBText>
          </Button>
          <Button transparent style={{alignSelf: 'center'}} onPress={() => { this.setModalVisible(true) }}>
            <NBText>Choose Year</NBText>
          </Button>
          <Button transparent style={{alignSelf: 'center'}} onPress={() => NavigationActions.homeScreen()}>
            <NBText>Home</NBText>
          </Button>
        </ScrollView>

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setModalVisible(!this.state.modalVisible) }}
                  >
          <View style={styles.container}>

            <View style={styles.triContainer}>
              <View style={styles.leftContainer}>
                <Text style={[styles.text, {textAlign: 'left'}]} />
              </View>
              <Text style={{fontSize: 24, color: 'white'}}>Choose Year</Text>
              <View style={styles.rightContainer}>
                <Icon style={{marginRight: 15}} name='cancel' size={35} color='white' onPress={() => { this.setModalVisible(!this.state.modalVisible) }} />
              </View>
            </View>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <View><Text style={{fontSize: 20, alignSelf: 'center', color: 'white'}}onPress={() => this.onYearSelect(rowData)}>{rowData}</Text></View>}
                    />
          </View>
        </Modal>
      </View>
    )
  }
}

ResultScreen.contextTypes = {
  drawer: React.PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    year: state.login.year,
    fetching: state.login.fetching,
    fund1: state.login.fund1,
    fund2: state.login.fund2
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    randomizeYear: () => dispatch(LoginActions.randomizeYear()),
    selectYear: (year) => dispatch(LoginActions.selectYear(year))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen)
