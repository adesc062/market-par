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
    fontSize: 25,
    marginBottom: 5,
    textAlign: 'center'
  },
  subtitle: {
    color: 'white',
    marginLeft: 15,
    marginBottom: 7,
    fontSize: 20
  },
  text: {
    color: 'white',
    marginLeft: 15,
    fontSize: 16
  },
  indentedText: {
    color: 'white',
    marginLeft: 30,
    fontSize: 16
  }
})
