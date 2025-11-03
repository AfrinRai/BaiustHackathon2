// import React, { useState, useEffect } from "react";

// const Mission3 = () => {
//   const [helpText, setHelpText] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [language, setLanguage] = useState("bn"); // toggle: bn/en
//   const [online, setOnline] = useState(navigator.onLine);

//   // Detect online/offline
//   useEffect(() => {
//     const handleOnline = () => setOnline(true);
//     const handleOffline = () => setOnline(false);
//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);
//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, []);

//   const handleSubmit = () => {
//     if (!helpText.trim()) {
//       alert(language === "bn" ? "অনুগ্রহ করে কিছু লিখুন।" : "Please write something.");
//       return;
//     }

//     // Save locally if offline
//     if (!online) {
//       localStorage.setItem("queuedHelpRequest", helpText);
//       alert(
//         language === "bn"
//           ? "আপনার অনুরোধ সংরক্ষণ করা হয়েছে। অনলাইন হলে এটি স্বয়ংক্রিয়ভাবে পাঠানো হবে।"
//           : "Your request is saved locally. It will be sent automatically when online."
//       );
//     } else {
//       // Here you would call API to send anonymous request
//       alert(
//         language === "bn"
//           ? "আপনার অনুরোধ পাঠানো হয়েছে। 48 ঘণ্টার মধ্যে স্বেচ্ছাসেবক যোগাযোগ করবে।"
//           : "Your request has been sent. A volunteer will contact you within 48 hours."
//       );
//     }

//     setHelpText("");
//     setSubmitted(true);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#ffe0b2] via-[#fff3e0] to-[#ffe0b2] p-4">
      
//       {/* Language Toggle */}
//       <div className="absolute top-4 right-4">
//         <button
//           onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
//           className="bg-orange-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-orange-600 transition-all"
//         >
//           {language === "bn" ? "English" : "বাংলা"}
//         </button>
//       </div>

//       {/* Card */}
//       <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 relative">
//         <h1 className="text-3xl font-bold text-[#f57c00] mb-4 text-center">
//           {language === "bn" ? "গোপন সহায়তার অনুরোধ" : "Anonymous Help Request"}
//         </h1>

//         {/* Friendly mascot or illustration */}
//         <div className="flex justify-center mb-4">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/3079/3079183.png"
//             alt="Support"
//             className="w-24 h-24 animate-bounce"
//           />
//         </div>

//         {/* Instruction */}
//         <p className="text-center text-[#bf360c] mb-4 text-lg">
//           {language === "bn"
//             ? "আপনি আপনার পরিচয় প্রকাশ না করে সাহায্য চাইতে পারেন।"
//             : "You can request help without revealing your identity."}
//         </p>

//         {/* Offline alert */}
//         {!online && (
//           <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg text-center">
//             {language === "bn"
//               ? "আপনি বর্তমানে অফলাইনে আছেন। অনুরোধ সংরক্ষিত হবে।"
//               : "You are currently offline. Request will be saved locally."}
//           </div>
//         )}

//         {/* Textarea for help request */}
//         <textarea
//           value={helpText}
//           onChange={(e) => setHelpText(e.target.value)}
//           placeholder={
//             language === "bn"
//               ? "এখানে লিখুন আপনি কেমন সহায়তা চান..."
//               : "Write here what kind of help you need..."
//           }
//           className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-300 resize-none text-lg mb-6 placeholder-orange-200 transition-all"
//           rows={6}
//         ></textarea>

//         {/* Consent */}
//         <div className="flex items-center mb-6">
//           <input type="checkbox" id="consent" required className="mr-3 accent-orange-500" />
//           <label htmlFor="consent" className="text-[#bf360c] text-sm">
//             {language === "bn"
//               ? "আমি সম্মত। আমার অনুরোধ গোপনভাবে প্রক্রিয়াকৃত হবে।"
//               : "I consent. My request will be processed confidentially."}
//           </label>
//         </div>

//         {/* Submit Button */}
//         <button
//           onClick={handleSubmit}
//           className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold py-3 rounded-xl hover:from-orange-500 hover:to-orange-700 transition-all shadow-lg text-lg"
//         >
//           {language === "bn" ? "অনুরোধ পাঠান" : "Send Request"}
//         </button>

//         {/* Confirmation */}
//         {submitted && (
//           <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center font-semibold">
//             {language === "bn"
//               ? "আপনার অনুরোধ সফলভাবে প্রেরণ করা হয়েছে। স্বেচ্ছাসেবক 48 ঘণ্টার মধ্যে যোগাযোগ করবে।"
//               : "Your request has been sent successfully. Volunteer will contact within 48h."}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Mission3;



