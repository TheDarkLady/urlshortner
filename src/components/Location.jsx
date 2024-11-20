import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";



export default function LocationStats({stats}) {
    const cityCount = stats.reduce((acc, item) =>{
        if(acc[item.city]){
            acc[item.city] += 1;
        }else{
            acc[item.city] = 1;
        }
        return acc
    }, {})
    console.log("cityCount", cityCount);

    const cities = Object.entries(cityCount).map(([city, count]) => ({city, count}))
    
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <LineChart data={cities.slice(0, 5)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="city" />
        <YAxis />
        <Tooltip labelStyle={{ color: "green" }}/>
        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
        />
        {/* <Line type="monotone" dataKey="count" stroke="#82ca9d" /> */}
      </LineChart>
    </ResponsiveContainer>
    
  );
}