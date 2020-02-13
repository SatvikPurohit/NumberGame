import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = props => {
  const { style, ...rest } = props;
  return (
    <TextInput style={{ ...styles.input, ...style }} {...rest} />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomWidth: 1,
    marginVertical: 10,
    borderBottomColor: 'grey'
  }
});

export default Input;
