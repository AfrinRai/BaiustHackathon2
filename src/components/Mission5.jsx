import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Bell, Heart, AlertTriangle } from "lucide-react";
import axios from "axios";

const initialBabyData = [
  {
    month: 1,
    weight: "3.2 kg",
    height: "50 cm",
    milestones: {
      en: ["Smiles", "Lifts head briefly", "Responds to familiar voices"],
      bn: ["হাসে", "অল্প সময়ের জন্য মাথা তোলে", "পরিচিত কণ্ঠে সাড়া দেয়"],
    },
    nutrition: {
      en: "Exclusive breastfeeding every 2–3 hours. Mother should eat iron-rich foods and drink plenty of water.",
      bn: "প্রতি ২–৩ ঘন্টায় শুধুমাত্র মায়ের দুধ দিন। মায়ের উচিত আয়রনসমৃদ্ধ খাবার খাওয়া ও পর্যাপ্ত পানি পান করা।",
    },
  },
  {
    month: 2,
    weight: "4 kg",
    height: "52 cm",
    milestones: {
      en: ["Follows moving objects", "Coos and makes sounds", "Starts to hold head steady"],
      bn: ["চোখ দিয়ে চলমান বস্তু অনুসরণ করে", "বিভিন্ন শব্দ করে", "মাথা কিছুটা স্থিরভাবে ধরে রাখতে পারে"],
    },
    nutrition: {
      en: "Continue exclusive breastfeeding on demand. Mother should include protein and calcium-rich foods.",
      bn: "শুধুমাত্র মায়ের দুধ খাওয়ানো চালিয়ে যান। মায়ের উচিত প্রোটিন ও ক্যালসিয়ামসমৃদ্ধ খাবার খাওয়া।",
    },
  },
  {
    month: 3,
    weight: "5 kg",
    height: "55 cm",
    milestones: {
      en: ["Rolls over", "Recognizes mother", "Enjoys playing"],
      bn: ["পাশে ঘোরে", "মাকে চিনতে পারে", "খেলতে ভালোবাসে"],
    },
    nutrition: {
      en: "Feed breast milk on demand. Mother should eat fruits, vegetables, and grains to maintain energy.",
      bn: "শিশুর চাহিদা অনুযায়ী দুধ খাওয়ান। মায়ের উচিত ফল, শাকসবজি ও শস্য খাওয়া যাতে শক্তি বজায় থাকে।",
    },
  },
  {
    month: 4,
    weight: "5.8 kg",
    height: "58 cm",
    milestones: {
      en: ["Laughs aloud", "Grasps toys", "Turns head toward sounds"],
      bn: ["জোরে হাসে", "খেলনা ধরতে পারে", "শব্দের দিকে মাথা ঘোরায়"],
    },
    nutrition: {
      en: "Continue exclusive breastfeeding. Mother should eat small, frequent meals for better milk flow.",
      bn: "শুধুমাত্র মায়ের দুধ দিন। মায়ের উচিত বারবার অল্প অল্প খাবার খাওয়া যাতে দুধ উৎপাদন ভালো হয়।",
    },
  },
  {
    month: 5,
    weight: "6.3 kg",
    height: "60 cm",
    milestones: {
      en: ["Sits with support", "Recognizes faces", "Reaches for nearby objects"],
      bn: ["সহযোগিতায় বসতে পারে", "চেনা মুখ চিনতে পারে", "কাছের জিনিস ধরতে চায়"],
    },
    nutrition: {
      en: "Continue exclusive breastfeeding only. No water or solid food is needed. Mother should stay hydrated and eat balanced meals.",
      bn: "শুধুমাত্র মায়ের দুধ দিন। কোনো পানি বা খাবারের প্রয়োজন নেই। মায়ের উচিত পর্যাপ্ত পানি পান করা ও ভারসাম্যপূর্ণ খাবার খাওয়া।",
    },
  },
  {
    month: 6,
    weight: "6.8 kg",
    height: "63 cm",
    milestones: {
      en: ["Rolls both sides", "Babbles frequently", "Shows curiosity in surroundings"],
      bn: ["দুই দিকেই ঘোরে", "বারবার বকবক করে", "চারপাশে আগ্রহ দেখায়"],
    },
    nutrition: {
      en: "Start complementary feeding (soft rice, mashed fruits) along with continued breastfeeding.",
      bn: "মায়ের দুধের পাশাপাশি পরিপূরক খাবার (নরম ভাত, চটকানো ফল) খাওয়ানো শুরু করুন।",
    },
  },
];

