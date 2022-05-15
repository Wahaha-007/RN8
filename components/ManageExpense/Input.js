import { StyleSheet, Text, TextInput, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

const Input = ({ label, invalid, style, textInputConfig }) => {
  
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
  // if a constant is an object or array its properties or items can be updated or removed. 

  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) { 
    inputStyles.push(styles.inputMultiline)   //Result on inputContainer only, not text
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);    //Result on inputContainer only, not text
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top'
  },
  invalidLabel: {
    color: GlobalStyles.colors.error50
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50
  }
});