import { useState } from "react";
import { useNavigate } from "react-router-dom";

 function AddJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: Date.now(),
    position: "",
    company: "",
    status: "Applied",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    jobs.push(formData);
    localStorage.setItem("jobs", JSON.stringify(jobs));

    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center bg-gradient-to-r from-purple-700 via-indigo-900 to-black  items-center min-h-screen">
      <div 
      className="p-8 rounded-xl shadow-lg w-full max-w-lg bg-white/20 backdrop-blur-lg border border-white/20  flex flex-col justify-between h-full
    transform transition duration-300 ease-in-out
    hover:shadow-[0_0_15px_5px_rgba(255,255,255,0.3)] hover:-translate-y-1"
  style={{ willChange: "transform, box-shadow" }}
      
      >
        <h2 className="text-2xl font-bold text-white mb-10"> ➕ Add New Job</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white  font-medium  mb-2">Position</label>
            <input
              type="text"
              name="position"
              placeholder="Write your position"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-white  font-medium mb-2">Company</label>
            <input
              type="text"
              placeholder="Write company name"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Rejected</option>
              <option>Accepted</option>
            </select>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Applied Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3  bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-500 transition"
          >
            Save Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddJob;