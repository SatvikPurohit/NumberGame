import React, { } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import defaultStyles from "../constants/defaultStyles";
import { SECONDARY_COLOR, PRIMARY_COLOR } from "../constants/style";
import MainButton from "../components/MainButton";

const NEW = "Start A New Game"

/**
 * resizeMode : cover by default
 *
 * for "network images width and heigth have to be specified"
 * else , "local images react-native knows ,
 * we dont have to set as we are doing it"
 *
 * fadeDuration : 300 default
 *
 * Text :  wraps on to next line
 *
 * SafeAreaView : used for notch on screen but adds padding
 *  @param {*} props
 * @returns
 */
const GameOverScreen = props => {
  const { roundNumber, userChoice, newGameHandler } = props;
  return (
    <ScrollView>
      <SafeAreaView style={styles.screen}>
        <Text style={defaultStyles.title}>The Game is Over!</Text>

        <View style={styles.imageContainer}>
          <Image
            // resizeMode="contain"
            // source={{ uri: 'https://media1.tenor.com/images/6d46c278bc8bea36adbced41f730981d/tenor.gif' }}
            // source={require('../assets/game-over.gif')}
            source={require('../assets/success.png')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.gameSummary}>
          <Text style={defaultStyles.text}>
            Number of Rounds
        <Text style={styles.infoRound}>
              {` ${roundNumber} `}
            </Text>
            Number was
        <Text style={styles.infoNumber}>
              {` ${userChoice}`}
            </Text>
          </Text>
        </View>
        <MainButton onPress={() => newGameHandler()} > {NEW}</MainButton>
      </SafeAreaView>
    </ScrollView>
  );
}

/*
* For text components nesting css inheritance would work ,
* for others it won't
*
* Border radius half of width and height
*/
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // padding: 10,
    justifyContent: 'center',
    alignItems: "center",
    paddingVertical: 10
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: 'black',
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: Math.round(Dimensions.get('window').width * 0.7) / 2,
    marginVertical: Dimensions.get("window").height * 0.7 / 30,
    overflow: "hidden"
  },
  image: {
    width: '100%',
    height: '100%'
  },
  gameSummary: {
    textAlign: "center",
    marginVertical: Dimensions.get("window").height * 0.7 / 60,
  },
  infoNumber: {
    color: SECONDARY_COLOR
  },
  infoRound: {
    color: PRIMARY_COLOR
  }
});

export default GameOverScreen;