const colorMap = {
  pink: "pink",
  purple: "purple",
  green: "green",
  red: "red",
};

const Mission5 = () => {
  const [language, setLanguage] = useState("bn");
  const [activeTab, setActiveTab] = useState("anc");
  const [babyData, setBabyData] = useState(initialBabyData);
  const [nextANC, setNextANC] = useState([]);
  const [nextVaccines, setNextVaccines] = useState([]);
  const [userInput, setUserInput] = useState({ expectedDelivery: "", childDOB: "" });
  const [symptomInput, setSymptomInput] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Calculate ANC visits
  const calculateANC = (date) => {
    if (!date) return [];
    const ancDates = [];
    let base = new Date(date);
    [4, 8, 12, 20, 28, 36].forEach((week) => {
      let ancDate = new Date(base);
      ancDate.setDate(ancDate.getDate() + week * 7);
      ancDates.push(ancDate.toLocaleDateString());
    });
    return ancDates;
  };

  // Calculate vaccines
  const calculateVaccines = (dob) => {
    if (!dob) return [];
    const vaccines = [
      { name: "BCG", ageWeeks: 0 },
      { name: "Penta 1", ageWeeks: 6 },
      { name: "Penta 2", ageWeeks: 10 },
      { name: "Penta 3", ageWeeks: 14 },
      { name: "MR 1", ageWeeks: 39 },
    ];
    const dobDate = new Date(dob);
    return vaccines.map((v) => ({
      ...v,
      dueDate: new Date(dobDate.getTime() + v.ageWeeks * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    }));
  };

  useEffect(() => {
    if (userInput.expectedDelivery) setNextANC(calculateANC(userInput.expectedDelivery));
    if (userInput.childDOB) setNextVaccines(calculateVaccines(userInput.childDOB));
  }, [userInput]);

  // AI Symptom Handling
  const handleSymptomSubmit = async () => {
    if (!symptomInput) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/disease/chat", {
        symptoms: [symptomInput],
        language,
      });
      console.log("AI Response:", res.data); // debug
      const aiReply = res.data?.possibleDiseases || (language === "bn" ? "প্রতিক্রিয়া পাওয়া যায়নি" : "No response");
      setAlerts((prev) => [...prev, { symptom: symptomInput, reply: aiReply }]);
      setSymptomInput("");
    } catch (err) {
      console.error("AI Error:", err);
      alert(language === "bn" ? "AI সার্ভারে সমস্যা হয়েছে" : "AI service error");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "anc", icon: Calendar, label: language === "bn" ? "ANC ভিজিট" : "ANC Visits", color: "pink" },
    { id: "vaccine", icon: Bell, label: language === "bn" ? "টিকাদান" : "Vaccines", color: "purple" },
    { id: "growth", icon: Heart, label: language === "bn" ? "বৃদ্ধি" : "Growth", color: "green" },
    { id: "alerts", icon: AlertTriangle, label: language === "bn" ? "সতর্কতা" : "Alerts", color: "red" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "anc":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-3xl font-bold text-pink-800 mb-6">{language === "bn" ? "পরবর্তী ANC ভিজিট" : "Upcoming ANC Visits"}</h3>
            <ul className="list-disc ml-6 space-y-3 text-xl text-pink-700">
              {nextANC.length ? nextANC.map((date, idx) => <li key={idx}>{date}</li>) : <li>{language === "bn" ? "তারিখ নেই" : "No dates"}</li>}
            </ul>
          </motion.div>
        );
      case "vaccine":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-3xl font-bold text-purple-800 mb-6">{language === "bn" ? "শিশুর টিকাদান সময়সূচী" : "Child Vaccination Schedule"}</h3>
            <ul className="list-disc ml-6 space-y-3 text-xl text-purple-700">
              {nextVaccines.length
                ? nextVaccines.map((v, idx) => <li key={idx}>{v.name} - {v.dueDate}</li>)
                : <li>{language === "bn" ? "কোনও টিকা নির্ধারিত নেই" : "No vaccines scheduled"}</li>}
            </ul>
          </motion.div>
        );
      case "growth":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-green-100 to-green-200 rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-3xl font-bold text-green-800 mb-6">{language === "bn" ? "শিশুর বৃদ্ধি ও পুষ্টি" : "Baby Growth & Nutrition"}</h3>
            <div className="space-y-6">
              {babyData.map((b) => (
                <div key={b.month} className="bg-white/70 rounded-xl p-6 shadow-md">
                  <p className="text-xl text-green-700 font-medium">
                    {language === "bn"
                      ? `${b.month} মাস: ওজন ${b.weight}, উচ্চতা ${b.height}`
                      : `Month ${b.month}: Weight ${b.weight}, Height ${b.height}`}
                  </p>
                  <p className="text-xl text-green-600 mt-2">
                    {language === "bn"
                      ? `মাইলস্টোন: ${b.milestones.bn.join(", ")}`
                      : `Milestones: ${b.milestones.en.join(", ")}`}
                  </p>
                  <p className="italic text-xl text-green-800 font-semibold mt-2">
                    {language === "bn"
                      ? `পুষ্টি পরামর্শ: ${b.nutrition.bn}`
                      : `Nutrition Tip: ${b.nutrition.en}`}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case "alerts":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-red-100 to-red-200 rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-3xl font-bold text-red-800 mb-6">{language === "bn" ? "লক্ষণ ও AI সতর্কতা" : "Symptom & AI Alerts"}</h3>
            <div className="space-y-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={symptomInput}
                  placeholder={language === "bn" ? "লক্ষণ লিখুন" : "Enter symptom"}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-400 focus:ring-4 focus:ring-red-200 transition-all duration-300 text-xl"
                  onChange={(e) => setSymptomInput(e.target.value)}
                />
                <button
                  onClick={handleSymptomSubmit}
                  disabled={loading}
                  className={`px-6 py-3 rounded-xl font-semibold text-xl transition-all duration-300 ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  {loading ? (language === "bn" ? "প্রক্রিয়াকরণ..." : "Processing...") : language === "bn" ? "যোগ করুন" : "Add"}
                </button>
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {alerts.length ? (
                  alerts.map((a, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/70 shadow-md">
                      <p className="font-medium text-red-700">{language === "bn" ? "আপনার লক্ষণ:" : "Your Symptom:"} {a.symptom}</p>
                      <p className="mt-2 text-red-800 italic" style={{ whiteSpace: "pre-line" }}>
                        {language === "bn" ? "চ্যাটবটের প্রতিক্রিয়া:" : "Chatbot Reply:"} {a.reply}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-red-600">{language === "bn" ? "কোনও চ্যাট নেই" : "No chat yet"}</p>
                )}
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 flex flex-col items-center">
      {/* Header & Language Toggle */}
      <div className="flex justify-between items-center w-full max-w-6xl mb-8">
        <h1 className="text-4xl font-bold text-gray-800 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          {language === "bn" ? "গর্ভবতী ও শিশু স্বাস্থ্য ট্র্যাকার" : "Maternal & Child Health Tracker"}
        </h1>
        <button
          onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
          className="bg-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
        >
          {language === "bn" ? "English" : "বাংলা"}
        </button>
      </div>

      {/* User Input */}
      <div className="w-full max-w-6xl mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100">
          <label className="block text-lg font-semibold text-gray-700 mb-4">
            {language === "bn" ? "শিশুর জন্ম তারিখ:" : "Expected Delivery / Child DOB:"}
          </label>
          <input
            type="date"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-200 transition-all duration-300 text-lg"
            value={userInput.expectedDelivery || userInput.childDOB}
            onChange={(e) =>
              setUserInput({ expectedDelivery: e.target.value, childDOB: e.target.value })
            }
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full max-w-6xl mb-8">
        <div className="flex justify-center space-x-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center p-4 rounded-2xl shadow-lg transition-all duration-300 ${
                  isActive
                    ? `bg-${colorMap[tab.color]}-200 border-2 border-${colorMap[tab.color]}-400`
                    : "bg-white hover:bg-gray-50 border-2 border-gray-200"
                }`}
              >
                <Icon className={`w-8 h-8 ${isActive ? `text-${colorMap[tab.color]}-600` : "text-gray-600"}`} />
                <span className={`mt-2 text-sm font-medium ${isActive ? `text-${colorMap[tab.color]}-700` : "text-gray-700"}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-6xl">
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </div>
    </div>
  );
};

export default Mission5;
