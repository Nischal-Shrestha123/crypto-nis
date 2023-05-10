import React from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartProps } from "../../types/MainScreenTypes";

const StatisticsChart: React.FC<ChartProps> = ({ chartData }) => {
  // Converting date to timestamp according to API requirement
  const ChartFormat = chartData.map((item) => {
    return {
      time: new Date(item.time).toLocaleDateString(),
      price: item.priceUsd,
    };
  });

  return (
    <ResponsiveContainer>
      <AreaChart data={ChartFormat}>
        <CartesianGrid strokeDasharray="3 3" stroke="#A0A0A0" />
        <XAxis dataKey="time" tick={{ fill: "gainsboro" }} />
        <YAxis tick={{ fill: "gainsboro" }} />
        <Tooltip label="time" />
        <Area
          type="monotone"
          dataKey="price"
          stroke="#2196F3"
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StatisticsChart;
