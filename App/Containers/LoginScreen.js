import React, { PropTypes } from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation,
  Icon
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/LoginScreenStyles'
import {Images, Metrics} from '../Themes'
import LoginActions from '../Redux/LoginRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { Button, Text as NBText, Contant, Form, Item, Input, Label } from 'native-base'

class LoginScreen extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptLogin: PropTypes.func,
    changeFund1Dispatch: PropTypes.func
  }

  isAttempting = false
  keyboardDidShowListener = {}
  keyboardDidHideListener = {}

  constructor (props) {
    super(props)
    this.state = {
      username: 'reactnative@infinite.red',
      password: 'password',
      fund1: 'AAPL',
      fund2: 'MSFT',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth-40 }
    }
    this.isAttempting = false
    this.handleChangeFund1 = this.handleChangeFund1.bind(this);
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    // Did the login attempt complete?
    if (this.isAttempting && !newProps.fetching) {
      NavigationActions.pop()
    }
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
      topLogo: {width: 100, height: 70}
    })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: Metrics.screenWidth-40}
    })
  }

  handlePressLogin = () => {
    const { username, password } = this.state
    //this.isAttempting = true
    // attempt a login - a saga is listening to pick it up from here.
    //this.props.attemptLogin(username, password);
    NavigationActions.launchScreen();
  }

    handleFundPress = () => {
      // const { username, password } = this.state
      // this.isAttempting = true
      // attempt a login - a saga is listening to pick it up from here.
      // this.props.attemptLogin(username, password);
      NavigationActions.fundSelectionScreen();
    }

  handleChangeUsername = (text) => {
    this.setState({ username: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  handleChangeFund1 = (text) => {
    this.props.changeFund1Dispatch(text);
  }

  handleChangeFund2 = (text) => {
    this.setState({ fund2: text })
  }

  render () {
    const { username, password, fund1, fund2 } = this.state
    const { fetching, fund1x } = this.props
    const editable = !fetching
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps='always'>
       <View style={Styles.form}>
       <View style={{flex: 1, alignItems: 'center'}}>
               <NBText>
                 Year: 1990
               </NBText>
           </View>
        <Form>
          <Item stackedLabel>
            <Label>Fund #1</Label>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Input
                ref={(ref) => this.fund1 = ref}
                value={fund1x}
                editable={editable}
                keyboardType='default'
                returnKeyType='go'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.handleChangeFund1}
                underlineColorAndroid='transparent'
                onSubmitEditing={this.handlePressLogin}
                onFocus={this.handleFundPress}
                />
                <Button onPress={this.handlePressLogin}>
                  <NBText>
                    Suggest
                  </NBText>
                </Button>
            </View>

          </Item>
          <Item stackedLabel>
            <Label>Fund #2</Label>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Input
                ref={(ref) => this.fund2 = ref}
                value={fund2}
                editable={editable}
                keyboardType='default'
                returnKeyType='go'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this.handleChangeFund2}
                underlineColorAndroid='transparent'
                onFocus={this.handlePressLogin}
                />
                <Button onPress={this.handlePressLogin}>
                  <NBText>
                    Suggest
                  </NBText>
                </Button>
            </View>
          </Item>
        </Form>
          <View style={[Styles.loginRow]}>
            <Button style={{flex: 1, justifyContent: 'center'}} full onPress={this.handlePressLogin}>
              <NBText>
                Finish
              </NBText>
            </Button>
          </View>
        </View>

      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    fund1x: state.login.fund1
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
    changeFund1Dispatch: (fund) => dispatch(LoginActions.changeFund(fund))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
