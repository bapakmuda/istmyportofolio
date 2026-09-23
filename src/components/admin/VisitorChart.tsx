"use client";

import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type VisitorChartProps = {
  data: {
    date: string;
    count: number;
  }[];
};

export default function VisitorChart({ data }: VisitorChartProps) {
  // If not enough data points, pad with zeroes so the chart looks nice
  const paddedData = useMemo(() => {
    if (data.length > 3) return data;
    const padding = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const existing = data.find((item) => item.date === dateStr);
      padding.push({
        date: dateStr,
        count: existing ? existing.count : 0,
      });
    }
    // Return the actual data if it's more comprehensive, else return padded (last 7 days min)
    return data.length > padding.length ? data : padding;
  }, [data]);

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={paddedData}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-terminal-green)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-terminal-green)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="#666" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#666" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            allowDecimals={false}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: "#050505", borderColor: "var(--color-terminal-green)", color: "white" }}
            itemStyle={{ color: "var(--color-terminal-green)" }}
          />
          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="var(--color-terminal-green)" 
            fillOpacity={1} 
            fill="url(#colorCount)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
