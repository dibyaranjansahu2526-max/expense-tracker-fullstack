import { useEffect, useState } from "react";
import {
  getExpenses,
  addExpenseAPI,
  updateExpenseAPI,
  deleteExpenseAPI,
} from "./services/expenseService";
import "./App.css";
import ExpenseChart from "./components/ExpenseChart";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
   const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  //const [date, setDate] = useState("");
  const [page, setPage] = useState("dashboard");

  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");


  // Load expenses
  const loadExpenses = async () => {
    try {
   const res = await getExpenses();
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // Add expense
 const addExpense = async () => {
  if (!title || !amount || !category) {
    alert("Please fill all fields");
    return;
  }

 const expense = {
  title: title.trim(),
  amount: parseFloat(amount),
  category: category.trim(),
  description: "Added from UI",
  date: date,
};

  try {
    if (isEditing) {
      await updateExpenseAPI(editingId, expense);
      alert("Expense Updated Successfully!");
    } else {
      await addExpenseAPI(expense);
      alert("Expense Added Successfully!");
    }

    setTitle("");
    setAmount("");
    setCategory("");
   setDate(new Date().toISOString().split("T")[0]);

    setEditingId(null);
    setIsEditing(false);

    await loadExpenses();

    setPage("view");

  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};
  // Delete expense
  const deleteExpense = async (id) => {
    try {
      await deleteExpenseAPI(id);
      loadExpenses();
    } catch (err) {
      console.log(err);
    }
  };
const filteredExpenses = expenses
  .filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      expense.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  })
  .sort((a, b) => {
    switch (sortBy) {
      case "highest":
        return b.amount - a.amount;

      case "lowest":
        return a.amount - b.amount;

      case "oldest":
        return new Date(a.date) - new Date(b.date);

      default:
        return new Date(b.date) - new Date(a.date);
    }
  });
  
 const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

const highestExpense =
  expenses.length > 0
    ? Math.max(...expenses.map((e) => Number(e.amount)))
    : 0;

const averageExpense =
  expenses.length > 0
    ? (total / expenses.length).toFixed(2)
    : 0;
const monthlyExpenses = expenses.reduce((acc, expense) => {
  const month = new Date(expense.date).toLocaleString("default", {
    month: "long",
  });

  if (!acc[month]) {
    acc[month] = 0;
  }

  acc[month] += Number(expense.amount);

  return acc;
}, {});
  return (
    <div className="container">

      {/* SIDEBAR */}
      <Sidebar setPage={setPage} />

      {/* MAIN */}
      <div className="main">

        {/* DASHBOARD */}
       {page === "dashboard" && (
<Dashboard
  total={total}
  expenses={expenses}
  highestExpense={highestExpense}
  averageExpense={averageExpense}
  monthlyExpenses={monthlyExpenses}
/>
)}
        {/* ADD EXPENSE */}
     {page === "add" && (
  <ExpenseForm
    title={title}
    setTitle={setTitle}
    amount={amount}
    setAmount={setAmount}
    category={category}
    setCategory={setCategory}
    date={date}
    setDate={setDate}
    addExpense={addExpense}
    isEditing={isEditing}
  />
)}

        {/* VIEW EXPENSES */}
   {page === "view" && (
  <ExpenseList
    filteredExpenses={filteredExpenses}
    search={search}
    setSearch={setSearch}
    selectedCategory={selectedCategory}
    setSelectedCategory={setSelectedCategory}
    sortBy={sortBy}
    setSortBy={setSortBy}
    deleteExpense={deleteExpense}
    setTitle={setTitle}
    setAmount={setAmount}
    setCategory={setCategory}
    date={date}
    setDate={setDate}
    setEditingId={setEditingId}
    setIsEditing={setIsEditing}
    setPage={setPage}
  />
)}

      </div>
    </div>
  );
}

export default App;