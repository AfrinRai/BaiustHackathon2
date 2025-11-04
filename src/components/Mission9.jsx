import React, { useState } from "react";
import { motion } from "framer-motion";
import { BarChart2, PieChart, Heart, UserCheck, FileText, Globe } from "lucide-react";

const statsDataPerDate = [
  {
    date: "2025-11-01",
    totalCheckins: 25,
    helpRequests: [
      { upazila: "উপজেলা A", count: 10 },
      { upazila: "উপজেলা B", count: 5 },
      { upazila: "উপজেলা C", count: 10 },
    ],
    topTopics: [
      { topic: "ডায়াবেটিস", count: 10 },
      { topic: "টিকাদান", count: 8 },
      { topic: "গর্ভাবস্থা স্বাস্থ্য", count: 7 },
    ],
    facilitySearches: [
      { facility: "উপজেলা স্বাস্থ্যকেন্দ্র", count: 12 },
      { facility: "কমিউনিটি ক্লিনিক", count: 8 },
      { facility: "প্রাইভেট হাসপাতাল", count: 5 },
    ],
  },
  {
    date: "2025-11-02",
    totalCheckins: 40,
    helpRequests: [
      { upazila: "উপজেলা A", count: 15 },
      { upazila: "উপজেলা B", count: 10 },
      { upazila: "উপজেলা C", count: 15 },
    ],
    topTopics: [
      { topic: "রক্ত চাপ", count: 12 },
      { topic: "প্রথমিক চিকিৎসা", count: 15 },
      { topic: "মানসিক শান্তি", count: 13 },
    ],
    facilitySearches: [
      { facility: "উপজেলা হাসপাতাল", count: 15 },
      { facility: "কমিউনিটি হল", count: 12 },
      { facility: "প্রাইভেট ক্লিনিক", count: 10 },
    ],
  },
];

const Mission9 = () => {
  const [exportDate, setExportDate] = useState("");
  const [language, setLanguage] = useState("bn"); // 'bn' for Bangla, 'en' for English

  const filteredData = exportDate
    ? statsDataPerDate.filter((d) => d.date === exportDate)
    : statsDataPerDate;

  const handleExport = () => {
    let csvContent = `"Metric","Value"\n`;

    filteredData.forEach((stats) => {
      csvContent += `"Date",${stats.date}\n`;
      csvContent += `"Total Check-ins This Week",${stats.totalCheckins}\n`;
      stats.helpRequests.forEach((h) => {
        csvContent += `"Help Requests - ${h.upazila}",${h.count}\n`;
      });
      stats.topTopics.forEach((t) => {
        csvContent += `"Top Topic - ${t.topic}",${t.count}\n`;
      });
      stats.facilitySearches.forEach((f) => {
        csvContent += `"Facility Search - ${f.facility}",${f.count}\n`;
      });
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `health_data_${exportDate || "all"}.csv`;
    link.click();
  };

  // Text dictionary
  const text = {
    bn: {
      title: "স্বাস্থ্য তথ্য এক্সপোর্ট",
      exportBtn: "এক্সপোর্ট করুন",
      dateLabel: "তারিখ",
      checkins: "সপ্তাহের মোট চেক-ইন",
      helpRequests: "উপজেলায় সাহায্য অনুরোধ",
      topTopics: "সর্বাধিক দেখা স্বাস্থ্য বিষয়",
      facility: "সুবিধা অনুসন্ধান প্রবণতা",
      helpTitle: "উপজেলায় সাহায্য অনুরোধ",
      topTitle: "সর্বাধিক দেখা স্বাস্থ্য বিষয়",
    },
    en: {
      title: "Health Data Export",
      exportBtn: "Export",
      dateLabel: "Date",
      checkins: "Total Check-ins This Week",
      helpRequests: "Help Requests by Upazila",
      topTopics: "Most-viewed Health Topics",
      facility: "Facility Search Trends",
      helpTitle: "Help Requests by Upazila",
      topTitle: "Top Health Topics",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-yellow-50 to-red-50 p-6 flex flex-col items-center">
      {/* Header with toggle */}
      <div className="flex w-full max-w-6xl justify-between items-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600">
          {text[language].title}
        </h1>
        <button
          onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg transition"
        >
          <Globe className="w-5 h-5" />
          {language === "bn" ? "English" : "বাংলা"}
        </button>
      </div>

      {/* Date Selector */}
      <div className="mb-6 flex gap-4 w-full max-w-5xl">
        <input
          type="date"
          value={exportDate}
          onChange={(e) => setExportDate(e.target.value)}
          className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-green-300 text-lg flex-1"
        />
        <button
          onClick={handleExport}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-lg"
        >
          {text[language].exportBtn}
        </button>
      </div>

      {/* Stats Cards per date */}
      {filteredData.map((stats, idx) => (
        <div key={idx} className="w-full max-w-6xl mb-10">
          <div className="text-xl sm:text-2xl font-bold mb-4 text-gray-700 flex justify-between items-center">
            <span>
              {text[language].dateLabel}: {stats.date}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              className="p-6 rounded-3xl shadow-xl bg-gradient-to-r from-green-400 to-green-600 text-white flex flex-col items-center gap-4 hover:scale-105 transition-transform"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Heart className="w-12 h-12" />
              <div className="text-4xl font-bold">{stats.totalCheckins}</div>
              <p className="text-xl text-center">{text[language].checkins}</p>
            </motion.div>

            <motion.div
              className="p-6 rounded-3xl shadow-xl bg-gradient-to-r from-red-400 to-red-600 text-white flex flex-col items-center gap-4 hover:scale-105 transition-transform"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <UserCheck className="w-12 h-12" />
              <div className="text-2xl font-semibold">
                {stats.helpRequests.reduce((sum, r) => sum + r.count, 0)}
              </div>
              <p className="text-lg text-center">{text[language].helpRequests}</p>
            </motion.div>

            <motion.div
              className="p-6 rounded-3xl shadow-xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-white flex flex-col items-center gap-4 hover:scale-105 transition-transform"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PieChart className="w-12 h-12" />
              <div className="text-2xl font-semibold">{stats.topTopics.length}</div>
              <p className="text-lg text-center">{text[language].topTopics}</p>
            </motion.div>

            <motion.div
              className="p-6 rounded-3xl shadow-xl bg-gradient-to-r from-blue-400 to-blue-600 text-white flex flex-col items-center gap-4 hover:scale-105 transition-transform"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FileText className="w-12 h-12" />
              <div className="text-2xl font-semibold">
                {stats.facilitySearches.reduce((sum, f) => sum + f.count, 0)}
              </div>
              <p className="text-lg text-center">{text[language].facility}</p>
            </motion.div>
          </div>

          {/* Charts Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-3xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">{text[language].helpTitle}</h2>
              {stats.helpRequests.map((r) => (
                <div key={r.upazila} className="flex justify-between mb-2">
                  <span>{r.upazila}</span>
                  <span>{r.count}</span>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white rounded-3xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">{text[language].topTitle}</h2>
              {stats.topTopics.map((t) => (
                <div key={t.topic} className="flex justify-between mb-2">
                  <span>{t.topic}</span>
                  <span>{t.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Mission9;
