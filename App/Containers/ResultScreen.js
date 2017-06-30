import React from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Button, Text as NBText } from 'native-base'
import { Images } from '../Themes'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/LaunchScreenStyles'

class ResultScreen extends React.Component {
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
    const { year, fund1, fund2, fund1Change, fund2Change } = this.props;
    const message1 = this.getMessage(fund1, fund1Change);
    const message2 = this.getMessage(fund2, fund2Change);
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.section} >
            <Text style={styles.sectionText}>
              {"This is the result screen."}
            </Text>
            <Text style={styles.sectionText}>
                  {this.props.outcome}
             </Text>
             <Text style={styles.sectionText}>
                  {message1}
             </Text>
             <Text style={styles.sectionText}>
                  {message2}
             </Text>
          </View>
          <Button style={{alignSelf: 'center'}} onPress={()=> this.context.drawer.open()}>
            <NBText>Explore!</NBText>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen)
