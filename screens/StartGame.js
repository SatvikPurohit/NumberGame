import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, Keyboard, Alert, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';

import { SECONDARY_COLOR, PRIMARY_COLOR } from "../constants/style";
import defaultStyles from "../constants/defaultStyles";

import Number from "../components/Number";
import Card from "../components/Card";
import Input from "../components/Input";
import MainButton from "../components/MainButton";

/**
 * numeric = with decimal
 * number-pad = non-decimal for ios but decimal for android
 *
 * ScrollView : For orientation change
 *
 * KeyboardAvoidingView : with "behavior" so that Keyboard doesn't block
 * aur screen
 * behavior : padding for android and position for ios
 *
 * Dimensions : only calculates when app starts
 *
 * TouchableWithoutFeedback : close keyboard without effect,
 * on touch
 * @param {*} props
 * @returns
 */
const StartGame = props => {
  const { startGameHandler } = props;
  /* onChange */
  const [number, setNumber] = useState('');
  const [confirm, isConfirmed] = useState(false);
  /* after Typed number has been confirmed */
  const [confirmedNumber, setConfirmedNumber] = useState(false);
  /* for orientation change change button widths */
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

  useEffect(() => {
    const updateLayoutOnOrientationChange = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    }
    Dimensions.addEventListener("change", updateLayoutOnOrientationChange);

    return () => {
      Dimensions.removeEventListener("change", updateLayoutOnOrientationChange);
    }
  }, []);

  const numChangeHandler = number => {
    // const { nativeEvent: { text } } = event;
    setNumber(number.replace(/[^0-9]/g, ''));
  };

  const numResetHandler = () => {
    setNumber('')
  }

  const confirmClickHandler = () => {
    const confirmedNumber = parseInt(number);
    if (isNaN(confirmedNumber) || confirmedNumber < 0 || confirmedNumber > 99) {
      Alert.alert(
        'Invalid Number',
        "Number should be between 1 to 99",
        [{ text: "Okay", style: "destructive", onPress: numResetHandler }]);
      return;
    }
    isConfirmed(true);
    setConfirmedNumber(confirmedNumber);
    numResetHandler();
    Keyboard.dismiss()
  };

  let confirmJSX;
  if (confirm)
    confirmJSX =
      (<Card style={styles.confirmationCard}>
        <Text style={styles.confirmationMessage}>{`Chosen Number is`}</Text>
        <Number number={confirmedNumber} />
        <MainButton
          onPress={() => startGameHandler(confirmedNumber)}>
          {"Start Game"}
        </MainButton>
      </Card >);

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
          <View style={styles.screen}>
            {/*  <Text>{Dimensions.get('window').width / 4}</Text> */}
            <Text
              style={{ ...styles.title, ...defaultStyles.title }}>
              Start a New Game
          </Text>
            <Card style={styles.inputContainer}>
              <Text>Select a Number</Text>
              <Input
                style={styles.input}
                onChangeText={(txt) => numChangeHandler(txt)}
                keyboardType="number-pad"
                autoCorrect={false}
                autoCapitalize="none"
                maxLength={2}
                value={number}
              />
              <View style={styles.buttonContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Reset"
                    onPress={numResetHandler}
                    color={SECONDARY_COLOR}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Confirm"
                    onPress={confirmClickHandler}
                    color={PRIMARY_COLOR}
                  />
                </View>
              </View>
            </Card>
            {confirmJSX}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView >
    </ScrollView >
  );
};

/*
 inputContainer : min and max width along with width property
* max-width property in CSS is used to set the maximum width of a specified element. The max-width property overrides the width property, but
* min-width will always override max-width whether followed before or after width in your declaration

* Dimensions.get('window'): Actual part where UI resides for android and ios
*/
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  inputContainer: {
    width: '80%',
    maxWidth: '95%',
    minWidth: 300,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  button: {
    width: Dimensions.get('window').width / 4
  },
  input: {
    width: 50,
    textAlign: "center"
  },
  confirmationCard: {
    padding: 10,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default StartGame;
