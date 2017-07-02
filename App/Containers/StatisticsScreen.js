import React from 'react'
import { ScrollView, Text, Image, View, Modal, TouchableHighlight, ListView } from 'react-native'
import { Button, Text as NBText, NBIcon } from 'native-base'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import LoginActions from '../Redux/LoginRedux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Tabs from 'react-native-tabs';

// Styles
import styles from './Styles/StatisticsScreenStyles'

class StatisticsScreen extends React.Component {
constructor(props){
    super(props);
    this.state = {page: 'help'};
  }

  getTab() {
    switch (this.state.page) {
      case 'help':
        return <Text style={styles.text}>
                             Welcome to React Native
                         </Text>;
      case 'info':
      return <View><Text style={styles.title}>
                                   Information about MarketPar
                               </Text></View>;
      case 'statistics':
      return <Text style={styles.text}>
                                   Welcome to React Native
                               </Text>;
      default :
      return <Text style={styles.text}>
                                   Welcome to React Native
                               </Text>;

    }
  }

  render() {
    var self = this;
    return (
      <View style={styles.container}>
        <Tabs selected={this.state.page} style={{backgroundColor:'white'}}
              selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name})}>
            <Text name="help" selectedStyle={{color:'blue'}} selectedIconStyle={{borderTopWidth:2,borderTopColor:'blue'}}>Help</Text>
            <Text name="info" selectedStyle={{color:'blue'}} selectedIconStyle={{borderTopWidth:2,borderTopColor:'blue'}}>Info</Text>
            <Text name="statistics" selectedStyle={{color:'blue'}} selectedIconStyle={{borderTopWidth:2,borderTopColor:'blue'}}>Statistics</Text>
        </Tabs>
          {this.getTab()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    randomizeYear: () => dispatch(LoginActions.randomizeYear()),
    selectYear: (year) => dispatch(LoginActions.selectYear(year)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsScreen)
