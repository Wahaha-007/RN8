import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2022-01-05'),
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2021-12-01'),
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-02-19'),
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2022-02-18'),
  },
];


// ******* Planning for Global variable here :) ********

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({description, amout, date})=> {},
  deleteExpense: (id) => {},
  updateExpense: (id, {description, amout, date})=> {},
});

// state is an 'Array of Object'
// action.payload is 'Object'

function expensesReducer(state, action) {
  switch(action.type) {
    case 'ADD':
        //const id  = uuidv4();
        const id = new Date().toString() + Math.random().toString();
        return [{...action.payload, id: id}, ...state]

    case 'UPDATE':

      // 1.Get position in old Array (current state)
        const updatableExpenseIndex = state.findIndex(
          (item)=>{item.id === action.payload.id})              

      // 2.Get old Object from Array
        const updatableExpense = state[updatableExpenseIndex];  
        
      // 3.New Object copied from Old Object data + New data                                                          
        const updatedItem = { ...updatableExpense, ...action.payload.data }; 

      // 4.New Array copied from Old Array
        const updatedExpenses = [...state];
        
      // 5.New Array merge with New Object
        updatedExpenses[updatableExpenseIndex] = updatedItem;   

        return updatedExpenses;  

    case 'DELETE':
        return state.filter((item) => item.id !== action.payload);     
          
    default:
        return state;
  }
}

const ExpenseContextProvider = ({children}) => {

  const [expenesesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);  

  const addExpense = (expenseData) => {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  const deleteExpense =(id) => {
    dispatch({ type: 'DELETE', payload: id });
  }

  const updateExpense = (id, expenseData) => {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData }})
  }

  const value = {
    expenses: expenesesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}
 
export default ExpenseContextProvider;