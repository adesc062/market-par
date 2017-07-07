import { AsyncStorage } from 'react-native'

exports.handleFinish = async function handleFinish (outcome) {
  let gamesPlayed = 0
  let gamesWon = 0
  try {
    const gamesPlayedFound = await AsyncStorage.getItem('@MainStore:gamesPlayed')
    if (gamesPlayedFound !== null) {
      gamesPlayed = parseInt(gamesPlayedFound)
    }
    const gamesWonFound = await AsyncStorage.getItem('@MainStore:gamesWon')
    if (gamesWonFound !== null) {
      gamesWon = parseInt(gamesWonFound)
    }
  } catch (error) {
    console.log(error)
  }

  if (outcome === 'win') {
    try {
      await AsyncStorage.setItem('@MainStore:gamesPlayed', (gamesPlayed + 1).toString())
      await AsyncStorage.setItem('@MainStore:gamesWon', (gamesWon + 1).toString())
    } catch (error) {
    }
  } else {
    try {
      await AsyncStorage.setItem('@MainStore:gamesPlayed', (gamesPlayed + 1).toString())
      await AsyncStorage.setItem('@MainStore:gamesWon', (gamesWon).toString())
    } catch (error) {
      console.log(error)
    }
  }
}

exports.getPlayerStatistics = async function getPlayerStatistics () {
  let gamesPlayed = 0
  let gamesWon = 0
  try {
    const gamesPlayedFound = await AsyncStorage.getItem('@MainStore:gamesPlayed')
    if (gamesPlayedFound !== null) {
      gamesPlayed = parseInt(gamesPlayedFound)
    }
    const gamesWonFound = await AsyncStorage.getItem('@MainStore:gamesWon')
    if (gamesWonFound !== null) {
      gamesWon = parseInt(gamesWonFound)
    }
  } catch (error) {
    console.log(error)
  }

  return {gamesPlayed, gamesWon}
}
