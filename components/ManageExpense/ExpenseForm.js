import { StyleSheet, Text, View, Alert } from 'react-native';
import { useState } from 'react';

import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util.js/date';
import { GlobalStyles } from '../../constants/styles';

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {

  // Reemember every input (even from decimal-pad) is a string
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '', // Don't forget toString()
      isValid: true, // !!defaultValues, // equal to => defaultValues ? true : false,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : getFormattedDate(new Date()), // '',
      isValid: true, // !!defaultValues,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true, // !!defaultValues,
    } 
  });

  function inputChangedHandler(inputIdentifier, enteredValue) { 
    setInputs((prev)=>{
      return {
        ...prev,
        [inputIdentifier]: { value: enteredValue, isValid: true },      // Seemed familiar to me :)
      };
    });
  }

  function submitHandler() {            // Pre-conditioned input value
    const expenseData = {
      amount: +inputs.amount.value,      // Convert String to Value !
      date: new Date(inputs.date.value), // Convert to Date datatype
      description: inputs.description.value,
    }; 

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
  !inputs.amount.isValid ||
  !inputs.date.isValid ||
  !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput} // Flex: 1
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this,'amount'), // Fixed 1st param
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput} // Flex: 1
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            keyboardType: 'decimal-pad',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this,'date'), // Fixed 1st param 
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
          onChangeText: inputChangedHandler.bind(this,'description'), // Fixed 1st param 
          value: inputs.description.value,
        }}
      />
      
      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>
      )}

      <View style={styles.buttons}> 
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
      
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center'
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error50,
    margin: 8,
  },
});