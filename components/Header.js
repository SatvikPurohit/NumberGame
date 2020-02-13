import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { PRIMARY_COLOR } from "../constants/style";

/**
 * Platform.select : parameter will be an object with values for ios/android
 *
 * @param {*} props
 * @returns
 */
const Header = props => {
  const platform = Platform.OS;
  return (
    <View style={{
      ...styles.headContainer,
      // ...platform === "ios" ? styles.headerIos : styles.headerAndroid
      ...Platform.select({
        ios: styles.headerIos,
        android: styles.headerAndroid
      })
    }}>
      <Text style={styles.headerText}>Guess a number</Text>
    </View >
  );
}

const styles = StyleSheet.create({
  headContainer: {
    width: '100%',
    height: 90,
    padding: 36,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerAndroid: {
    backgroundColor: PRIMARY_COLOR,
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
  },
  headerIos: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 18,
    color: Platform.OS === "ios" ? PRIMARY_COLOR : 'white',
  }
});

export default Header;
