import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors} from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain',
    marginBottom: 100
  },
  centered: {
    alignItems: 'center'
  },
  modelView: {
    justifyContent: 'center'
  },
    triContainer: {
      height: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    leftContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    rightContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    rightIcon: {
      resizeMode: 'contain',
    }
})
