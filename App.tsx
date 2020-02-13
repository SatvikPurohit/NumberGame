import React, { useState } from 'react';
import * as Font from "expo-font";
import { AppLoading } from "expo";

import { StyleSheet, View } from 'react-native';
import Header from "./components/Header";
import StartGame from "./screens/StartGame";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const DEFAULT_GUESS_ROUNDS = 0;

/**
 * Function which loads fonts and returns promise
 *
 */
const fetchFonts = () =>
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-italic': require('./assets/fonts/OpenSans-Italic.ttf'),
    'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf')
  })


/**
 * app.json : default for both orientation
 *
 * @export
 * @returns
 */
export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [guessRounds, setGuessRounds] = useState(DEFAULT_GUESS_ROUNDS);
  const [dataLoaded, setDataLoading] = useState(false);

  if (!dataLoaded) {
    /*
    For loading assets , before app loads :
    Load nothing until initial dependenceies get loaded
    */
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setDataLoading(true)}
      onError={(err) => console.log(err)}
    />
  }
  /**
   * set user selected number
   *
   * @param {*} selectedNumber
   */
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(DEFAULT_GUESS_ROUNDS);
  }

  const configNewGameHandler = () => {
    setGuessRounds(DEFAULT_GUESS_ROUNDS);
    setUserNumber(null)
  }

  /**
   * set user selected number
   *
   * @param {*} rounds
   */
  const gameOverHandler = (rounds) => {
    setGuessRounds(rounds);
  }

  /*
     no selected value initially so, start game else
     Predict number
  */
  let content = <StartGame startGameHandler={startGameHandler} />;
  if (userNumber && (guessRounds <= DEFAULT_GUESS_ROUNDS))
    content = <GameScreen
      userChoice={userNumber}
      gameOver={gameOverHandler}
    />
  else if (guessRounds > DEFAULT_GUESS_ROUNDS)
    content = <GameOverScreen
      roundNumber={guessRounds}
      userChoice={userNumber}
      newGameHandler={configNewGameHandler} />


  return (
    <View style={styles.container}>
      <Header />
      {content}
    </View>
  );
}

/*
* For text components nesting css inheritance would work ,
* for others it won't
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
