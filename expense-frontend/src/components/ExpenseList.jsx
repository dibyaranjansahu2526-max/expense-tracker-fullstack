import { exportToExcel } from "../services/excelService";
function ExpenseList({
  filteredExpenses,
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  deleteExpense,
  setTitle,
  setAmount,
  setCategory,
  date,
  setDate,
  setEditingId,
  setIsEditing,
  setPage,
})
 {
  return (
    <div className="table">
    <div className="table-header">
  <h3>All Expenses</h3>

  <button
    className="export-btn"
    onClick={() => exportToExcel(filteredExpenses)}
  >
    📥 Export to Excel
  </button>
</div>

      <input
        type="text"
        placeholder="🔍 Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="search"
      >
        <option value="All">All Categories</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Bills">Bills</option>
        <option value="Health">Health</option>
        <option value="Education">Education</option>
        <option value="General">General</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="search"
      >
        <option value="latest">Latest First</option>
        <option value="oldest">Oldest First</option>
        <option value="highest">Highest Amount</option>
        <option value="lowest">Lowest Amount</option>
      </select>

      {filteredExpenses.length === 0 ? (
        <p>No expenses found</p>
      ) : (
        filteredExpenses.map((e) => (
          <div className="row" key={e.id}>
            <span>
              {e.title} • {e.category} • ₹{e.amount}
            </span>

            <div className="actions">
              <button
                className="edit"
                onClick={() => {
               console.log("Edit clicked", e);
                setTitle(e.title);
                setAmount(e.amount);
                setCategory(e.category);
                setDate(e.date);
                  setEditingId(e.id);
                  setIsEditing(true);

                  setPage("add");
                }}
              >
                Edit
              </button>

              <button
                className="delete"
                onClick={() => deleteExpense(e.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;