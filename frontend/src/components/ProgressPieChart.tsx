import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

interface ProgressPieChartProps {
  completed: number;
  pending: number;
}

const COLORS = ["#0088FE", "#FF8042"];

const ProgressPieChart: React.FC<ProgressPieChartProps> = ({ completed, pending }) => {
  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ProgressPieChart;
