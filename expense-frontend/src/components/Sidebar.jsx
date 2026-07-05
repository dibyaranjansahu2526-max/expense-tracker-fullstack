function Sidebar({ setPage }) {
  return (
    <div className="sidebar">
      <h2>💰 Expense Tracker</h2>

      <button onClick={() => setPage("dashboard")}>
        📊 Dashboard
      </button>

      <button onClick={() => setPage("add")}>
        ➕ Add Expense
      </button>

      <button onClick={() => setPage("view")}>
        📁 View All
      </button>
    </div>
  );
}

export default Sidebar;