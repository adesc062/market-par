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
  title: {
      color: 'white',
      fontSize: 40,
      textAlign: 'center'
    },
  text: {
    color: 'white'
  }
})
