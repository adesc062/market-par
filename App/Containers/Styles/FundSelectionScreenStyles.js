import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  helpText: {
    color: 'white',
    alignSelf: 'center'
  },
  centered: {
    alignItems: 'center'
  },
  topBlock: {
    flexDirection: 'row'
  },
  searchBarInput: {
    color: 'white',
    width: 200,
    textAlign: 'center',
    backgroundColor: '#FF9800',
    borderRadius: 25
  },
  innerContainer: {
    justifyContent: 'center'
  },
  searchIcon: {
    fontSize: 35,
    marginLeft: 15
  },
  triContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  rightIcon: {
    resizeMode: 'contain'
  }
})
