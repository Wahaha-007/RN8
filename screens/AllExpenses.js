import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpenseContext } from '../store/expenses-context';

const AllExpenses = () => {

  const expensesCtx = useContext(ExpenseContext);

  return (
    <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" fallbackText="No registered expense found."/>
  );
}
 
export default AllExpenses;
