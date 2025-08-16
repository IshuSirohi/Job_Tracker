import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

 function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const foundJob = jobs.find((j) => String(j.id) === id);
    if (!foundJob) {
      navigate("/dashboard");
    } else {
      setJob(foundJob);
    }
  }, [id, navigate]);

  if (!job) {
    return null;
  }

  return (
    <div className="flex flex-col items-center min-h-screen  p-6 bg-gradient-to-r from-purple-700 via-indigo-900 to-black">
      <div className="p-8 rounded-xl shadow-lg w-full max-w-lg bg-white/20 backdrop-blur-lg border border-white/20  flex flex-col justify-between h-full
    transform transition duration-300 ease-in-out mt-[250px]
    hover:shadow-[0_0_15px_5px_rgba(255,255,255,0.3)] hover:-translate-y-1"
  style={{ willChange: "transform, box-shadow" }}>
        <h2 className="text-2xl font-bold text-white mb-4">{job.position}</h2>
        <p className="text-white mb-2">🏢 <strong>Company:</strong> {job.company}</p>
        <p className="text-white mb-2">
          📅 <strong>Applied Date:</strong> {job.date || "N/A"}
        </p>
        <p className="mb-4 text-white">
          📌 <strong>Status:</strong>{" "}
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
            {job.status}
          </span>
        </p>

        <Link
          to="/dashboard"
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-500 transition"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
export default JobDetails;