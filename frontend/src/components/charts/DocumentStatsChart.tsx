"use client";

import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';

interface ChartData {
  name: string;
  issued: number;
}

interface DocumentStatsChartProps {
  data: ChartData[];
}

export default function DocumentStatsChart({ data }: DocumentStatsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="issued" fill="#8884d8" name="Documents Issued" />
      </BarChart>
    </ResponsiveContainer>
  );
}