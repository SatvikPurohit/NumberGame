import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SECONDARY_COLOR } from "../constants/style";

const Number = props => {
  const { number } = props;
  return (
    <View style={styles.numberContainer}>
      <Text style={styles.numberText}>{number}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  numberContainer: {
    borderWidth: 2,
    borderColor: SECONDARY_COLOR,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  numberText: {
    color: SECONDARY_COLOR,
    fontSize: 22
  }
});

export default Number;
