import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

interface Props {
  children?: React.ReactNode;
  dismissEnabled?: boolean;
  behavior?: 'padding' | 'height' | 'position';
  keyboardVerticalOffset?: number;
}

const KeyboardAvoid: React.FC<Props> = ({
  children,
  dismissEnabled = true,
  behavior,
  keyboardVerticalOffset,
}) => {
  if (!dismissEnabled) {
    return (
      <KeyboardAvoidingView
        enabled
        behavior={behavior || Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={styles.container}>
        {children}
      </KeyboardAvoidingView>
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (!dismissEnabled) {
            return;
          }
          Keyboard.dismiss();
        }}
        style={styles.container}>
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
