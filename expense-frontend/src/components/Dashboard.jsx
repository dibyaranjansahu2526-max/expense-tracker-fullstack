import ExpenseChart from "./ExpenseChart";

function Dashboard({
  total,
  expenses,
  highestExpense,
  averageExpense,
  monthlyExpenses,
}) {
  return (
    <>
      <div className="cards">

        <div className="card">
          <h3>💰 Total Expenses</h3>
          <h2>₹{total}</h2>
        </div>

        <div className="card">
          <h3>📁 Total Transactions</h3>
          <h2>{expenses.length}</h2>
        </div>

        <div className="card">
          <h3>💸 Highest Expense</h3>
          <h2>₹{highestExpense}</h2>
        </div>

        <div className="card">
          <h3>📊 Average Expense</h3>
          <h2>₹{averageExpense}</h2>
        </div>

      </div>

      <div className="card">
        <h3>Welcome 👋</h3>
        <p>Track your expenses like a pro</p>
      </div>

      <ExpenseChart expenses={expenses} />

      <div className="card" style={{ marginTop: "20px" }}>
        <h3>📅 Monthly Expense Summary</h3>

        {Object.keys(monthlyExpenses).length === 0 ? (
          <p>No expense data available.</p>
        ) : (
          Object.entries(monthlyExpenses).map(([month, amount]) => (
            <div
              key={month}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <strong>{month}</strong>
              <span>₹{amount}</span>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Dashboard;