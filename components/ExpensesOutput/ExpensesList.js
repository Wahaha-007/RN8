import { FlatList } from 'react-native';

import ExpenseItem from './ExpenseItem';

function renderExpenseItem(itemData) {  // Big Overall Object

  // if we do it by hand it will be
  //  return <ExpenseItem description="" amount="" date="" />
  // which is , for 1 element
  //  return <ExpenseItem {...Object} >    // Blanket is for JS in JSX


  return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {   // Array of Objects
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;