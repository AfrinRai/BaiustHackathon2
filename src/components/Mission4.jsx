import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, CloudRain, Droplet } from "lucide-react";

const Mission4 = () => {
  const [season, setSeason] = useState(getCurrentSeason());
  const [expandedCard, setExpandedCard] = useState(null);
  const [tipOfDay, setTipOfDay] = useState("");
  const [language, setLanguage] = useState("bn");

  // Seasonal health issues data
  const seasonalData = {
    Monsoon: [
      {
        id: 1,
        icon: <CloudRain className="w-14 h-14 text-blue-500" />,
        title: { bn: "ডেঙ্গু সতর্কতা", en: "Dengue Alert" },
        warning: { bn: "জ্বর, মাথা ব্যথা, চোখে লালচে ভাব", en: "Fever, headache, red eyes" },
        tips: {
          bn: [
            "পানি জমে থাকা এলাকায় মশারি/নিষ্কাশন করুন",
            "প্রতিদিন নখ, পাত্র পরিষ্কার রাখুন",
            "প্রয়োজনে স্থানীয় ক্লিনিক বা CHW এর সাথে যোগাযোগ করুন",
          ],
          en: [
            "Clear standing water and drains",
            "Keep nails and utensils clean daily",
            "Contact local clinic or CHW if needed",
          ],
        },
        awareness: {
          bn: "মশারিতে বসে থাকা রোগ ছড়ায়। সতর্ক থাকুন।",
          en: "Diseases spread via mosquitoes. Stay alert.",
        },
      },
      {
        id: 2,
        icon: <Droplet className="w-14 h-14 text-cyan-500" />,
        title: { bn: "পানি-সংক্রান্ত রোগ", en: "Water-borne Diseases" },
        warning: { bn: "ডায়রিয়া, পেটব্যথা, বমি", en: "Diarrhea, stomach pain, vomiting" },
        tips: {
          bn: ["পরিষ্কার পানি পান করুন", "খাবার আগে ভালোভাবে ধুয়ে নিন", "হ্যান্ডওয়াশ ব্যবহার করুন"],
          en: ["Drink clean water", "Wash food properly before eating", "Use handwash"],
        },
        awareness: {
          bn: "পরিচ্ছন্ন পানি জীবনের মূল।",
          en: "Clean water is essential for life.",
        },
      },
    ],
    Winter: [
      {
        id: 3,
        icon: <Sun className="w-14 h-14 text-yellow-500" />,
        title: { bn: "সর্দি ও কাশি", en: "Cold & Cough" },
        warning: { bn: "সর্দি, কাশি, শরীর ব্যথা", en: "Cold, cough, body ache" },
        tips: {
          bn: ["গরম পানি পান করুন", "হালকা উষ্ণ পোশাক ব্যবহার করুন", "শিশুদের ভ্যাকসিন ঠিকমতো দিতে ভুলবেন না"],
          en: ["Drink warm water", "Wear light warm clothes", "Ensure children get vaccines"],
        },
        awareness: { bn: "শীতকালে ঠান্ডা লাগা স্বাভাবিক, তবে সতর্ক থাকুন।", en: "Cold in winter is normal, but stay cautious." },
      },
      {
        id: 4,
        icon: <Droplet className="w-14 h-14 text-blue-400" />,
        title: { bn: "নিম্নশ্বাসজনিত অসুখ", en: "Respiratory Issues" },
        warning: { bn: "সাংস নিতে সমস্যা, শ্বাসকষ্ট", en: "Breathing difficulty, shortness of breath" },
        tips: {
          bn: ["উষ্ণ বাতাসে থাকুন", "ধোঁয়া ও ঠান্ডা বাতাস এড়ান", "চিকিৎসকের পরামর্শ নিন"],
          en: ["Stay in warm air", "Avoid smoke and cold air", "Consult a doctor"],
        },
        awareness: { bn: "শ্বাসের সমস্যা গুরুত্বের সঙ্গে দেখুন।", en: "Take breathing issues seriously." },
      },
    ],
    Summer: [
      {
        id: 5,
        icon: <Sun className="w-14 h-14 text-orange-500" />,
        title: { bn: "ডিহাইড্রেশন ও তাপপ্রভাব", en: "Dehydration & Heat Stroke" },
        warning: { bn: "মাথা ঘোরা, ক্লান্তি, অতিরিক্ত ঘাম", en: "Dizziness, fatigue, excessive sweating" },
        tips: {
          bn: ["পর্যাপ্ত পানি পান করুন", "সরাসরি রোদ এড়ান", "হালকা পোশাক ব্যবহার করুন"],
          en: ["Drink enough water", "Avoid direct sunlight", "Wear light clothes"],
        },
        awareness: { bn: "গরমে নিজেকে হাইড্রেটেড রাখুন।", en: "Stay hydrated in heat." },
      },
      {
        id: 6,
        icon: <Droplet className="w-14 h-14 text-cyan-400" />,
        title: { bn: "ডায়রিয়া ও পানিশূন্যতা", en: "Diarrhea & Dehydration" },
        warning: { bn: "ডায়রিয়া, মাথা ঘোরা, ডিহাইড্রেশন", en: "Diarrhea, dizziness, dehydration" },
        tips: {
          bn: ["পরিচ্ছন্ন পানি পান করুন", "ওআরএস ব্যবহার করুন", "গরমে বাইরে দীর্ঘ সময় থাকবেন না"],
          en: ["Drink clean water", "Use ORS", "Avoid long outdoor exposure in heat"],
        },
        awareness: { bn: "পরিষ্কার পানি ও খাবারই সেরা প্রতিরোধ।", en: "Clean water & food prevent disease." },
      },
    ],
  };

  const allTips = [
    { bn: "নিজেকে নিরাপদে রাখুন 🌸", en: "Keep yourself safe 🌸" },
    { bn: "হাত নিয়মিত ধুয়ে স্বাস্থ্য রক্ষা করুন 🧼", en: "Wash hands regularly 🧼" },
    { bn: "পর্যাপ্ত ঘুম ও বিশ্রাম স্বাস্থ্য রক্ষায় জরুরি 🌿", en: "Adequate sleep is essential 🌿" },
    { bn: "সঠিক সময়ে স্বাস্থ্য পরীক্ষা করান 🏥", en: "Get regular health checkups 🏥" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTipOfDay(allTips[Math.floor(Math.random() * allTips.length)][language]);
    }, 10000);
    return () => clearInterval(interval);
  }, [language]);

  function getCurrentSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 6 && month <= 9) return "Monsoon";
    else if (month >= 12 || month <= 2) return "Winter";
    else return "Summer";
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-blue-100 via-green-100 to-yellow-100 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">
        {language === "bn" ? "ঋতুর স্বাস্থ্য সতর্কতা 🌿" : "Seasonal Health Tips 🌿"}
      </h2>

      {/* Controls */}
      <div className="mb-6 flex items-center gap-4">
        <label className="mr-3 font-semibold text-lg">{language === "bn" ? "ঋতু পরিবর্তন করুন:" : "Select Season:"}</label>
        <select
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          <option value="Monsoon">{language === "bn" ? "বর্ষা" : "Monsoon"}</option>
          <option value="Winter">{language === "bn" ? "শীতকাল" : "Winter"}</option>
          <option value="Summer">{language === "bn" ? "গ্রীষ্ম" : "Summer"}</option>
        </select>
        <button
          onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
          className="bg-white px-4 py-2 rounded-xl shadow-md text-gray-800 hover:bg-gray-100"
        >
          {language === "bn" ? "English" : "বাংলা"}
        </button>
      </div>

      {/* Tip of the Day */}
      <motion.div
        className="mb-6 text-xl text-gray-700 italic p-4 bg-white/70 rounded-xl shadow font-semibold text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        🌸 {tipOfDay}
      </motion.div>

      {/* Seasonal Health Cards */}
      <div className="flex flex-col gap-6 w-full max-w-3xl">
        {seasonalData[season].map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg cursor-pointer"
            onClick={() =>
              setExpandedCard(expandedCard === item.id ? null : item.id)
            }
          >
            <div className="flex items-center gap-4">
              <div>{item.icon}</div>
              <h3 className="text-3xl font-bold">{item.title[language]}</h3>
            </div>

            {expandedCard === item.id && (
              <div className="mt-4 text-gray-800">
                <p className="font-semibold mb-2 text-lg">⚠️ {item.warning[language]}</p>
                <ul className="list-disc list-inside mb-2 space-y-1 text-lg">
                  {item.tips[language].map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
                <p className="italic text-green-600 text-lg">{item.awareness[language]}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Mission4;
