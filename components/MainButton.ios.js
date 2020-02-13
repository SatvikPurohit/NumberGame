import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { PRIMARY_COLOR } from "../constants/style";

{/* <Button  {...rest} /> */ }
/**
 * Only capital character variables could be used as JSX element
 *
 * @param {*} props
 * @returns
 */
const MainButton = props => {
  const { style, children, onPress, ...rest } = props;
  // Opacity effect for IOS
  return (
    <TouchableOpacity onPress={() => onPress()} activeOpacity={0.6}>
      <View style={{ ...styles.button, ...style }}>
        <Text style={styles.buttonText}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 30
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18
  }
});

export default MainButton;
