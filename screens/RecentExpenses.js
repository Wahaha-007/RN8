import { useContext, useState } from 'react';
import { useEffect } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { ExpenseContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util.js/date';
import { fetchExpenses } from '../util.js/http';

const RecentExpenses = () => {

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpenseContext);
  // const [fetchedExpenses, setFetchedExpenses] = useState([]);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch expenses!');
      }

      setIsFetching(false);
    }

    getExpenses();  /// useEffect function itslef cannot be async
  },[]);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {   // Just trap the sequence HERE ! code below not execute !
    return <LoadingOverlay />
  }

  const recentExpenses = expensesCtx.expenses.filter((expense)=>{

    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today , 7);

    return ((expense.date >= date7DaysAgo) && (expense.date <= today));
  })

  return (
    <ExpensesOutput 
      expenses={recentExpenses} 
      expensesPeriod="Last 7 Days" 
      fallbackText="No expense registered for the last 7 days" 
    />
  );
}
 
export default RecentExpenses;

