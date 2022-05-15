import { useLayoutEffect, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpenseContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util.js/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';

function ManageExpense({ route, navigation }) {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const expensesCtx = useContext(ExpenseContext);
  const selectedExpense = expensesCtx.expenses.find(item=>item.id === editedExpenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense - please try again later!');
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();    // Equal to closing the modal
  }

  async function confirmHandler(expenseData) {

    setIsSubmitting(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not save data - please try again later!');
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />
  }


  /* mode == flat => without backgrund color */
  return (
    <View style={styles.container}>

      <ExpenseForm 
        submitButtonLabel={isEditing ? "Update" : "Add"} 
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>

      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});