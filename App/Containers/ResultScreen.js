import React from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Button, Text as NBText } from 'native-base'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import LoginActions from '../Redux/LoginRedux'

// Styles
import styles from './Styles/ResultScreenStyles'

class ResultScreen extends React.Component {

  handlePressRandomYear = () => {
    this.props.randomizeYear();
    NavigationActions.pop();
    NavigationActions.loginScreen();
  }

  getMessage(symbol, change) {
    let message = '';
      if (change < 1) {
        message = symbol + ' went down by ' + ((1 - change) * 100).toFixed(2) + '%';
      }
      else if (change > 1) {
        message = symbol + ' went up by ' + ((change - 1) * 100).toFixed(2) + '%';
      }
      else {
        message =  + ' did not change';
      }
      return message;
  }
  render () {
    const { outcome, year, fund1, fund2, fund1Change, fund2Change, userChange, marketChange } = this.props;
    const message1 = this.getMessage(fund1, fund1Change);
    const message2 = this.getMessage(fund2, fund2Change);
    const messageUser = this.getMessage('Overall, you', userChange);
    const messageMarket = this.getMessage('The market', marketChange);
    let outcomeMessage = '';
    if (outcome === 'win') {
      outcomeMessage = 'Win';
    }
    else if (outcome === 'loss') {
      outcomeMessage = 'Loss';
    }
    else if (outcome === 'tie') {
      outcomeMessage = 'Tie';
    }
    else {
      console.log('Invalid outcome');
    }
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered} >
            <NBText style={{fontSize: 25, margin: 50, color: 'white'}}>
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
              <NBText style={{color: 'white', margin: 3, marginBottom: 80}}>
                  {messageMarket}
             </NBText>
          </View>
          <Button rounded style={{alignSelf: 'center'}} onPress={this.handlePressRandomYear} >
            <NBText>Random Year</NBText>
          </Button>
          <Button transparent style={{alignSelf: 'center'}} onPress={this.handlePressRandomYear}>
              <NBText>Choose Year</NBText>
          </Button>
          <Button transparent style={{alignSelf: 'center'}} onPress={() => NavigationActions.homeScreen()}>
              <NBText>Home</NBText>
          </Button>
        </ScrollView>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen)
