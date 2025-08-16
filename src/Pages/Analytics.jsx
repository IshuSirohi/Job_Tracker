import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

 function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const statusCounts = {
      Applied: 0,
      Interview: 0,
      Rejected: 0,
      Accepted: 0,
    };

    jobs.forEach((job) => {
      if (statusCounts[job.status] !== undefined) {
        statusCounts[job.status]++;
      }
    });

    setData([
      { name: "Applied", value: statusCounts.Applied },
      { name: "Interview", value: statusCounts.Interview },
      { name: "Rejected", value: statusCounts.Rejected },
      { name: "Accepted", value: statusCounts.Accepted },
    ]);
  }, []);

  const COLORS = ["cyan", "#F59E0B", "#EF4444", "#10B981"];

  return (
    <div className="flex flex-col items-center min-h-screen  p-6 bg-gradient-to-r from-purple-700 via-indigo-900 to-black">
      <h2 className="text-3xl font-bold text-white mb-6">📊 Job Application Analytics</h2>
      <div className="p-8 rounded-xl shadow-lg w-full max-w-lg bg-white/20 backdrop-blur-lg border border-white/20  flex flex-col justify-between h-full
    transform transition duration-300 ease-in-out
    hover:shadow-[0_0_15px_5px_rgba(255,255,255,0.3)] hover:-translate-y-1"
  style={{ willChange: "transform, box-shadow" }}>
        {data.every((item) => item.value === 0) ? (
          <p className="text-center text-gray-500">No job data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
export default Analytics;