'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', value: 2800000 },
  { month: 'Feb', value: 2900000 },
  { month: 'Mar', value: 3000000 },
  { month: 'Apr', value: 3100000 },
  { month: 'May', value: 3200000 },
  { month: 'Jun', value: 3300000 },
  { month: 'Jul', value: 3400000 },
  { month: 'Aug', value: 3500000 },
  { month: 'Sep', value: 3600000 },
  { month: 'Oct', value: 3700000 },
  { month: 'Nov', value: 3800000 },
  { month: 'Dec', value: 3900000 },
];

export function PerformanceChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis 
            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
            tick={{ fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <Tooltip 
            formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
            labelFormatter={(label) => `Month: ${label}`}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '0.5rem',
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#2563EB"
            fill="#3B82F6"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
} 