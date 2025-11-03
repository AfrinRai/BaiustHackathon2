import React, { useState } from "react";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const Mission1 = () => {
  const { sidebarOpen } = useOutletContext(); // <- get sidebar open/close
  const [selectedOption, setSelectedOption] = useState("");
  const [comment, setComment] = useState("");
  const [weeklySummary, setWeeklySummary] = useState([]);
  const [averageMood, setAverageMood] = useState(""); // NEW
  const [nudge, setNudge] = useState("");

  const userId = "12345"; // Replace with actual user ID

  const options = [
    { label: "আমার মন ভালো আছে 🙂", value: "good" },
    { label: "আমি কিছুটা চিন্তিত 😐", value: "neutral" },
    { label: "আমি উদ্বিগ্ন বা দুশ্চিন্তায় 😟", value: "bad" },
  ];

  // ------------------------
  // Fetch Weekly Summary
  // ------------------------
  const fetchWeeklySummary = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/mood/${userId}/weekly`);
      setWeeklySummary(response.data.weekly_summary || []);
      setAverageMood(response.data.averageMood || ""); // SET AVERAGE
    } catch (error) {
      console.error("Error fetching weekly summary:", error);
    }
  };

  // ------------------------
  // Fetch Nudge
  // ------------------------
  const fetchNudge = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/mood/${userId}/nudge`);
      setNudge(response.data.nudge || "");
    } catch (error) {
      console.error("Error fetching nudge:", error);
    }
  };

  // Fetch weekly summary & nudge on component mount
  useEffect(() => {
    fetchWeeklySummary();
    fetchNudge();
  }, []);

  // ------------------------
  // Submit Mood
  // ------------------------
  const handleSubmit = async () => {
    if (!selectedOption) {
      alert("অনুগ্রহ করে একটি অপশন নির্বাচন করুন।");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/mood", {
        userId,
        mood: selectedOption,
        note: comment,
      });

      alert(response.data.message); // backend message in Bengali
      setSelectedOption("");
      setComment("");

      // Refresh weekly summary & nudge after submission
      fetchWeeklySummary();
      fetchNudge();
    } catch (error) {
      console.error(error);
      alert("মেজাজ সংরক্ষণ করতে সমস্যা হয়েছে।");
    }
  };

  return (
    <div
      className="p-6 min-h-screen bg-gradient-to-b from-[#e0f7fa] via-[#b2ebf2] to-[#80deea] transition-all duration-300"
      style={{ marginLeft: sidebarOpen ? "16rem" : "5rem" }} // dynamic margin based on navbar
    >
      <h1 className="text-4xl font-bold text-[#00796b] mb-6 flex items-center gap-2">
        🧠 মানসিক স্বাস্থ্য পরীক্ষা
      </h1>

      <p className="text-lg text-[#004d40] mb-4">
        এখন নিজেকে মূল্যায়ন করুন। আপনার মন কেমন আছে তা নির্বাচন করুন:
      </p>

      {/* Markdown-style vertical options */}
      <ul className="list-none space-y-3 text-lg text-[#00796b]">
        {options.map((opt) => (
          <li key={opt.value} className="flex items-center gap-3">
            <input
              type="radio"
              id={opt.value}
              name="mental-health"
              value={opt.value}
              checked={selectedOption === opt.value}
              onChange={() => setSelectedOption(opt.value)}
              className="w-5 h-5 accent-green-600"
            />
            <label htmlFor={opt.value} className="cursor-pointer">
              {opt.label}
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <label className="block mb-2 text-[#004d40] font-semibold text-lg">
          আপনার অনুভূতি লিখুন:
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="এখানে লিখুন..."
          className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none text-lg"
          rows={5}
        ></textarea>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all"
      >
        সাবমিট করুন
      </button>

      {/* ------------------------
          Nudge Message
      ------------------------ */}
      {nudge && (
        <div className="mt-6 p-3 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 rounded">
          ⚠️ {nudge}
        </div>
      )}

      {/* ------------------------
          Weekly Average Mood
      ------------------------ */}
      {averageMood && (
        <div className="mt-6 p-4 bg-blue-100 text-blue-800 rounded-lg font-semibold text-lg">
          এই সপ্তাহের গড় মেজাজ: {averageMood}
        </div>
      )}

      {/* ------------------------
          Weekly Summary
      ------------------------ */}
      <div className="mt-4 p-4 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-[#00796b] mb-4">সাপ্তাহিক সংক্ষিপ্তসার</h2>
        {weeklySummary.length === 0 ? (
          <p>কোনো মেজাজ লগ পাওয়া যায়নি।</p>
        ) : (
          <ul className="list-disc pl-5">
            {weeklySummary.map((item, index) => (
              <li key={index}>
                {item.mood}: {item.count} বার
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Mission1;
