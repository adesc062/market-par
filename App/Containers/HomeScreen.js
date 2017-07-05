import React from 'react'
import { ScrollView, Text, Image, View, Modal, TouchableHighlight, ListView } from 'react-native'
import { Button, Text as NBText, NBIcon } from 'native-base'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import LoginActions from '../Redux/LoginRedux'
import Icon from 'react-native-vector-icons/MaterialIcons'

// Styles
import styles from './Styles/HomeScreenStyles'

class HomeScreen extends React.Component {

  constructor () {
    super()
    // const yearsX = {1980, 2015};
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
    NavigationActions.loginScreen()
  }

  setModalVisible (visible) {
    this.setState({modalVisible: visible})
  }

  onYearSelect = (year) => {
    this.props.selectYear(year)
    NavigationActions.loginScreen()
  }
  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.marketParLogoWhite} style={styles.logo} />
          </View>
          <Button primary rounded style={{alignSelf: 'center', width: 150, justifyContent: 'center', marginBottom: 5}} onPress={this.handlePressRandomYear}>
            <NBText>Random Year</NBText>
          </Button>
          <Button transparent style={{alignSelf: 'center', width: 150, justifyContent: 'center', marginBottom: 5}} onPress={() => { this.setModalVisible(true) }}>
            <NBText>Choose Year</NBText>
          </Button>
          <Button transparent style={{alignSelf: 'center', width: 150, justifyContent: 'center', marginBottom: 5}} onPress={() => { NavigationActions.statisticsScreen() }}>
            <NBText>Help & Stats</NBText>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
