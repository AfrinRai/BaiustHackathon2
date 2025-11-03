import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, CloudRain, Droplet } from "lucide-react";
import axios from "axios";

const Mission4 = () => {
  const [season, setSeason] = useState(getCurrentSeason());
  const [expandedCard, setExpandedCard] = useState(null);
  const [language, setLanguage] = useState("bn");
  const [alerts, setAlerts] = useState([]);
  const [tipOfDay, setTipOfDay] = useState("");

  // Fetch seasonal alerts from backend
  const fetchSeasonalAlerts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/seasonal?season=${season}&lang=${language}`
      );
      setAlerts(res.data);

      // Pick a random tip for Tip of the Day
      if (res.data.length > 0) {
        const allTips = res.data.flatMap(alert => alert.tips);
        setTipOfDay(allTips[Math.floor(Math.random() * allTips.length)]);
      } else {
        setTipOfDay("❌ No tips available right now");
      }
    } catch (err) {
      console.error("Error fetching seasonal alerts:", err);
      setAlerts([]);
      setTipOfDay("❌ No tips available right now");
    }
  };

  useEffect(() => {
    fetchSeasonalAlerts();
  }, [season, language]);

  // Update Tip of the Day every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (alerts.length > 0) {
        const allTips = alerts.flatMap(alert => alert.tips);
        setTipOfDay(allTips[Math.floor(Math.random() * allTips.length)]);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [alerts]);

  function getCurrentSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 6 && month <= 9) return "Monsoon";
    else if (month >= 12 || month <= 2) return "Winter";
    else return "Summer";
  }

  // Map season to icon
  const seasonIcon = {
    Monsoon: <CloudRain className="w-14 h-14 text-blue-500 animate-bounce" />,
    Summer: <Sun className="w-14 h-14 text-orange-500 animate-pulse" />,
    Winter: <Droplet className="w-14 h-14 text-blue-400 animate-bounce" />,
  };

  // Dynamic gradient backgrounds per season
  const seasonBg = {
    Monsoon: "from-blue-200 via-cyan-100 to-green-200",
    Winter: "from-gray-200 via-blue-100 to-white",
    Summer: "from-yellow-200 via-orange-100 to-red-200",
  };

  return (
    <div
      className={`min-h-screen p-6 flex flex-col items-center bg-gradient-to-b ${seasonBg[season]} transition-all duration-1000`}
    >
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">
        {language === "bn" ? "ঋতুর স্বাস্থ্য সতর্কতা 🌿" : "Seasonal Health Tips 🌿"}
      </h2>

      {/* Controls */}
      <div className="mb-6 flex items-center gap-4">
        <label className="mr-3 font-semibold text-lg">
          {language === "bn" ? "ঋতু পরিবর্তন করুন:" : "Select Season:"}
        </label>
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

      {/* Tip of the Day with fade animation */}
      <AnimatePresence mode="wait">
        {tipOfDay && (
          <motion.div
            key={tipOfDay}
            className="mb-6 text-xl text-gray-700 italic p-4 bg-white/80 rounded-xl shadow font-semibold text-center w-full max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            🌸 {tipOfDay}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Seasonal Health Cards */}
      <div className="flex flex-col gap-6 w-full max-w-3xl">
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg cursor-pointer"
            onClick={() =>
              setExpandedCard(expandedCard === alert.id ? null : alert.id)
            }
          >
            <div className="flex items-center gap-4">
              <div>{seasonIcon[alert.season]}</div>
              <h3 className="text-3xl font-bold">{alert.title}</h3>
            </div>

            {expandedCard === alert.id && (
              <div className="mt-4 text-gray-800">
                <p className="font-semibold mb-2 text-lg">
                  ⚠️ {alert.warning}
                </p>
                {alert.tips.length > 0 && (
                  <ul className="list-disc list-inside mb-2 space-y-1 text-lg">
                    {alert.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                )}
                {alert.awareness && (
                  <p className="text-gray-600 italic mt-2">{alert.awareness}</p>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Mission4;
