import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadJobs, saveJobs } from "../utils/Storage";


 function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jobData, setJobData] = useState({
    position: "",
    company: "",
    status: "Applied",
    date: "",
  });

  useEffect(() => {
    const storedJobs = loadJobs();
    const jobToEdit = storedJobs.find((job) => job.id === Number(id));
    if (jobToEdit) {
      setJobData({
        position: jobToEdit.position,
        company: jobToEdit.company,
        status: jobToEdit.status,
        date: jobToEdit.date,
      });
    } else {
      alert("Job not found");
      navigate("/");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedJobs = loadJobs();
    const updatedJobs = storedJobs.map((job) =>
      job.id === Number(id) ? { ...job, ...jobData } : job
    );
    saveJobs(updatedJobs);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center min-h-screen  p-6 bg-gradient-to-r from-purple-700 via-indigo-900 to-black">
    <div className=" mx-auto mt-[200px]  r p-8  rounded-xl shadow-lg w-full max-w-lg bg-white/20 backdrop-blur-lg border border-white/20  flex flex-col justify-between h-full
    transform transition duration-300 ease-in-out
    hover:shadow-[0_0_15px_5px_rgba(255,255,255,0.3)] hover:-translate-y-1"
  style={{ willChange: "transform, box-shadow" }} >
      <h2 className="text-2xl font-bold text-white mb-6">Edit Job</h2>
      <form onSubmit={handleSubmit}
       className="flex flex-col text-white gap-4 ">
        <label>
          Position:
          <input
            type="text"
            name="position"
            value={jobData.position}
            onChange={handleChange}
            required
            className="w-full border text-black p-2 rounded"
          />
        </label>

        <label>
          Company:
          <input
            type="text"
            name="company"
            value={jobData.company}
            onChange={handleChange}
            required
            className="w-full border text-black p-2 rounded"
          />
        </label>

        <label>
          Status:
          <select
            name="status"
            value={jobData.status}
            onChange={handleChange}
            className="w-full border text-black p-2 rounded"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </label>

        <label>
          Date Applied:
          <input
            type="date"
            name="date"
            value={jobData.date}
            onChange={handleChange}
            className="w-full border text-black p-2 rounded"
          />
        </label>

        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
    </div>
  );
}
export default EditJob;