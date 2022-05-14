import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpenseContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util.js/date';

const RecentExpenses = () => {

  expensesCtx = useContext(ExpenseContext);

  const recentExpenses = expensesCtx.expenses.filter((expense)=>{

    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today , 7);

    return expense.date > date7DaysAgo;
  })

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" />
  );
}
 
export default RecentExpenses;

