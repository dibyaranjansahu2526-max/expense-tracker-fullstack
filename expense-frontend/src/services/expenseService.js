import axios from "axios";

const API = "http://localhost:8080/expenses";

export const getExpenses = () => axios.get(API);

export const addExpenseAPI = (expense) => axios.post(API, expense);

export const updateExpenseAPI = (id, expense) =>
  axios.put(`${API}/${id}`, expense);

export const deleteExpenseAPI = (id) =>
  axios.delete(`${API}/${id}`);