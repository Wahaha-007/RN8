import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util.js/date';

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {

  // Reemember every input (even from decimal-pad) is a string
  const [inputValues, setInputValues] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : '', // Don't forget toString()
    date: defaultValues ? getFormattedDate(defaultValues.date) : getFormattedDate(new Date()), // '',
    description: defaultValues ? defaultValues.description : '',
  });

  function inputChangedHandler(inputIdentifier, enteredValue) { 
    setInputValues((prev)=>{
      return {
        ...prev,
        [inputIdentifier]: enteredValue,      // Seemed familiar to me :)
      }
    });
  }

  function submitHandler() {            // Pre-conditioned input value
    const expenseData = {
      amount: +inputValues.amount,      // Convert String to Value !
      date: new Date(inputValues.date), // Convert to Date datatype
      description: inputValues.description
    }; 

    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput} // Flex: 1
          label="Amount"
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this,'amount'), // Fixed 1st param
            value: inputValues.amount,
          }}
        />
        <Input
          style={styles.rowInput} // Flex: 1
          label="Date"
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            keyboardType: 'decimal-pad',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this,'date'), // Fixed 1st param 
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
          onChangeText: inputChangedHandler.bind(this,'description'), // Fixed 1st param 
          value: inputValues.description,
        }}
      />

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
});