import { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import { Link } from "react-router-dom";
import { loadJobs, saveJobs } from "../utils/Storage";

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedJobs = loadJobs();
    setJobs(storedJobs);
  }, []);

  const handleDelete = (id) => {
    const filteredJobs = jobs.filter((job) => job.id !== id);
    setJobs(filteredJobs);
    saveJobs(filteredJobs);
  };


  return (
    <div className="p-6  min-h-screen bg-gradient-to-r from-purple-700 via-indigo-900 to-black ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">📋 My Applications</h1>
        <Link
          to="/add-job"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-500 transition"
        >
          ➕ Add Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-white text-lg">No jobs added yet.</p>
          <Link
            to="/add-job"
            className="mt-4 inline-block text-indigo-600 hover:underline"
          >
            Add your first job →
          </Link>
        </div>
      ) : (
        <div className="grid gap-6  md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onDelete={() => handleDelete(job.id)}
              
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
