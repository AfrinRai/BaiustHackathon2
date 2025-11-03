import React, { useState } from "react";

const Mission1 = ({ sidebarOpen = true }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [comment, setComment] = useState("");

  const options = [
    { label: "1️⃣ আমার মন ভালো আছে 🙂", value: "good" },
    { label: "2️⃣ আমি কিছুটা চিন্তিত 😐", value: "neutral" },
    { label: "3️⃣ আমি উদ্বিগ্ন বা দুশ্চিন্তায় 😟", value: "bad" },
  ];

  const handleSubmit = () => {
    if (!selectedOption) {
      alert("অনুগ্রহ করে একটি অপশন নির্বাচন করুন।");
      return;
    }
    alert(`আপনি নির্বাচন করেছেন: ${selectedOption}\nআপনার মন্তব্য: ${comment}`);
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

      {/* Comment Box */}
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

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-6 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all"
      >
        সাবমিট করুন
      </button>
    </div>
  );
};

export default Mission1;
