import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, Heart, Droplet, Smile, Stethoscope } from "lucide-react";

const eventsData = [
  {
    id: 1,
    title_en: "Free Diabetes Screening",
    title_bn: "ফ্রি ডায়াবেটিস স্ক্রিনিং",
    type: "Health Checkup",
    location_en: "Upazila Health Center",
    location_bn: "উপজেলা স্বাস্থ্যকেন্দ্র",
    date: "2025-11-12",
    time: "10:00 AM - 4:00 PM",
    organizer_en: "Local Health Dept",
    organizer_bn: "স্থানীয় স্বাস্থ্য বিভাগ",
    description_en: "Free blood sugar checkup for all age groups.",
    description_bn: "সব বয়সের জন্য বিনামূল্যে রক্তে সুগার পরীক্ষা।",
    slots: 50,
    icon: Droplet,
    impact: { attended: 30, goal: 50 },
    tags: ["diabetes", "screening"]
  },
  {
    id: 2,
    title_en: "Blood Donation Drive",
    title_bn: "রক্তদান শিবির",
    type: "Donation",
    location_en: "Community Hall",
    location_bn: "কমিউনিটি হল",
    date: "2025-11-15",
    time: "9:00 AM - 1:00 PM",
    organizer_en: "Red Crescent",
    organizer_bn: "রেড ক্রিসেন্ট",
    description_en: "Donate blood and save lives.",
    description_bn: "রক্ত দিন এবং জীবন বাঁচান।",
    slots: 100,
    icon: Heart,
    impact: { attended: 60, goal: 100 },
    tags: ["blood", "donation"]
  },
  {
    id: 3,
    title_en: "Mental Health Awareness",
    title_bn: "মানসিক স্বাস্থ্য সচেতনতা",
    type: "Awareness",
    location_en: "Local School",
    location_bn: "স্থানীয় স্কুল",
    date: "2025-11-20",
    time: "11:00 AM - 1:00 PM",
    organizer_en: "NGO MindCare",
    organizer_bn: "এনজিও মাইন্ডকেয়ার",
    description_en: "Workshop on teen mental health and coping strategies.",
    description_bn: "কিশোর মানসিক স্বাস্থ্য ও মানসিক কৌশল বিষয়ক কর্মশালা।",
    slots: 30,
    icon: Smile,
    impact: { attended: 10, goal: 30 },
    tags: ["mental health", "workshop"]
  },
  {
    id: 4,
    title_en: "Vaccination Campaign",
    title_bn: "টিকাদান অভিযান",
    type: "Vaccination",
    location_en: "Upazila Clinic",
    location_bn: "উপজেলা ক্লিনিক",
    date: "2025-11-18",
    time: "8:00 AM - 3:00 PM",
    organizer_en: "Health Ministry",
    organizer_bn: "স্বাস্থ্য মন্ত্রণালয়",
    description_en: "Free vaccines for children under 5.",
    description_bn: "৫ বছরের নিচে শিশুদের জন্য বিনামূল্যে টিকা।",
    slots: 200,
    icon: Stethoscope,
    impact: { attended: 150, goal: 200 },
    tags: ["children", "vaccination"]
  }
];

const typeColors = {
  "Health Checkup": "bg-green-500",
  Donation: "bg-red-500",
  Awareness: "bg-yellow-500",
  Vaccination: "bg-blue-500"
};

