import { View, Text } from 'react-native';

const ExpensesSummary = ({expenses, periodName}) => {

  const expensesSum = expenses.reduce((sum, expense)=>{
    return sum + expense.amount // Next Val = Current Val + expense.amount
  }, 0);  // Initial Value = 0; 

  return (  
    <View>
      <Text>{periodName}</Text>
      <Text>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}
 
export default ExpensesSummary;