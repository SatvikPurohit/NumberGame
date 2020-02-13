import React from 'react';
import { StyleSheet, View } from 'react-native';

/**
 *shadow :only on ios
 *
 * @param {*} props
 * @returns
 */
const Card = (props) => {
  const { children, style } = props;
  return (
    <View style={{ ...styles.card, ...style }}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowRadius: 5,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    elevation: 6,
    borderRadius: 10
  }
});

export default Card;
