import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Thermometer,
  Heart,
  Droplet,
  Smile,
  Stethoscope,
  AlertTriangle
} from "lucide-react";

const diseasesData = [
  {
    name_en: "Diarrhea",
    name_bn: "ডায়রিয়া",
    icon: Droplet,
    warnings: [
      "Mild: 1-2 loose stools/day",
      "Moderate: 3-5 loose stools/day, mild dehydration",
      "Severe: 6+ loose stools/day, blood in stool, severe dehydration",
      "Persistent: More than 5 days, risk of malnutrition"
    ],
    warnings_bn: [
      "হালকা: দিনে ১-২ বার পাতলা পায়খানা",
      "মধ্যম: দিনে ৩-৫ বার পাতলা পায়খানা, সামান্য পানিশূন্যতা",
      "গুরুতর: দিনে ৬+ বার পাতলা পায়খানা, রক্তযুক্ত, তীব্র পানিশূন্যতা",
      "ধারাবাহিক: ৫+ দিন ধরে চলতে থাকলে, পুষ্টিহ্রাসের ঝুঁকি"
    ],
    advice: [
      "Mild: Hydrate with clean water and continue normal diet.",
      "Moderate: Give ORS, maintain hygiene, watch for dehydration.",
      "Severe: Seek medical attention immediately, continue ORS.",
      "Persistent: Medical follow-up, assess for malnutrition, consider probiotics."
    ],
    advice_bn: [
      "হালকা: পরিষ্কার পানি পান করান এবং স্বাভাবিক খাদ্য চালিয়ে যান।",
      "মধ্যম: ORS দিন, পরিচ্ছন্নতা বজায় রাখুন, পানিশূন্যতা লক্ষ্য করুন।",
      "গুরুতর: অবিলম্বে ডাক্তার দেখান, ORS চালিয়ে যান।",
      "ধারাবাহিক: চিকিৎসকের পরামর্শ নিন, পুষ্টি যাচাই করুন, প্রোবায়োটিক বিবেচনা করুন।"
    ],
    examples: [
      "Child with 4 loose stools in one day.",
      "Adult with watery stools for 3+ days.",
      "Infant with persistent diarrhea for a week."
    ],
    examples_bn: [
      "একটি শিশু এক দিনে ৪ বার পাতলা পায়খানা করছে।",
      "একজন প্রাপ্তবয়স্ক ৩+ দিন ধরে পাতলা পায়খানা করছে।",
      "শিশু এক সপ্তাহ ধরে ধারাবাহিক ডায়রিয়া করছে।"
    ],
    cultural: [
      "Avoid giving unproven herbal concoctions or garlic water.",
      "Do not stop breastfeeding the child."
    ],
    cultural_bn: [
      "প্রমাণহীন হার্বাল বা রসুনের পানি দেবেন না।",
      "শিশুর স্তন্যপান বন্ধ করবেন না।"
    ]
  },
  {
    name_en: "Chest Pain",
    name_bn: "বুকের ব্যথা",
    icon: Heart,
    warnings: [
      "Mild: Occasional tightness, no other symptoms",
      "Moderate: Frequent tightness, mild shortness of breath",
      "Serious: Persistent sharp pain, dizziness, sweating, nausea",
      "Emergency: Chest pain with fainting, severe shortness of breath"
    ],
    warnings_bn: [
      "হালকা: মাঝে মাঝে চাপ অনুভব, অন্য কোনো লক্ষণ নেই",
      "মধ্যম: ঘন ঘন চাপ অনুভব, সামান্য শ্বাসকষ্ট",
      "গুরুতর: ধারাবাহিক তীব্র ব্যথা, মাথা ঘোরা, ঘাম, বমি",
      "জরুরি: চেস্ট পেইন সহ মূর্ছা, তীব্র শ্বাসকষ্ট"
    ],
    advice: [
      "Mild: Rest, monitor symptoms.",
      "Moderate: Avoid heavy activity, monitor closely, consult doctor if worsens.",
      "Serious: Seek medical attention immediately.",
      "Emergency: Call emergency services and go to hospital."
    ],
    advice_bn: [
      "হালকা: বিশ্রাম নিন, লক্ষণ পর্যবেক্ষণ করুন।",
      "মধ্যম: ভারী কাজ এড়ান, সতর্কভাবে পর্যবেক্ষণ করুন, খারাপ হলে ডাক্তার দেখান।",
      "গুরুতর: অবিলম্বে ডাক্তার দেখান।",
      "জরুরি: জরুরি সেবা কল করুন এবং হাসপাতালে যান।"
    ],
    examples: [
      "Adult feels tightness during climbing stairs.",
      "Middle-aged person with chest pain and mild dizziness.",
      "Elderly person with severe chest pain and sweating."
    ],
    examples_bn: [
      "একজন প্রাপ্তবয়স্ক সিঁড়ি ওঠার সময় চাপে অনুভব করছে।",
      "মধ্যবয়সী ব্যক্তি বুকের ব্যথা ও সামান্য মাথা ঘোরা অনুভব করছে।",
      "বৃদ্ধ ব্যক্তি তীব্র বুকের ব্যথা ও ঘাম অনুভব করছে।"
    ],
    cultural: [
      "Do not rely solely on home remedies like mustard oil massage.",
      "Avoid delaying hospital visit due to fear of hospitals."
    ],
    cultural_bn: [
      "মাস্টার্ড অয়েল ম্যাসেজের মতো ঘরোয়া চিকিৎসায় ভরসা করবেন না।",
      "হাসপাতাল ভয়ের কারণে চিকিৎসা বিলম্ব করবেন না।"
    ]
  },
  {
    name_en: "Fever",
    name_bn: "জ্বর",
    icon: Thermometer,
    warnings: [
      "Low-grade: 37–38°C, minor discomfort",
      "Moderate: 38–39°C, may include chills or mild headache",
      "High: >39°C or persistent >3 days, risk of dehydration",
      "Emergency: Fever with rash, difficulty breathing, or convulsions"
    ],
    warnings_bn: [
      "হালকা: ৩৭–৩৮°C, সামান্য অস্বস্তি",
      "মধ্যম: ৩৮–৩৯°C, শীতলতা বা সামান্য মাথাব্যথা থাকতে পারে",
      "উচ্চ: ৩৯°C এর বেশি বা ৩+ দিন ধরে জ্বর, পানিশূন্যতার ঝুঁকি",
      "জরুরি: জ্বরের সঙ্গে র‍্যাশ, শ্বাসকষ্ট, বা খিঁচুনি"
    ],
    advice: [
      "Low-grade: Rest, hydrate, light meals.",
      "Moderate: Paracetamol as per instructions, monitor temperature.",
      "High: Seek medical attention, continue hydration.",
      "Emergency: Go to hospital immediately."
    ],
    advice_bn: [
      "হালকা: বিশ্রাম নিন, জল পান করুন, হালকা খাবার খান।",
      "মধ্যম: নির্দেশ অনুযায়ী প্যারাসিটামল, তাপমাত্রা পর্যবেক্ষণ করুন।",
      "উচ্চ: ডাক্তার দেখান, জল পান চালিয়ে যান।",
      "জরুরি: অবিলম্বে হাসপাতালে যান।"
    ],
    examples: [
      "Child with 38°C fever for one day.",
      "Adult with 40°C fever for 2 days.",
      "Child with fever, rash, and lethargy."
    ],
    examples_bn: [
      "একটি শিশু এক দিন ধরে ৩৮°C জ্বর।",
      "একজন প্রাপ্তবয়স্ক ২ দিন ধরে ৪০°C জ্বর।",
      "শিশু জ্বর, র‍্যাশ এবং অবসন্নতা অনুভব করছে।"
    ],
    cultural: [
      "Avoid raw honey or herbal mixtures without guidance.",
      "Do not immediately give cold baths for high fever."
    ],
    cultural_bn: [
      "নির্দেশ ছাড়া কাঁচা মধু বা হার্বাল মিশ্রণ দেবেন না।",
      "উচ্চ জ্বর হলে হঠাৎ ঠান্ডা স্নান দেবেন না।"
    ]
  },
  {
    name_en: "Persistent Sadness",
    name_bn: "দীর্ঘদিন মন খারাপ",
    icon: Smile,
    warnings: [
      "Mild: Feeling sad for >2 weeks, mild loss of interest",
      "Moderate: Difficulty enjoying usual activities, sleep disturbances",
      "Severe: Thoughts of self-harm, extreme hopelessness",
      "Emergency: Suicidal ideation or self-injury risk"
    ],
    warnings_bn: [
      "হালকা: ২+ সপ্তাহ ধরে মন খারাপ, সামান্য আগ্রহ কমে যাওয়া",
      "মধ্যম: সাধারণ কার্যক্রমে আগ্রহ কমে যাওয়া, ঘুমের সমস্যা",
      "গুরুতর: আত্মহত্যার চিন্তা, চরম হতাশা",
      "জরুরি: আত্মহত্যার চিন্তা বা নিজেকে ক্ষতি করার ঝুঁকি"
    ],
    advice: [
      "Talk to a trusted friend or family member.",
      "Consult a counselor if symptoms persist.",
      "Seek mental health professional immediately for severe symptoms.",
      "Emergency: Call helpline or hospital."
    ],
    advice_bn: [
      "বিশ্বাসযোগ্য বন্ধু বা পরিবারের সঙ্গে কথা বলুন।",
      "লক্ষণ চলতে থাকলে কাউন্সেলরের পরামর্শ নিন।",
      "গুরুতর লক্ষণ হলে মানসিক স্বাস্থ্য বিশেষজ্ঞ দেখান।",
      "জরুরি: হেল্পলাইন বা হাসপাতালে কল করুন।"
    ],
    examples: [
      "Teenager not enjoying school for 3 weeks.",
      "Adult losing interest in hobbies for 2+ weeks.",
      "Person unable to perform daily tasks due to sadness."
    ],
    examples_bn: [
      "কিশোর ৩ সপ্তাহ ধরে স্কুলে আগ্রহ হারিয়েছে।",
      "প্রাপ্তবয়স্ক ২+ সপ্তাহ ধরে শখে আগ্রহ হারিয়েছে।",
      "ব্যক্তি দৈনন্দিন কাজ করতে অক্ষম মন খারাপের কারণে।"
    ],
    cultural: [
      "Avoid telling them to 'toughen up'.",
      "Do not ignore their feelings or isolate them."
    ],
    cultural_bn: [
      "তাদেরকে 'মজবুত হও' বলবেন না।",
      "তাদের অনুভূতি উপেক্ষা করবেন না বা আলাদা করবেন না।"
    ]
  },
  {
    name_en: "Cough & Cold",
    name_bn: "কাশি ও ঠান্ডা",
    icon: Stethoscope,
    warnings: [
      "Mild: Occasional cough, no fever",
      "Moderate: Persistent cough, mild fever",
      "Severe: Breathing difficulty, high fever, chest pain",
      "Emergency: Shortness of breath with lips/face turning blue"
    ],
    warnings_bn: [
      "হালকা: মাঝে মাঝে কাশি, জ্বর নেই",
      "মধ্যম: ধারাবাহিক কাশি, সামান্য জ্বর",
      "গুরুতর: শ্বাসকষ্ট, উচ্চ জ্বর, বুকের ব্যথা",
      "জরুরি: শ্বাসকষ্ট, ঠোঁট/মুখ নীল হয়ে গেলে"
    ],
    advice: [
      "Mild: Rest, hydrate.",
      "Moderate: Monitor symptoms, consider humidifier, see doctor if persists.",
      "Severe: Consult doctor immediately.",
      "Emergency: Call emergency services."
    ],
    advice_bn: [
      "হালকা: বিশ্রাম নিন, জল পান করুন।",
      "মধ্যম: লক্ষণ পর্যবেক্ষণ করুন, হিউমিডিফায়ার ব্যবহার করতে পারেন, চলতে থাকলে ডাক্তার দেখান।",
      "গুরুতর: অবিলম্বে ডাক্তার দেখান।",
      "জরুরি: জরুরি সেবা কল করুন।"
    ],
    examples: [
      "Child with persistent cough for 5 days.",
      "Adult with fever and difficulty breathing.",
      "Infant with chest congestion and wheezing."
    ],
    examples_bn: [
      "শিশু ৫ দিন ধরে ধারাবাহিক কাশি করছে।",
      "প্রাপ্তবয়স্ক জ্বর ও শ্বাসকষ্ট অনুভব করছে।",
      "শিশু বুক জবড়া এবং শ্বাস ফুঁফুঁ করছে।"
    ],
    cultural: [
      "Avoid giving antibiotics without prescription.",
      "Do not rely on unproven herbal remedies alone."
    ],
    cultural_bn: [
      "প্রেসক্রিপশন ছাড়া অ্যান্টিবায়োটিক দেবেন না।",
      "প্রমাণহীন ঘরোয়া চিকিৎসার ওপর নির্ভর করবেন না।"
    ]
  },
  {
    name_en: "Vomiting",
    name_bn: "বমি",
    icon: Droplet,
    warnings: [
      "Mild: 1-2 times/day, no dehydration",
      "Moderate: 3-5 times/day, mild dehydration",
      "Severe: Continuous vomiting, signs of dehydration",
      "Emergency: Vomiting with lethargy or blood"
    ],
    warnings_bn: [
      "হালকা: দিনে ১-২ বার, পানিশূন্যতা নেই",
      "মধ্যম: দিনে ৩-৫ বার, সামান্য পানিশূন্যতা",
      "গুরুতর: ধারাবাহিক বমি, পানিশূন্যতার লক্ষণ",
      "জরুরি: বমি সহ অবসন্নতা বা রক্ত"
    ],
    advice: [
      "Mild: Hydrate and rest.",
      "Moderate: Give ORS, monitor hydration, light diet.",
      "Severe: Seek medical attention, continue hydration.",
      "Emergency: Go to hospital immediately."
    ],
    advice_bn: [
      "হালকা: জল পান করান এবং বিশ্রাম নিন।",
      "মধ্যম: ORS দিন, পানিশূন্যতা লক্ষ্য করুন, হালকা খাদ্য।",
      "গুরুতর: চিকিৎসকের পরামর্শ নিন, জল পান চালিয়ে যান।",
      "জরুরি: অবিলম্বে হাসপাতালে যান।"
    ],
    examples: [
      "Infant vomiting 3+ times in a day.",
      "Child with persistent vomiting and lethargy.",
      "Adult vomiting with nausea and dizziness."
    ],
    examples_bn: [
      "শিশু এক দিনে ৩+ বার বমি করছে।",
      "শিশু ধারাবাহিক বমি করছে এবং অবসন্ন।",
      "প্রাপ্তবয়স্ক বমি করছে, বমি এবং মাথা ঘোরা।"
    ],
    cultural: [
      "Do not give herbal pastes or oil-based remedies.",
      "Avoid stopping breastfeeding abruptly."
    ],
    cultural_bn: [
      "হার্বাল পেস্ট বা তেলভিত্তিক চিকিৎসা দেবেন না।",
      "স্তন্যপান হঠাৎ বন্ধ করবেন না।"
    ]
  }
];


