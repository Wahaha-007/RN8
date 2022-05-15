import axios from 'axios';

const BACKEND_URL = 'https://react-native-course-ecc63-default-rtdb.firebaseio.com';

export const storeExpense = async (expenseData) => {

  // Author told that Firebase just wants .json at the end of the address
  // Here expense = (Segmant, Node or Folder) name
  const response = await axios.post(BACKEND_URL + '/expenses.json', expenseData);
  // The response will have 'id' in 'response.data.name'
  const id = response.data.name;
  return id;
}

export const fetchExpenses = async () => {
  const response = await axios.get(BACKEND_URL + '/expenses.json');

  const expenses = [];

    // response.data = { key : { 
    // amount: '222',
    // date: 'xxx',
    // description: 'Lorem',
    // }}

    // console.log(response.data);

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

// No need to wait for returning data => No Async
// By the way, the function still returns PROMISE
export const updateExpense = (id ,expenseData) => {  
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);  
}

export const deleteExpense = (id) => {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`)
}