import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock data generated based on Kaggle crime datasets for demonstration
const crimeTrendData = [
  { year: '2019', crimeCount: 415000 },
  { year: '2020', crimeCount: 371000 },
  { year: '2021', crimeCount: 428000 },
  { year: '2022', crimeCount: 445000 },
  { year: '2023', crimeCount: 432000 },
];

const crimeTypeData = [
  { name: 'Kidnapping', value: 87000 },
  { name: 'Domestic Violence', value: 145000 },
  { name: 'Assault', value: 92000 },
  { name: 'Cyber Crime', value: 18000 },
  { name: 'Others', value: 110000 },
];

const citySafetyData = [
  { city: 'Delhi', safetyIndex: 42 },
  { city: 'Mumbai', safetyIndex: 61 },
  { city: 'Chennai', safetyIndex: 59 },
  { city: 'Kolkata', safetyIndex: 55 },
  { city: 'Bengaluru', safetyIndex: 52 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const CrimeAnalytics = () => {
  return (
    <div className="space-y-8 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Crime Trend Line Chart */}
        <div className="bg-midnight/50 border border-charcoal p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-lavender mb-4">India Crime Trend (Past 5 Years)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={crimeTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="year" stroke="#ffffffaa" />
                <YAxis stroke="#ffffffaa" />
                <Tooltip contentStyle={{ backgroundColor: '#1e1e2d', borderColor: '#3b3b4f' }} />
                <Legend />
                <Line type="monotone" dataKey="crimeCount" name="Total Crimes" stroke="#FF6B6B" strokeWidth={3} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Crime Type Distribution Pie Chart */}
        <div className="bg-midnight/50 border border-charcoal p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-lavender mb-4">Crimes Against Women (Type Distribution)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={crimeTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {crimeTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e1e2d', borderColor: '#3b3b4f' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* City Safety Comparison Bar Chart */}
        <div className="bg-midnight/50 border border-charcoal p-6 rounded-2xl shadow-lg lg:col-span-2">
          <h3 className="text-xl font-bold text-lavender mb-4">Major City Safety Index Comparison</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={citySafetyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="city" stroke="#ffffffaa" />
                <YAxis stroke="#ffffffaa" domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#1e1e2d', borderColor: '#3b3b4f' }} />
                <Legend />
                <Bar dataKey="safetyIndex" name="Safety Index (Higher is Safer)" fill="#00C49F" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CrimeAnalytics;