const Mission6 = () => {
  const [language, setLanguage] = useState("bn");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [alerts, setAlerts] = useState([]);

  const filteredDiseases = diseasesData.filter((d) =>
    (language === "bn" ? d.name_bn : d.name_en)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleLogAlert = (disease) => {
    setAlerts([...alerts, disease]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 flex flex-col items-center p-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-6xl mb-8 gap-4">
        <h1 className="text-4xl font-bold text-gray-800 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          {language === "bn" ? "লক্ষণ সচেতনতা গাইড" : "Symptom Awareness Guide"}
        </h1>
        <button
          onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
          className="bg-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
        >
          {language === "bn" ? "English" : "বাংলা"}
        </button>
      </div>

      {/* Search */}
      <div className="w-full max-w-6xl mb-6 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={
            language === "bn" ? "রোগ/লক্ষণ অনুসন্ধান করুন" : "Search disease/symptom"
          }
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-200 text-lg transition-all duration-300"
        />
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="w-full max-w-6xl mb-6 p-4 bg-red-100 rounded-2xl shadow-md space-y-2">
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            {language === "bn" ? "লগ করা সতর্কতা" : "Logged Alerts"}
          </h2>
          <ul className="list-disc ml-6">
            {alerts.map((a, idx) => (
              <li key={idx} className="text-red-700">
                {language === "bn" ? a.name_bn : a.name_en}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Disease Cards */}
      <div className="w-full max-w-6xl flex flex-wrap gap-4 py-4 px-2 justify-center">
        {filteredDiseases.map((d, idx) => {
          const Icon = d.icon || AlertTriangle;
          return (
            <motion.div
              key={idx}
              layout
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-[220px] sm:w-[250px] bg-white rounded-3xl p-6 shadow-lg cursor-pointer flex flex-col items-center justify-center border-2 border-gray-200"
              onClick={() => setSelectedDisease(d)}
            >
              <Icon className="w-10 h-10 text-red-500 mb-3" />
              <span className="font-semibold text-center text-xl">
                {language === "bn" ? d.name_bn : d.name_en}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Disease Detail Modal */}
      <AnimatePresence>
        {selectedDisease && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4"
            onClick={() => setSelectedDisease(null)}
          >
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              className="bg-white rounded-3xl p-8 max-w-3xl w-full shadow-2xl overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold mb-6">
                {language === "bn" ? selectedDisease.name_bn : selectedDisease.name_en}
              </h2>

              {/* Warnings */}
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-red-700 mb-2">
                  {language === "bn" ? "সতর্কতা" : "Warning"}
                </h3>
                <ul className="list-disc ml-6 space-y-2 text-lg">
                  {(language === "bn" ? selectedDisease.warnings_bn : selectedDisease.warnings).map(
                    (w, i) => <li key={i}>{w}</li>
                  )}
                </ul>
              </div>

              {/* Advice */}
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-blue-700 mb-2">
                  {language === "bn" ? "পরামর্শ" : "Advice"}
                </h3>
                <ul className="list-disc ml-6 space-y-2 text-lg">
                  {(language === "bn" ? selectedDisease.advice_bn : selectedDisease.advice).map(
                    (a, i) => <li key={i}>{a}</li>
                  )}
                </ul>
              </div>

              {/* Examples */}
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-green-700 mb-2">
                  {language === "bn" ? "উদাহরণ" : "Example"}
                </h3>
                <ul className="list-disc ml-6 space-y-2 text-lg">
                  {(language === "bn" ? selectedDisease.examples_bn : selectedDisease.examples).map(
                    (e, i) => <li key={i}>{e}</li>
                  )}
                </ul>
              </div>

              {/* Cultural Advice */}
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-orange-700 mb-2">
                  {language === "bn" ? "প্রথাগত পরামর্শ" : "Traditional Advice"}
                </h3>
                <ul className="list-disc ml-6 space-y-2 text-lg">
                  {(language === "bn" ? selectedDisease.cultural_bn : selectedDisease.cultural).map(
                    (c, i) => <li key={i}>{c}</li>
                  )}
                </ul>
              </div>

              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-lg mt-4 w-full"
                onClick={() => {
                  handleLogAlert(selectedDisease);
                  setSelectedDisease(null);
                }}
              >
                {language === "bn" ? "লগ করুন" : "Log Alert"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Mission6;
