import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ExpenseChart({ expenses }) {
  const COLORS = [
    "#3B82F6",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
  ];

  // Group expenses by category
  const chartData = Object.values(
    expenses.reduce((acc, expense) => {
      const category = expense.category || "Other";

      if (!acc[category]) {
        acc[category] = {
          name: category,
          value: 0,
        };
      }

      acc[category].value += Number(expense.amount);

      return acc;
    }, {})
  );

  return (
    <div
      style={{
        width: "100%",
        height: "350px",
        background: "rgba(255,255,255,0.08)",
        borderRadius: "15px",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        Expenses By Category
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;