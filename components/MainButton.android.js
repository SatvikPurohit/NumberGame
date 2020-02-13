import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TouchableNativeFeedback,
  Platform
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
  // Opacity effect for IOS or version < 21 of android
  let ButtonComponent = TouchableOpacity;

  if (Platform.Version >= 21) {
    // Ripple effect for Android
    ButtonComponent = TouchableNativeFeedback;
  };

  const { style, children, onPress, ...rest } = props;
  return (
    /* Work arround for ripple effect */
    <View style={styles.container}>
      <ButtonComponent onPress={() => onPress()} activeOpacity={0.6}>
        <View style={{ ...styles.button, ...style }}>
          <Text style={styles.buttonText}>
            {children}
          </Text>
        </View>
      </ButtonComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    overflow: 'hidden'
  },
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
