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
  const [isBangla, setIsBangla] = useState(true);

  const API_URL = "http://localhost:5000/api/help";

  const ngos = isBangla
    ? [
        "মনবন্ধু এনজিও",
        "শান্তি ফাউন্ডেশন",
        "যত্ন ও সহায়তা",
        "মনশান্তি সংস্থা",
        "হোপ সেন্টার",
        "আনন্দ হৃদয়",
        "নিরাপদ আশ্রয়",
        "শান্ত মন",
        "নিরাময় হাত",
        "উজ্জ্বল ভবিষ্যৎ এনজিও",
      ]
    : [
        "MonBondhu NGO",
        "Shanti Foundation",
        "Care & Support",
        "MindPeace Org",
        "Hope Center",
        "Joyful Hearts",
        "Safe Space",
        "Peaceful Minds",
        "Healing Hands",
        "Bright Future NGO",
      ];

  const fetchTotalRequests = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data.results) {
        const requests = res.data.results;
        setTotalRequests(requests.length);

        const counts = {};
        ngos.forEach((ngo) => (counts[ngo] = 0));
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

    const messages = isBangla
      ? [
          "তুমি একা নও 🌸",
          "সব ঠিক হয়ে যাবে 💫",
          "এভাবে সাহায্য চাওয়া একদম ঠিক 💛",
          "একটু গভীরভাবে নিঃশ্বাস নাও 🌿",
        ]
      : [
          "You are not alone 🌸",
          "Everything will be okay 💫",
          "It’s okay to ask for help 💛",
          "Take a deep breath 🌿",
        ];

    const interval = setInterval(() => {
      setAssurance(messages[Math.floor(Math.random() * messages.length)]);
    }, 7000);

    const queued = JSON.parse(localStorage.getItem("queuedHelpRequests") || "[]");
    if (queued.length > 0 && navigator.onLine) {
      axios
        .post(`${API_URL}/sync`, { requests: queued })
        .then(() => localStorage.removeItem("queuedHelpRequests"))
        .catch((err) => console.log("❌ Failed to sync offline requests:", err));
    }

    return () => clearInterval(interval);
  }, [isBangla]);

  const handleSubmit = async () => {
    if (!helpText.trim())
      return alert(isBangla ? "অনুগ্রহ করে কিছু লিখুন।" : "Please write something.");

    const ngo = selectedNgo || ngos[Math.floor(Math.random() * ngos.length)];
    setCollectedRequest(helpText);

    const payload = {
      message: helpText,
      emotion,
      consent: true,
      ngo,
    };

    if (!navigator.onLine) {
      const queued = JSON.parse(localStorage.getItem("queuedHelpRequests") || "[]");
      localStorage.setItem("queuedHelpRequests", JSON.stringify([...queued, payload]));
      setSubmitted(true);
      setTotalRequests(totalRequests + 1);
      setNgoRequests((prev) => ({ ...prev, [ngo]: (prev[ngo] || 0) + 1 }));
    } else {
      try {
        await axios.post(API_URL, payload);
        setSubmitted(true);
        fetchTotalRequests();
      } catch (err) {
        console.log("❌ Could not submit:", err);
        alert(isBangla ? "কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।" : "Something went wrong. Try again.");
      }
    }

    setHelpText("");
    setSelectedNgo("");
  };

  const emotions = isBangla
    ? [
        { label: "আনন্দিত", color: "bg-yellow-400" },
        { label: "ভালো", color: "bg-green-400" },
        { label: "ক্লান্ত", color: "bg-orange-400" },
        { label: "দুঃখিত", color: "bg-blue-400" },
        { label: "একাকী", color: "bg-red-400" },
      ]
    : [
        { label: "Happy", color: "bg-yellow-400" },
        { label: "Okay", color: "bg-green-400" },
        { label: "Tired", color: "bg-orange-400" },
        { label: "Sad", color: "bg-blue-400" },
        { label: "Lonely", color: "bg-red-400" },
      ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-pink-100 to-rose-200 flex flex-col items-center py-10 px-4">
      {/* Header */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-6 drop-shadow-lg text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        💌 {isBangla ? "মন শান্তি সহায়তা কেন্দ্র" : "Mental Peace Support Center"}
      </motion.h1>

      {/* Toggle Button */}
      <button
        onClick={() => setIsBangla(!isBangla)}
        className="mb-6 px-5 py-2 bg-gradient-to-r from-pink-400 to-blue-400 text-white rounded-full shadow-md hover:scale-105 transition-transform"
      >
        {isBangla ? "Switch to English 🌍" : "বাংলায় দেখুন 🇧🇩"}
      </button>

      {/* Main Card */}
      <motion.div
        className="w-full max-w-3xl bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-blue-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-xl text-gray-700 mb-6 text-center leading-relaxed">
          {isBangla
            ? "আপনার অনুভূতি গোপনভাবে আমাদের সাথে শেয়ার করুন। আমাদের স্বেচ্ছাসেবকরা ৪৮ ঘণ্টার মধ্যে যোগাযোগ করবে 💬"
            : "Share your feelings anonymously. Our volunteers will reach out within 48 hours 💬"}
        </p>

        {/* Emotion Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {emotions.map((emo, idx) => (
            <motion.button
              key={idx}
              onClick={() => setEmotion(emo.label)}
              className={`px-6 py-3 rounded-full text-lg text-white font-semibold transition-transform transform hover:scale-105 ${emo.color} ${
                emotion === emo.label ? "ring-4 ring-offset-2 ring-pink-300" : ""
              }`}
              whileTap={{ scale: 0.9 }}
            >
              {emo.label}
            </motion.button>
          ))}
        </div>

        {/* Input Box */}
        <textarea
          className="w-full p-5 rounded-xl border border-gray-300 text-lg md:text-xl focus:ring-2 focus:ring-blue-300 outline-none resize-none mb-8 shadow-inner"
          rows="5"
          placeholder={isBangla ? "আপনার কথা এখানে লিখুন..." : "Write your thoughts here..."}
          value={helpText}
          onChange={(e) => setHelpText(e.target.value)}
        />

        {/* NGO Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {ngos.map((ngo, idx) => (
            <motion.button
              key={idx}
              onClick={() => setSelectedNgo(ngo)}
              className={`px-5 py-2 rounded-full text-md font-semibold transition-all ${
                selectedNgo === ngo
                  ? "bg-gradient-to-r from-indigo-400 to-indigo-600 text-white shadow-md ring-2 ring-indigo-300"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {ngo}
            </motion.button>
          ))}
        </div>

        {/* Submit */}
        <motion.button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xl font-bold py-4 rounded-xl shadow-lg hover:from-blue-500 hover:to-blue-700 transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {isBangla ? "✉️ পাঠান" : "✉️ Submit"}
        </motion.button>

        {/* Success Message */}
        {submitted && (
          <motion.div
            className="mt-6 p-5 bg-green-50 border border-green-300 text-green-800 rounded-lg text-center font-semibold text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            💌 {isBangla ? "অনুরোধ সফলভাবে প্রেরণ হয়েছে!" : "Request sent successfully!"}
            <br />
            <strong>{isBangla ? "এনজিও:" : "NGO:"}</strong>{" "}
            {selectedNgo || ngos[Math.floor(Math.random() * ngos.length)]} <br />
            <strong>{isBangla ? "বার্তা:" : "Message:"}</strong> {collectedRequest}
          </motion.div>
        )}

        <p className="mt-8 text-center text-gray-600 italic text-lg">{assurance}</p>
      </motion.div>

      {/* Counter */}
      <motion.div
        className="mt-10 bg-white/80 border border-blue-200 rounded-2xl shadow-lg px-10 py-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
          {isBangla ? "সাহসের দেয়াল 🕊️" : "Wall of Courage 🕊️"}
        </h2>
        <p className="text-4xl font-extrabold text-blue-600">{totalRequests}</p>
        <p className="text-gray-600 font-medium mt-1 text-lg">
          {isBangla ? "মোট অনুরোধ" : "Total Requests"}
        </p>
      </motion.div>
    </div>
  );
};

export default Mission3;