const Mission7 = () => {
  const [language, setLanguage] = useState("bn");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rsvpList, setRsvpList] = useState([]);
  const [healthPoints, setHealthPoints] = useState(0);

  // Filter events by search term and date
  const filteredEvents = eventsData.filter(
    (e) =>
      ((language === "bn" ? e.title_bn : e.title_en)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        e.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (selectedDate ? e.date === selectedDate : true)
  );

  const handleRSVP = (event) => {
    if (!rsvpList.find((e) => e.id === event.id)) {
      setRsvpList([...rsvpList, event]);
      setHealthPoints((prev) => prev + 10);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-yellow-50 to-red-50 p-6 flex flex-col items-center">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-5xl mb-8 gap-4">
        <h1 className="text-5xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600">
          {language === "bn" ? "কমিউনিটি হেলথ ইভেন্টস" : "Community Health Events"}
        </h1>
        <button
          onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
          className="px-5 py-2 rounded-full border border-gray-300 shadow hover:bg-gray-100 transition"
        >
          {language === "bn" ? "English" : "বাংলা"}
        </button>
      </div>

      {/* Search + Date Filter */}
      <div className="w-full max-w-5xl mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={language === "bn" ? "ইভেন্ট/কীওয়ার্ড অনুসন্ধান করুন" : "Search event/keyword"}
          className="flex-1 px-4 py-4 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-green-300 text-lg sm:text-xl"
        />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-4 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-green-300 text-lg sm:text-xl"
        />
      </div>

      {/* Event List */}
      <div className="w-full max-w-5xl flex flex-col gap-6 relative">
        {filteredEvents.length === 0 ? (
          <p className="text-center text-gray-500 text-lg sm:text-xl">
            {language === "bn" ? "কোনও ইভেন্ট পাওয়া যায়নি" : "No events found"}
          </p>
        ) : (
          filteredEvents.map((event, idx) => {
            const Icon = event.icon || Stethoscope;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative flex items-start gap-4 bg-white p-6 sm:p-8 rounded-3xl shadow-lg border-l-8 cursor-pointer hover:scale-105 transition-transform"
                style={{ borderColor: typeColors[event.type] || "green" }}
                onClick={() => setSelectedEvent(event)}
              >
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-full ${typeColors[event.type]} text-white`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <div className="flex flex-col flex-1">
                  <h2 className="text-2xl sm:text-3xl font-semibold">
                    {language === "bn" ? event.title_bn : event.title_en}
                  </h2>
                  <div className="text-gray-500 text-sm sm:text-base flex flex-wrap gap-3 mt-1">
                    <span>{event.date}</span> | <span>{event.time}</span> |{" "}
                    <span>{language === "bn" ? event.location_bn : event.location_en}</span>
                  </div>
                  <p className="text-gray-700 mt-3 text-lg sm:text-xl">
                    {language === "bn" ? event.description_bn : event.description_en}
                  </p>
                  <div className="mt-4 w-full bg-gray-200 h-6 rounded-full overflow-hidden">
                    <motion.div
                      className={`${typeColors[event.type]} h-6 text-white font-semibold text-center text-sm sm:text-base`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(event.impact.attended / event.impact.goal) * 100}%` }}
                    >
                      {event.impact.attended}/{event.impact.goal}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* RSVP List */}
      {rsvpList.length > 0 && (
        <div className="w-full max-w-5xl mt-8 p-6 bg-blue-100 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold text-blue-700 mb-3">
            {language === "bn" ? "আপনি উপস্থিতি নিশ্চিত করেছেন" : "Your Confirmed Attendance"}
          </h3>
          <ul className="list-disc ml-6 text-lg sm:text-xl">
            {rsvpList.map((e) => (
              <li key={e.id}>{language === "bn" ? e.title_bn : e.title_en}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 flex justify-center items-end z-50 p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white rounded-t-3xl p-6 sm:p-8 w-full max-w-3xl shadow-xl overflow-y-auto max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold mb-3">
                {language === "bn" ? selectedEvent.title_bn : selectedEvent.title_en}
              </h2>
              <div className="text-gray-500 text-base sm:text-lg flex flex-wrap gap-2 mb-4">
                <span>{selectedEvent.date}</span> | <span>{selectedEvent.time}</span> |{" "}
                <span>{language === "bn" ? selectedEvent.location_bn : selectedEvent.location_en}</span>
              </div>
              <p className="text-gray-700 text-lg sm:text-xl mb-6">
                {language === "bn" ? selectedEvent.description_bn : selectedEvent.description_en}
              </p>
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-lg sm:text-xl"
                onClick={() => {
                  handleRSVP(selectedEvent);
                  setSelectedEvent(null);
                }}
              >
                {language === "bn" ? "উপস্থিতি নিশ্চিত করুন" : "Confirm Attendance"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Mission7;
