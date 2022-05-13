import { Text, StyleSheet } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

const RecentExpenses = () => {
  return (
    <ExpensesOutput expensesPeroid="Last 7 Days" />
  );
}
 
export default RecentExpenses;

const styles  = StyleSheet.create({


});