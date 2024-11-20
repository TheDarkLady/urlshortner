import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function DeviceStats({ stats }) {
  // Calculate device count
  const deviceCount = stats.reduce((acc, item) => {
    if (!acc[item.device]) {
      acc[item.device] = 0;
    }
    acc[item.device]++;
    return acc;
  }, {});

  console.log("deviceCount", deviceCount);

  // Convert to chart-compatible format
  const result = Object.entries(deviceCount).map(([device, count]) => ({
    device,
    count,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={result}
          dataKey="count"
          nameKey="device"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ name, percent }) => `${name} : ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {result.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
