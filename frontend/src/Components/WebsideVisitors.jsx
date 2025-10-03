// src/pages/WebsiteVisitors.jsx
import React from 'react';
import { PieChart, Pie } from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 278 },
  { name: 'May', value: 189 },
];

const WebsiteVisitors = () => {
  return (
    <div className="widget">
      <h3>Website Visitors</h3>
      <PieChart width={400} height={400}>
        <Pie dataKey="value" data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" />
      </PieChart>
    </div>
  );
};

export default WebsiteVisitors;