import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smile,
  Meh,
  Frown,
  Heart,
  Sun,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const Mission3 = () => {
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState("bn");
  const [emotion, setEmotion] = useState(null);
  const [helpType, setHelpType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [assurance, setAssurance] = useState("");
  const [recommendedOrgs, setRecommendedOrgs] = useState([]);
  const [peaceActivity, setPeaceActivity] = useState("");

  // Rotating messages & peace activities
  const messages = [
    { bn: "তুমি একা নও 🌸", en: "You are not alone 🌸" },
    { bn: "সব ঠিক হয়ে যাবে 💫", en: "Everything will be okay 💫" },
    { bn: "এভাবে সাহায্য চাওয়া একদম ঠিক 💛", en: "Asking for help is okay 💛" },
    { bn: "একটু গভীরভাবে নিঃশ্বাস নাও 🌿", en: "Take a deep breath 🌿" },
  ];

  const peaceActivities = [
    { bn: "৫ সেকেন্ড ধীরে ধীরে নিঃশ্বাস নাও, আবার ছাড়ো 🌬️", en: "Take a slow 5-second breath 🌬️" },
    { bn: "একটু চা খাও ☕ আর জানালার দিকে তাকাও 🌤️", en: "Have some tea ☕ and look outside 🌤️" },
    { bn: "এই মুহূর্তে তুমি নিরাপদ আছো 🕊️", en: "You are safe at this moment 🕊️" },
    { bn: "তুমি নিজের যত্ন নিচ্ছো, এটা খুবই সুন্দর 🌺", en: "Taking care of yourself is beautiful 🌺" },
  ];

  const ngos = [
    { name: "Moner Bondhu", area: "Emotional Support", desc: { bn: "অনুভূতির কথা বলার নিরাপদ স্থান 💬", en: "Safe space to express feelings 💬" } },
    { name: "BRAC Mental Health", area: "Stress Relief", desc: { bn: "চাপ ও উদ্বেগ মোকাবিলার সহায়তা 🌿", en: "Support for stress & anxiety 🌿" } },
    { name: "Kaan Pete Roi", area: "Listening Support", desc: { bn: "গোপনে শোনে, পাশে থাকে 💛", en: "Listens confidentially and supports 💛" } },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAssurance(messages[Math.floor(Math.random() * messages.length)][language]);
      setPeaceActivity(peaceActivities[Math.floor(Math.random() * peaceActivities.length)][language]);
    }, 7000);
    return () => clearInterval(interval);
  }, [language]);

  const handleNext = () => {
    if (step === 3) {
      // Suggest NGOs based on user input
      const input = helpType.toLowerCase();
      const matchedOrgs = ngos.filter(org =>
        (input.includes("stress") || input.includes("চাপ")) && org.area === "Stress Relief" ||
        (input.includes("alone") || input.includes("একাকী")) && org.area === "Emotional Support" ||
        (input.includes("listening") || input.includes("শোন")) && org.area === "Listening Support"
      );

      setRecommendedOrgs(matchedOrgs.length > 0 ? matchedOrgs : ngos);
      setSubmitted(true);
    } else {
      setStep(step + 1);
    }
  };

  const emotions = [
    { icon: <Sun className="w-16 h-16 text-yellow-400" />, label: { bn: "আনন্দিত", en: "Happy" } },
    { icon: <Smile className="w-16 h-16 text-green-400" />, label: { bn: "ভালো", en: "Good" } },
    { icon: <Meh className="w-16 h-16 text-orange-400" />, label: { bn: "ক্লান্ত", en: "Tired" } },
    { icon: <Frown className="w-16 h-16 text-blue-400" />, label: { bn: "দুঃখিত", en: "Sad" } },
    { icon: <Heart className="w-16 h-16 text-red-400" />, label: { bn: "একাকী", en: "Alone" } },
  ];

  return (
    <div className="relative min-h-screen flex flex-col md:flex-col justify-start items-center bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 overflow-x-hidden p-6">
      
      {/* Peace Space Section */}
      <div className="w-full md:w-1/2 p-6 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl mb-6 text-center">
        <h3 className="text-2xl font-semibold text-gray-700 mb-3">{language === "bn" ? "🌿 শান্তির কোণ" : "🌿 Peace Corner"}</h3>
        <p className="text-gray-700 text-lg">{peaceActivity}</p>
        <motion.div className="mt-6 ml-96">
            <Sun className="w-16 h-16 text-yellow-400 animate-bounce" />
        </motion.div>

      </div>

      {/* Main Card */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.7 }}
        className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full md:w-2/3 max-w-3xl text-gray-800 relative"
      >
        <h2 className="text-4xl font-bold text-center mb-6 text-blue-600">
          {language === "bn" ? "মন শান্তি সহায়তা 🌸" : "Mind Peace Support 🌸"}
        </h2>

        {/* Language Switch */}
        <button
          onClick={() => setLanguage(language === "en" ? "bn" : "en")}
          className="absolute top-8 right-8 bg-white/80 px-3 py-1 rounded-xl text-gray-700 shadow-md"
        >
          {language === "bn" ? "English" : "বাংলা"}
        </button>

        {!submitted ? (
          <>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div>
                  <p className="text-xl text-center mb-6">{language === "bn" ? "এই মুহূর্তে আপনি কেমন অনুভব করছেন?" : "How are you feeling right now?"}</p>
                  <div className="flex justify-around flex-wrap gap-4">
                    {emotions.map((emo, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setEmotion(emo.label[language])}
                        className={`p-4 rounded-full transition-all ${
                          emotion === emo.label[language]
                            ? "bg-white shadow-lg ring-4 ring-blue-300"
                            : "bg-transparent"
                        }`}
                      >
                        {emo.icon}
                        <p className="text-lg mt-2 text-gray-700">{emo.label[language]}</p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div>
                  <p className="text-xl text-center mb-4">{language === "bn" ? "আপনি কী ধরনের সহায়তা চান?" : "What kind of help do you need?"}</p>
                  <textarea
                    className="w-full p-4 rounded-xl border border-gray-300 text-lg focus:ring-2 focus:ring-blue-300 outline-none resize-none"
                    rows="5"
                    placeholder={language === "bn" ? "উদাহরণ: আমি অনেক চাপ অনুভব করছি..." : "Example: I feel stressed..."}
                    value={helpType}
                    onChange={(e) => setHelpType(e.target.value)}
                  ></textarea>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div className="text-center">
                  <p className="text-xl mb-6">{language === "bn" ? "এখন আমরা আপনার তথ্য নিরাপদভাবে পাঠাবো 💌" : "Now we will safely send your request 💌"}</p>
                  <button
                    onClick={() => handleNext()}
                    className="bg-blue-500 text-white text-lg px-6 py-3 rounded-xl hover:bg-blue-600 transition"
                  >
                    {language === "bn" ? "অনুরোধ পাঠান" : "Send Request"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Assurance Message */}
            <p className="text-center mt-8 text-lg text-gray-600 italic">{assurance}</p>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-1 text-gray-700 hover:text-blue-600 text-lg"
                >
                  <ArrowLeft /> {language === "bn" ? "ফিরে যান" : "Back"}
                </button>
              )}
              {step < 3 && (
                <button
                  onClick={() => setStep(step + 1)}
                  className="flex items-center gap-1 ml-auto bg-blue-400 text-white text-lg px-6 py-2 rounded-xl hover:bg-blue-500 transition"
                >
                  {language === "bn" ? "পরবর্তী" : "Next"} <ArrowRight />
                </button>
              )}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Heart className="w-20 h-20 text-pink-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-3xl font-semibold mb-4">{language === "bn" ? "আপনার অনুরোধ সফলভাবে পাঠানো হয়েছে 💌" : "Your request has been sent 💌"}</h3>
            <p className="text-lg mb-3">
              {language === "bn"
                ? "প্রশিক্ষিত স্বেচ্ছাসেবক নিম্নলিখিত সংস্থা থেকে ৪৮ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবে।"
                : "A trained volunteer from the following organizations will contact you within 48 hours."}
            </p>

            <div className="space-y-4 mt-4">
              {recommendedOrgs.map((org, i) => (
                <div key={i} className="bg-white/70 rounded-xl shadow-inner p-4 text-left">
                  <h4 className="text-2xl font-semibold text-blue-600 mb-1">{org.name}</h4>
                  <p className="text-gray-700 text-lg">{org.desc[language]}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 text-lg text-gray-700 italic">
              {language === "bn" ? "🌿 “তুমি সাহায্য চেয়েছো, এটা সাহসের কাজ।”" : "🌿 “You asked for help, that’s brave.”"}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Mission3;
