"use client";

import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';

interface ChartData {
  name: string;
  verifications: number;
}

interface VerificationTrendsProps {
  data: ChartData[];
}

export default function VerificationTrends({ data }: VerificationTrendsProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="verifications" stroke="#82ca9d" name="Verifications" />
      </LineChart>
    </ResponsiveContainer>
  );
}