function ExpenseForm({
  title,
  setTitle,
  amount,
  setAmount,
  category,
  setCategory,
  date,        
  setDate, 
  addExpense,
  isEditing,
}) {
  return (
    <div className="form">

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
         type="date"
          value={date}
           onChange={(e) => setDate(e.target.value)}
     />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Bills">Bills</option>
        <option value="Health">Health</option>
        <option value="Education">Education</option>
        <option value="General">General</option>
      </select>

      <button onClick={addExpense}>
        {isEditing ? "Update Expense" : "Add Expense"}
      </button>

    </div>
  );
}

export default ExpenseForm;