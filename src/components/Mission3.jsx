import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Mission3 = () => {
  const [helpText, setHelpText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [totalRequests, setTotalRequests] = useState(0);
  const [ngoRequests, setNgoRequests] = useState({});
  const [assurance, setAssurance] = useState("");
  const [emotion, setEmotion] = useState("");
  const [selectedNgo, setSelectedNgo] = useState("");
  const [collectedRequest, setCollectedRequest] = useState("");

  const API_URL = "http://localhost:5000/api/help";

  const ngos = [
    "MonBondhu NGO",
    "Shanti Foundation",
    "Care & Support",
    "MindPeace Org",
    "Hope Center",
    "Joyful Hearts",
    "Safe Space",
    "Peaceful Minds",
    "Healing Hands",
    "Bright Future NGO"
  ];

  // Fetch total number of requests from backend
  const fetchTotalRequests = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data.results) {
        const requests = res.data.results;
        setTotalRequests(requests.length);

        // Count per NGO
        const counts = {};
        ngos.forEach((ngo) => counts[ngo] = 0);
        requests.forEach((r) => {
          if (r.ngo && counts[r.ngo] !== undefined) counts[r.ngo]++;
        });
        setNgoRequests(counts);
      }
    } catch (err) {
      console.log("❌ Could not fetch total requests:", err);
    }
  };

  useEffect(() => {
    fetchTotalRequests();

    const messages = [
      "তুমি একা নও 🌸",
      "সব ঠিক হয়ে যাবে 💫",
      "এভাবে সাহায্য চাওয়া একদম ঠিক 💛",
      "একটু গভীরভাবে নিঃশ্বাস নাও 🌿",
    ];

    const interval = setInterval(() => {
      setAssurance(messages[Math.floor(Math.random() * messages.length)]);
    }, 7000);

    // Auto-send queued offline requests
    const queued = JSON.parse(localStorage.getItem("queuedHelpRequests") || "[]");
    if (queued.length > 0 && navigator.onLine) {
      axios.post(`${API_URL}/sync`, { requests: queued })
        .then(() => localStorage.removeItem("queuedHelpRequests"))
        .catch(err => console.log("❌ Failed to sync offline requests:", err));
    }

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    if (!helpText.trim()) return alert("অনুগ্রহ করে কিছু লিখুন।");

    const ngo = selectedNgo || ngos[Math.floor(Math.random() * ngos.length)];
    setCollectedRequest(helpText);

    const payload = { 
      message: helpText, 
      emotion, 
      consent: true,
      ngo 
    };

    if (!navigator.onLine) {
      const queued = JSON.parse(localStorage.getItem("queuedHelpRequests") || "[]");
      localStorage.setItem("queuedHelpRequests", JSON.stringify([...queued, payload]));
      setSubmitted(true);
      setTotalRequests(totalRequests + 1);
      setNgoRequests(prev => ({ ...prev, [ngo]: (prev[ngo] || 0) + 1 }));
    } else {
      try {
        await axios.post(API_URL, payload);
        setSubmitted(true);
        fetchTotalRequests(); // refresh from backend
      } catch (err) {
        console.log("❌ Could not submit:", err);
        alert("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      }
    }

    setHelpText("");
    setSelectedNgo("");
  };

  const emotions = [
    { label: "আনন্দিত", color: "yellow-400" },
    { label: "ভালো", color: "green-400" },
    { label: "ক্লান্ত", color: "orange-400" },
    { label: "দুঃখিত", color: "blue-400" },
    { label: "একাকী", color: "red-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-pink-100 to-yellow-100 p-6 flex flex-col items-center">

      <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">
        মন শান্তি সহায়তা 💌
      </h1>

      {/* Submission Card */}
      <motion.div
        className="w-full max-w-xl bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-lg text-gray-700 mb-4">
          আপনার সমস্যার কথা গোপনভাবে আমাদের সাথে শেয়ার করুন। স্বেচ্ছাসেবক ৪৮ ঘণ্টার মধ্যে যোগাযোগ করবে।
        </p>

        {/* Emotions */}
        <div className="flex justify-between mb-4 flex-wrap gap-2">
          {emotions.map((emo, idx) => (
            <button
              key={idx}
              onClick={() => setEmotion(emo.label)}
              className={`px-4 py-2 rounded-full text-white font-semibold transition-all ${
                emotion === emo.label ? `bg-${emo.color} ring-4 ring-${emo.color}` : `bg-gray-300`
              }`}
            >
              {emo.label}
            </button>
          ))}
        </div>

        {/* Help Text */}
        <textarea
          className="w-full p-4 rounded-xl border border-gray-300 text-lg focus:ring-2 focus:ring-blue-300 outline-none resize-none mb-4"
          rows="4"
          placeholder="এখানে লিখুন..."
          value={helpText}
          onChange={(e) => setHelpText(e.target.value)}
        />

        {/* NGO Selection */}
        <div className="flex justify-between mb-4 flex-wrap gap-2">
          {ngos.map((ngo, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedNgo(ngo)}
              className={`px-4 py-2 rounded-full text-white font-semibold transition-all ${
                selectedNgo === ngo ? "bg-purple-500 ring-4 ring-purple-500" : "bg-gray-300"
              }`}
            >
              {ngo}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-500 hover:to-blue-700 transition-all"
        >
          পাঠান
        </button>

        {submitted && (
          <motion.div
            className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            আপনার অনুরোধ সফলভাবে প্রেরণ করা হয়েছে 💌 <br />
            <strong>NGO:</strong> {selectedNgo || ngos[Math.floor(Math.random() * ngos.length)]} <br />
            <strong>Request:</strong> {collectedRequest}
          </motion.div>
        )}

        {/* Rotating Assurance */}
        <p className="mt-6 text-center text-gray-600 italic">{assurance}</p>
      </motion.div>

      {/* Courage Wall: Total Requests and per NGO */}
      <div className="w-full max-w-xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          সাহসের দেয়াল 🕊️
        </h2>

        {/* Total Requests */}
        <motion.div
          className="bg-white/70 rounded-xl shadow-inner p-6 mb-4 text-center text-gray-800 text-xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Total Requests: {totalRequests}
        </motion.div>

        {/* Requests per NGO */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {ngos.map((ngo, idx) => (
            <motion.div
              key={idx}
              className="bg-white/80 rounded-xl shadow-md p-4 text-center text-gray-700 font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              {ngo} <br />
              <span className="text-blue-600 text-lg">{ngoRequests[ngo] || 0} requests</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mission3;
