import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Alert, Dimensions, ScrollView } from 'react-native';
import { ScreenOrientation } from "expo";

import { Ionicons } from "@expo/vector-icons";

import Number from "../components/Number";
import Card from "../components/Card";
import MainButton from "../components/MainButton";

import defaultStyles from "../constants/defaultStyles";

const LOWER = "LOWER";
const GREATER = "GREATER";
const DEFAULT_GUESS_ROUNDS = 0;

/**
 *
 *
 * @param {*} min 1
 * @param {*} max 100
 * @param {*} exclude = current number as app should never guess in 1st attempt
 * @returns
 */
const getRanadomBetween = (min, max, exclude) => {
  /*
  floor lower value
  ceil Higher value
  */
  min = Math.ceil(min);
  max = Math.floor(max);
  /* Math.random() : retruns 0 to 1 , including 0 but not 1
     So , + min is mandatory as 0 * anything
     max - min : number between max and min
  */
  const randomNum = Math.floor(Math.random() * (max - min)) + min;
  if (randomNum === exclude)
    return getRanadomBetween(min, max, exclude);
  else
    return randomNum;
};


const ListItem = ({ attempt, guess }) =>
  <View style={styles.listItem}>
    <Text>{`#${attempt}`}</Text>
    <Text>{guess}</Text>
  </View>

/**
 * ScreenOrientation or Platform
 *
 *  @param {*} props
 * @returns
 */
const GameScreen = props => {
  // Lock Orientation for this screen
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)

  const initGuess = getRanadomBetween(1, 100, userChoice);
  const { userChoice, gameOver } = props;
  const [currentGuess, setCurrentGuess] = useState(initGuess);
  // const [rounds, setRounds] = useState(DEFAULT_GUESS_ROUNDS);
  const [pastGuesses, setPastGuesses] = useState([initGuess]);
  const [width, setWidth] = useState(Dimensions.get('window').width)
  const [height, setHeight] = useState(Dimensions.get('window').height)

  /* survive re-rendering, takes last value set */
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  /* only takes effect after [vals...val-n] changed */
  useEffect(() => {
    if (currentGuess === userChoice) {
      gameOver(pastGuesses.length);
    }

    const updateLayoutOnOrientationChange = () => {
      setWidth(Dimensions.get('window').width);
      setHeight(Dimensions.get('window').height);
    }
    Dimensions.addEventListener("change", updateLayoutOnOrientationChange);

    return () => {
      Dimensions.removeEventListener("change", updateLayoutOnOrientationChange);
    }
  }, [currentGuess, userChoice, gameOver, width, height]);

  const nextGuessHandler = direction => {
    if ((direction === LOWER && currentGuess < userChoice) ||
      (direction === GREATER && currentGuess > userChoice)) {
      Alert.alert(`Don't lie`, `You know that this is wrong`,
        [{ text: "Sorry!", style: "Cancel" }]);

      return;
    };

    if (direction === LOWER)
      currentHigh.current = currentGuess;
    else /* ?? */
      currentLow.current = currentGuess + 1;

    const next = getRanadomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess);

    setCurrentGuess(next);
    // setRounds(rounds => (rounds + 1))
    setPastGuesses(curPastGuess => [...curPastGuess, next])
  };

  let listContainerStyle = styles.listContainerBig;
  if (width < 350) {
    listContainerStyle = styles.listContainer;
  }

  if (height < 500) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={defaultStyles.title}>Opponent's Guess</Text>
        <Card style={styles.buttonContainer}>
          <MainButton onPress={() => nextGuessHandler(LOWER)}>
            {/* <Ionicons name="md-arrow-round-down" size={20} color="white" /> */}
            <Ionicons name="md-remove" size={20} color="white" />
          </MainButton>
          <Number number={currentGuess} />
          <MainButton onPress={() => nextGuessHandler(GREATER)} >
            {/* <Ionicons name="md-arrow-round-up" size={20} color="white" /> */}
            <Ionicons name="md-add" size={20} color="white" />
          </MainButton>
        </Card>
        <FlatList
          data={pastGuesses}
          renderItem={
            ({ item, index, separators }) =>
              <ListItem attempt={index} guess={item} />
          }
          keyExtractor={item => `${item}`}
          style={{ ...styles.list, ...listContainerStyle }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={defaultStyles.title}>Opponent's Guess</Text>
      <Number number={currentGuess} />

      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler(LOWER)}>
          {/* <Ionicons name="md-arrow-round-down" size={20} color="white" /> */}
          <Ionicons name="md-remove" size={20} color="white" />
        </MainButton>
        <MainButton onPress={() => nextGuessHandler(GREATER)} >
          {/* <Ionicons name="md-arrow-round-up" size={20} color="white" /> */}
          <Ionicons name="md-add" size={20} color="white" />
        </MainButton>
      </Card>

      <FlatList
        data={pastGuesses}
        renderItem={
          ({ item, index, separators }) =>
            <ListItem attempt={index} guess={item} />
        }
        keyExtractor={item => `${item}`}
        style={{ ...styles.list, ...listContainerStyle }}
      />
    </SafeAreaView>
  );
};

/*
* Dimensions.get('window'): Actual part where UI resides for android and ios.
*
* style prop : Scroll view or Flat list (scrollable) "alignItems" "justifyContent" not working
* with style prop , use contentContainer instead but,
* contentContainer prop : for contentContainer "width" will not work
*/
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 300,
    maxWidth: '80%',
    paddingVertical: 10
  },
  list: {
    marginHorizontal: 5
  },
  listContainer: {
    width: '50%'
  },
  listContainerBig: {
    width: '75%'
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});

export default GameScreen;
