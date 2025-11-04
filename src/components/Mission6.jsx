import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Mission6 = () => {
  const [language, setLanguage] = useState("bn");
  const [searchTerm, setSearchTerm] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [trends, setTrends] = useState([]);

  // ✅ Fetch all symptoms
  const fetchSymptoms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/symptoms/list");
      setSymptoms(res.data.symptoms || res.data);
    } catch (err) {
      console.error("Error fetching symptoms:", err);
    }
  };

  // ✅ Fetch weekly trends
  const fetchTrends = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/trends");
      console.log("Trend data:", res.data);
      setTrends(res.data.trends || []);
    } catch (err) {
      console.error("Error fetching trends:", err);
    }
  };

  useEffect(() => {
    fetchSymptoms();
    fetchTrends();
  }, []);

  const filteredSymptoms = symptoms.filter((s) =>
    (language === "bn" ? s.name_bn : s.name_en)
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
      {/* Header */}
      <div className="flex justify-between w-full max-w-6xl mb-6">
        <h1 className="text-3xl font-bold">
          {language === "bn" ? "রোগ সচেতনতা" : "Symptom Awareness"}
        </h1>
        <button
          onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
          className="bg-white px-4 py-2 rounded-lg shadow"
        >
          {language === "bn" ? "English" : "বাংলা"}
        </button>
      </div>

      {/* ✅ Weekly Trends Section */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-4 mb-8">
        <h2 className="text-xl font-bold mb-4 text-center">
          {language === "bn"
            ? "সাপ্তাহিক রোগ প্রবণতা"
            : "Weekly Health Trends"}
        </h2>

        {trends.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {trends.map((trend, idx) => (
              <motion.li
                key={trend._id || idx}
                className="flex justify-between py-3 px-2"
                whileHover={{ scale: 1.02 }}
              >
                <span className="font-medium text-gray-700">
                  {language === "bn" ? trend._id_bn || trend._id : trend._id}
                </span>
                <span className="text-blue-600 font-semibold">
                  {trend.count} {language === "bn" ? "বার রিপোর্ট হয়েছে" : "reports"}
                </span>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">
            {language === "bn"
              ? "কোনো ট্রেন্ড ডেটা পাওয়া যায়নি"
              : "No trend data available."}
          </p>
        )}
      </div>

      {/* Search */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={
          language === "bn" ? "রোগ/লক্ষণ অনুসন্ধান করুন" : "Search symptom"
        }
        className="w-full max-w-2xl px-4 py-2 mb-6 rounded-xl border-2 border-gray-300 focus:border-blue-400"
      />

      {/* Symptom Cards */}
      <div className="flex flex-wrap gap-4 justify-center w-full max-w-6xl">
        {filteredSymptoms.map((s) => (
          <motion.div
            key={s._id}
            className="bg-white p-4 rounded-2xl shadow-lg w-80 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="font-bold text-lg mb-1">
              {language === "bn" ? s.name_bn : s.name_en}
            </h2>
            <p className="text-sm mb-1">
              {language === "bn" ? s.description_bn : s.description}
            </p>
            <p className="text-sm mb-1">
              <span className="font-semibold">
                {language === "bn" ? "বিভাগ" : "Category"}:{" "}
              </span>
              {s.category}
            </p>
            <p className="text-sm mb-1">
              <span className="font-semibold">
                {language === "bn" ? "পরামর্শ স্তর" : "Alert Level"}:{" "}
              </span>
              {s.level}
            </p>
            <p className="text-sm mb-1">
              <span className="font-semibold">
                {language === "bn" ? "পরামর্শ" : "Advice"}:{" "}
              </span>
              {language === "bn" ? s.advice_bn : s.advice}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Mission6;
