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
    alignSelf: 'center',
    marginBottom: 30
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
    justifyContent: 'center',
    textAlign: 'center'
  },
  searchIcon: {
    fontSize: 35,
    marginLeft: 15
  }
})
