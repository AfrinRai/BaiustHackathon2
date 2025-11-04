// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaUserTie, FaUserNurse } from "react-icons/fa";
// import { GiHealthNormal } from "react-icons/gi";

// const chwData = [
//   {
//     id: 1,
//     name_en: "Sadia Afrin",
//     name_bn: "সাদিয়া আফরিন",
//     village_en: "Baiust Village",
//     village_bn: "বায়ুস্ট গ্রাম",
//     skills_bn: ["মানসিক সুস্থতা", "প্রাথমিক চিকিৎসা"],
//     skills_en: ["Mental Health", "First Aid"],
//     phone: "+880123456789",
//     whatsapp: true,
//     hours: "9AM - 6PM",
//     verified: "NGO MindCare",
//     gender: "female",
//     color: "bg-gradient-to-r from-pink-300 via-red-300 to-yellow-200",
//   },
//   {
//     id: 2,
//     name_en: "Rahim Uddin",
//     name_bn: "রাহিম উদ্দিন",
//     village_en: "Shonadanga",
//     village_bn: "শনাদাঙ্গা",
//     skills_bn: ["মাতৃ স্বাস্থ্য", "শিশুর যত্ন"],
//     skills_en: ["Maternal Health", "Child Health"],
//     phone: "+880987654321",
//     whatsapp: false,
//     hours: "10AM - 5PM",
//     verified: "Health Ministry",
//     gender: "male",
//     color: "bg-gradient-to-r from-green-200 via-green-300 to-green-400",
//   },
//   {
//     id: 3,
//     name_en: "Anika Rahman",
//     name_bn: "অনিকা রহমান",
//     village_en: "Pahartali",
//     village_bn: "পাহাড়তলী",
//     skills_bn: ["ডায়াবেটিস সহায়তা", "প্রাথমিক চিকিৎসা"],
//     skills_en: ["Diabetes Support", "First Aid"],
//     phone: "+880112233445",
//     whatsapp: true,
//     hours: "8AM - 4PM",
//     verified: "NGO HealthPlus",
//     gender: "female",
//     color: "bg-gradient-to-r from-purple-300 via-indigo-300 to-blue-300",
//   },
//   {
//     id: 4,
//     name_en: "Karim Hossain",
//     name_bn: "করিম হোসেন",
//     village_en: "Rampura",
//     village_bn: "রামপুরা",
//     skills_bn: ["শিশু স্বাস্থ্য", "মাতৃ স্বাস্থ্য"],
//     skills_en: ["Child Health", "Maternal Health"],
//     phone: "+880998877665",
//     whatsapp: false,
//     hours: "7AM - 3PM",
//     verified: "Health Ministry",
//     gender: "male",
//     color: "bg-gradient-to-r from-yellow-200 via-orange-300 to-red-200",
//   },
//   {
//     id: 5,
//     name_en: "Nusrat Jahan",
//     name_bn: "নুসরাত জাহান",
//     village_en: "Kawran Bazar",
//     village_bn: "কাওরান বাজার",
//     skills_bn: ["প্রাথমিক চিকিৎসা", "প্রাপ্তবয়স্ক রোগ সহায়তা"],
//     skills_en: ["First Aid", "Adult Disease Support"],
//     phone: "+880556677889",
//     whatsapp: true,
//     hours: "10AM - 6PM",
//     verified: "NGO MindCare",
//     gender: "female",
//     color: "bg-gradient-to-r from-pink-200 via-red-200 to-purple-300",
//   },
//   {
//     id: 6,
//     name_en: "Jamil Ahmed",
//     name_bn: "জামিল আহমেদ",
//     village_en: "Mirpur",
//     village_bn: "মিরপুর",
//     skills_bn: ["প্রাথমিক চিকিৎসা", "ডায়াবেটিস সহায়তা"],
//     skills_en: ["First Aid", "Diabetes Support"],
//     phone: "+880334455667",
//     whatsapp: false,
//     hours: "9AM - 5PM",
//     verified: "Health Ministry",
//     gender: "male",
//     color: "bg-gradient-to-r from-green-200 via-teal-300 to-blue-200",
//   },
//   {
//     id: 7,
//     name_en: "Fariha Tasnim",
//     name_bn: "ফারিহা তাসনিম",
//     village_en: "Uttara",
//     village_bn: "উত্তরা",
//     skills_bn: ["মানসিক সুস্থতা", "শিশু স্বাস্থ্য"],
//     skills_en: ["Mental Health", "Child Health"],
//     phone: "+880667788990",
//     whatsapp: true,
//     hours: "8AM - 4PM",
//     verified: "NGO HealthPlus",
//     gender: "female",
//     color: "bg-gradient-to-r from-purple-200 via-pink-300 to-red-200",
//   },
//   {
//     id: 8,
//     name_en: "Shafiqur Rahman",
//     name_bn: "শফিকুর রহমান",
//     village_en: "Motijheel",
//     village_bn: "মতিঝিল",
//     skills_bn: ["মাতৃ স্বাস্থ্য", "প্রাথমিক চিকিৎসা"],
//     skills_en: ["Maternal Health", "First Aid"],
//     phone: "+880778899001",
//     whatsapp: false,
//     hours: "7AM - 3PM",
//     verified: "NGO MindCare",
//     gender: "male",
//     color: "bg-gradient-to-r from-yellow-200 via-orange-300 to-red-300",
//   },
//   {
//     id: 9,
//     name_en: "Roksana Begum",
//     name_bn: "রোকসানা বেগম",
//     village_en: "Dhanmondi",
//     village_bn: "ধানমন্ডি",
//     skills_bn: ["ডায়াবেটিস সহায়তা", "মানসিক সুস্থতা"],
//     skills_en: ["Diabetes Support", "Mental Health"],
//     phone: "+880889900112",
//     whatsapp: true,
//     hours: "10AM - 6PM",
//     verified: "NGO HealthPlus",
//     gender: "female",
//     color: "bg-gradient-to-r from-pink-200 via-red-300 to-yellow-200",
//   },
//   {
//     id: 10,
//     name_en: "Tahmid Hasan",
//     name_bn: "তাহমিদ হাসান",
//     village_en: "Gulshan",
//     village_bn: "গুলশান",
//     skills_bn: ["প্রাথমিক চিকিৎসা", "প্রাপ্তবয়স্ক রোগ সহায়তা"],
//     skills_en: ["First Aid", "Adult Disease Support"],
//     phone: "+880223344556",
//     whatsapp: false,
//     hours: "9AM - 5PM",
//     verified: "Health Ministry",
//     gender: "male",
//     color: "bg-gradient-to-r from-green-200 via-teal-300 to-blue-300",
//   }
// ];

// const Mission8 = () => {
//   const [language, setLanguage] = useState("bn");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCHW, setSelectedCHW] = useState(null);

//   const filteredCHWs = chwData.filter(
//     (c) =>
//       (language === "bn" ? c.name_bn : c.name_en)
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       (language === "bn"
//         ? c.skills_bn.join(" ").toLowerCase()
//         : c.skills_en.join(" ").toLowerCase()
//       ).includes(searchTerm.toLowerCase()) ||
//       (language === "bn" ? c.village_bn : c.village_en)
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-10 flex flex-col items-center">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-7xl mb-10 gap-6">
//         <h1 className="text-6xl sm:text-5xl font-extrabold text-gray-900">
//           {language === "bn" ? "স্বেচ্ছাসেবক স্বাস্থ্যকর্মী" : "Volunteer Health Workers"}
//         </h1>
//         <button
//           onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
//           className="px-6 py-3 rounded-full border border-gray-400 shadow hover:bg-gray-300 transition text-xl font-semibold"
//         >
//           {language === "bn" ? "English" : "বাংলা"}
//         </button>
//       </div>

//       {/* Search */}
//       <div className="w-full max-w-7xl mb-10">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder={
//             language === "bn"
//               ? "নাম, দক্ষতা বা গ্রাম অনুসন্ধান করুন"
//               : "Search by name, skill, or village"
//           }
//           className="w-full px-6 py-5 rounded-2xl border-2 border-gray-400 focus:ring-4 focus:ring-indigo-300 text-2xl font-medium"
//         />
//       </div>

//       {/* Card Grid */}
//       <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//         {filteredCHWs.map((chw, idx) => (
//           <motion.div
//             key={chw.id}
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             whileHover={{ scale: 1.05 }}
//             transition={{ delay: idx * 0.05, type: "spring", stiffness: 200 }}
//             className={`rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-4xl ${chw.color}`}
//             onClick={() => setSelectedCHW(chw)}
//           >
//             {/* Icon Avatar */}
//             <div className="w-32 h-32 mb-6 flex items-center justify-center bg-white/30 rounded-full text-white text-6xl shadow-lg">
//               {chw.gender === "male" ? <FaUserTie /> : <FaUserNurse />}
//             </div>

//             <h2 className="text-3xl font-bold text-gray-900 mb-2">
//               {language === "bn" ? chw.name_bn : chw.name_en}
//             </h2>
//             <p className="text-gray-800 mb-4 text-xl">
//               {language === "bn" ? chw.village_bn : chw.village_en}
//             </p>
//             <div className="flex flex-wrap justify-center gap-3 mb-4">
//               {(language === "bn" ? chw.skills_bn : chw.skills_en).map((skill, i) => (
//                 <span
//                   key={i}
//                   className="bg-white/70 text-gray-900 px-4 py-2 rounded-full font-semibold text-lg shadow-sm flex items-center gap-2"
//                 >
//                   <GiHealthNormal /> {skill}
//                 </span>
//               ))}
//             </div>
//             <div className="flex items-center gap-2 mt-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6 text-green-600"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={3}
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//               <span className="text-green-700 font-semibold text-lg">
//                 {language === "bn" ? "প্রশিক্ষণপ্রাপ্ত" : "Verified"}
//               </span>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Modal */}
//       <AnimatePresence>
//         {selectedCHW && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-6"
//             onClick={() => setSelectedCHW(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.6 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.6 }}
//               transition={{ type: "spring", stiffness: 200 }}
//               className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="w-36 h-36 mx-auto mb-6 flex items-center justify-center bg-gray-100 rounded-full text-8xl text-gray-700 shadow-lg">
//                 {selectedCHW.gender === "male" ? <FaUserTie /> : <FaUserNurse />}
//               </div>
//               <h2 className="text-4xl font-bold mb-2 text-center">
//                 {language === "bn" ? selectedCHW.name_bn : selectedCHW.name_en}
//               </h2>
//               <p className="text-gray-700 mb-4 text-center text-xl">
//                 {language === "bn" ? selectedCHW.village_bn : selectedCHW.village_en}
//               </p>
//               <div className="flex flex-wrap justify-center gap-3 mb-4">
//                 {(language === "bn" ? selectedCHW.skills_bn : selectedCHW.skills_en).map(
//                   (skill, i) => (
//                     <span
//                       key={i}
//                       className="bg-indigo-200 text-indigo-900 px-4 py-2 rounded-full text-lg font-semibold flex items-center gap-2"
//                     >
//                       <GiHealthNormal /> {skill}
//                     </span>
//                   )
//                 )}
//               </div>
//               <p className="text-lg mb-2 text-center">
//                 {language === "bn" ? "ফোন নম্বর" : "Phone"}: {selectedCHW.phone}
//               </p>
//               <p className="text-lg mb-2 text-center">
//                 {language === "bn" ? "হোয়াটসঅ্যাপ" : "WhatsApp"}:{" "}
//                 {selectedCHW.whatsapp ? (language === "bn" ? "হ্যাঁ" : "Yes") : (language === "bn" ? "না" : "No")}
//               </p>
//               <p className="text-lg mb-4 text-center">
//                 {language === "bn" ? "যোগাযোগকাল" : "Reachable Hours"}: {selectedCHW.hours}
//               </p>
//               <p className="text-green-700 font-semibold text-center mb-4">
//                 {language === "bn" ? "প্রশিক্ষণপ্রাপ্ত" : "Verified"}: {selectedCHW.verified}
//               </p>
//               <button
//                 onClick={() => setSelectedCHW(null)}
//                 className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-2xl transition"
//               >
//                 {language === "bn" ? "বন্ধ করুন" : "Close"}
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Mission8;




import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiHealthNormal } from "react-icons/gi";

const chwData = [
  {
    id: 1,
    photoUrl: "https://www.shutterstock.com/image-photo/sylhet-bangladesh-29-may-2021-600nw-1989269567.jpg",
    name_en: "Salma Sultana",
    name_bn: "সালমা সুলতানা",
    village_en: "Kalakchua",
    village_bn: "কালাকচুয়া",
    skills_bn: ["মানসিক সুস্থতা", "প্রাথমিক চিকিৎসা"],
    skills_en: ["Mental Health", "First Aid"],
    phone: "+880123456789",
    whatsapp: true,
    hours: "9AM - 6PM",
    verified: "NGO MindCare",
    gender: "female",
    color: "bg-gradient-to-r from-pink-300 via-red-300 to-yellow-200",
  },
  {
    id: 2,
    photoUrl: "https://img.freepik.com/free-photo/medium-shot-smiley-man-posing_23-2149915892.jpg?semt=ais_hybrid&w=740&q=80",
    name_en: "Rahim Uddin",
    name_bn: "রহিম উদ্দিন",
    village_en: "Shonadanga",
    village_bn: "শনাদাঙ্গা",
    skills_bn: ["মাতৃ স্বাস্থ্য", "শিশুর যত্ন"],
    skills_en: ["Maternal Health", "Child Health"],
    phone: "+880987654321",
    whatsapp: false,
    hours: "10AM - 5PM",
    verified: "Health Ministry",
    gender: "male",
    color: "bg-gradient-to-r from-green-200 via-green-300 to-green-400",
  },
  {
    id: 3,
    photoUrl: "https://img.freepik.com/free-photo/smiling-female-student-doing-homework-desk_1262-5768.jpg?semt=ais_hybrid&w=740&q=80",
    name_en: "Anika Rahman",
    name_bn: "আনিকা রহমান",
    village_en: "Pahartali",
    village_bn: "পাহাড়তলী",
    skills_bn: ["ডায়াবেটিস সহায়তা", "প্রাথমিক চিকিৎসা"],
    skills_en: ["Diabetes Support", "First Aid"],
    phone: "+880112233445",
    whatsapp: true,
    hours: "8AM - 4PM",
    verified: "NGO HealthPlus",
    gender: "female",
    color: "bg-gradient-to-r from-purple-300 via-indigo-300 to-blue-300",
  },
  {
    id: 4,
    photoUrl: "https://www.shutterstock.com/image-photo/young-man-wearing-green-shirt-600nw-2158049963.jpg",
    name_en: "Karim Hossain",
    name_bn: "করিম হোসেন",
    village_en: "Rampura",
    village_bn: "রামপুরা",
    skills_bn: ["শিশু স্বাস্থ্য", "মাতৃ স্বাস্থ্য"],
    skills_en: ["Child Health", "Maternal Health"],
    phone: "+880998877665",
    whatsapp: false,
    hours: "7AM - 3PM",
    verified: "Health Ministry",
    gender: "male",
    color: "bg-gradient-to-r from-yellow-200 via-orange-300 to-red-200",
  },
  {
    id: 5,
    photoUrl: "https://media.istockphoto.com/id/1352606416/photo/young-woman-working-at-home-stock-photo.jpg?s=612x612&w=0&k=20&c=uKfBCoTeP54nA8KOzXDLIyoU31nZ4a4UreFE4p_x_3A=",
    name_en: "Nusrat Jahan",
    name_bn: "নুসরাত জাহান",
    village_en: "Kawran Bazar",
    village_bn: "কাওরান বাজার",
    skills_bn: ["প্রাথমিক চিকিৎসা", "প্রাপ্তবয়স্ক রোগ সহায়তা"],
    skills_en: ["First Aid", "Adult Disease Support"],
    phone: "+880556677889",
    whatsapp: true,
    hours: "10AM - 6PM",
    verified: "NGO MindCare",
    gender: "female",
    color: "bg-gradient-to-r from-pink-200 via-red-200 to-purple-300",
  },
  {
    id: 6,
    photoUrl: "https://media.istockphoto.com/id/2164916591/photo/portrait-of-young-man-against-sky.jpg?s=612x612&w=0&k=20&c=0-H7hVr6tuZi0DrriIeu7YxRM-_jNrYdzHM41e6wGrM=",
    name_en: "Jamil Ahmed",
    name_bn: "জামিল আহমেদ",
    village_en: "Mirpur",
    village_bn: "মিরপুর",
    skills_bn: ["প্রাথমিক চিকিৎসা", "ডায়াবেটিস সহায়তা"],
    skills_en: ["First Aid", "Diabetes Support"],
    phone: "+880334455667",
    whatsapp: false,
    hours: "9AM - 5PM",
    verified: "Health Ministry",
    gender: "male",
    color: "bg-gradient-to-r from-green-200 via-teal-300 to-blue-200",
  },
  {
    id: 7,
    photoUrl: "https://cdn.most.gov.bd/image/68cbd6cb45f05",
    name_en: "Fariha Tasnim",
    name_bn: "ফারিহা তাসনিম",
    village_en: "Uttara",
    village_bn: "উত্তরা",
    skills_bn: ["মানসিক সুস্থতা", "শিশু স্বাস্থ্য"],
    skills_en: ["Mental Health", "Child Health"],
    phone: "+880667788990",
    whatsapp: true,
    hours: "8AM - 4PM",
    verified: "NGO HealthPlus",
    gender: "female",
    color: "bg-gradient-to-r from-purple-200 via-pink-300 to-red-200",
  },
  {
    id: 8,
    photoUrl: "https://img.freepik.com/free-photo/successful-businessman_1098-18155.jpg",
    name_en: "Shafiqur Rahman",
    name_bn: "শফিকুর রহমান",
    village_en: "Motijheel",
    village_bn: "মতিঝিল",
    skills_bn: ["মাতৃ স্বাস্থ্য", "প্রাথমিক চিকিৎসা"],
    skills_en: ["Maternal Health", "First Aid"],
    phone: "+880778899001",
    whatsapp: false,
    hours: "7AM - 3PM",
    verified: "NGO MindCare",
    gender: "male",
    color: "bg-gradient-to-r from-yellow-200 via-orange-300 to-red-300",
  },
  {
    id: 9,
    photoUrl: "https://hr.bup.edu.bd/upload/picture/2791.jpg",
    name_en: "Roksana Begum",
    name_bn: "রোকসানা বেগম",
    village_en: "Dhanmondi",
    village_bn: "ধানমন্ডি",
    skills_bn: ["ডায়াবেটিস সহায়তা", "মানসিক সুস্থতা"],
    skills_en: ["Diabetes Support", "Mental Health"],
    phone: "+880889900112",
    whatsapp: true,
    hours: "10AM - 6PM",
    verified: "NGO HealthPlus",
    gender: "female",
    color: "bg-gradient-to-r from-pink-200 via-red-300 to-yellow-200",
  },
  {
    id: 10,
    photoUrl: "https://top10businessmeninbd.wordpress.com/wp-content/uploads/2014/05/top-10-businessmen-in-bangladesh-sayem-sobhan-anvir-managing-director-of-bashundhara-group.jpg?w=200",
    name_en: "Tahmid Hasan",
    name_bn: "তাহমিদ হাসান",
    village_en: "Gulshan",
    village_bn: "গুলশান",
    skills_bn: ["প্রাথমিক চিকিৎসা", "প্রাপ্তবয়স্ক রোগ সহায়তা"],
    skills_en: ["First Aid", "Adult Disease Support"],
    phone: "+880223344556",
    whatsapp: false,
    hours: "9AM - 5PM",
    verified: "Health Ministry",
    gender: "male",
    color: "bg-gradient-to-r from-green-200 via-teal-300 to-blue-300",
  },
];

const Mission8 = () => {
  const [language, setLanguage] = useState("bn");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCHW, setSelectedCHW] = useState(null);

  const filteredCHWs = chwData.filter(
    (c) =>
      (language === "bn" ? c.name_bn : c.name_en)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (language === "bn"
        ? c.skills_bn.join(" ").toLowerCase()
        : c.skills_en.join(" ").toLowerCase()
      ).includes(searchTerm.toLowerCase()) ||
      (language === "bn" ? c.village_bn : c.village_en)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-10 flex flex-col items-center">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-7xl mb-10 gap-6">
        <h1 className="text-6xl sm:text-5xl font-extrabold text-gray-900">
          {language === "bn" ? "স্বেচ্ছাসেবক স্বাস্থ্যকর্মী" : "Volunteer Health Workers"}
        </h1>
        <button
          onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
          className="px-6 py-3 rounded-full border border-gray-400 shadow hover:bg-gray-300 transition text-xl font-semibold"
        >
          {language === "bn" ? "English" : "বাংলা"}
        </button>
      </div>

      {/* Search */}
      <div className="w-full max-w-7xl mb-10">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={
            language === "bn"
              ? "নাম, দক্ষতা বা গ্রাম অনুসন্ধান করুন"
              : "Search by name, skill, or village"
          }
          className="w-full px-6 py-5 rounded-2xl border-2 border-gray-400 focus:ring-4 focus:ring-indigo-300 text-2xl font-medium"
        />
      </div>

      {/* Card Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredCHWs.map((chw, idx) => (
          <motion.div
            key={chw.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: idx * 0.05, type: "spring", stiffness: 200 }}
            className={`rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-4xl ${chw.color}`}
            onClick={() => setSelectedCHW(chw)}
          >
            {/* Avatar */}
            <div className="w-32 h-32 mb-6">
              <img
                src={chw.photoUrl}
                alt={language === "bn" ? chw.name_bn : chw.name_en}
                className="w-full h-full object-cover rounded-full shadow-lg"
              />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {language === "bn" ? chw.name_bn : chw.name_en}
            </h2>
            <p className="text-gray-800 mb-4 text-xl">
              {language === "bn" ? chw.village_bn : chw.village_en}
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {(language === "bn" ? chw.skills_bn : chw.skills_en).map((skill, i) => (
                <span
                  key={i}
                  className="bg-white/70 text-gray-900 px-4 py-2 rounded-full font-semibold text-lg shadow-sm flex items-center gap-2"
                >
                  <GiHealthNormal /> {skill}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-green-700 font-semibold text-lg">
                {language === "bn" ? "প্রশিক্ষণপ্রাপ্ত" : "Verified"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCHW && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-6"
            onClick={() => setSelectedCHW(null)}
          >
            <motion.div
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.6 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Avatar */}
              <div className="w-36 h-36 mx-auto mb-6">
                <img
                  src={selectedCHW.photoUrl}
                  alt={language === "bn" ? selectedCHW.name_bn : selectedCHW.name_en}
                  className="w-full h-full object-cover rounded-full shadow-lg"
                />
              </div>
              <h2 className="text-4xl font-bold mb-2 text-center">
                {language === "bn" ? selectedCHW.name_bn : selectedCHW.name_en}
              </h2>
              <p className="text-gray-700 mb-4 text-center text-xl">
                {language === "bn" ? selectedCHW.village_bn : selectedCHW.village_en}
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-4">
                {(language === "bn" ? selectedCHW.skills_bn : selectedCHW.skills_en).map(
                  (skill, i) => (
                    <span
                      key={i}
                      className="bg-indigo-200 text-indigo-900 px-4 py-2 rounded-full text-lg font-semibold flex items-center gap-2"
                    >
                      <GiHealthNormal /> {skill}
                    </span>
                  )
                )}
              </div>
              <p className="text-lg mb-2 text-center">
                {language === "bn" ? "ফোন নম্বর" : "Phone"}: {selectedCHW.phone}
              </p>
              <p className="text-lg mb-2 text-center">
                {language === "bn" ? "হোয়াটসঅ্যাপ" : "WhatsApp"}:{" "}
                {selectedCHW.whatsapp ? (language === "bn" ? "হ্যাঁ" : "Yes") : (language === "bn" ? "না" : "No")}
              </p>
              <p className="text-lg mb-4 text-center">
                {language === "bn" ? "যোগাযোগকাল" : "Reachable Hours"}: {selectedCHW.hours}
              </p>
              <p className="text-green-700 font-semibold text-center mb-4">
                {language === "bn" ? "প্রশিক্ষণপ্রাপ্ত" : "Verified"}: {selectedCHW.verified}
              </p>
              <button
                onClick={() => setSelectedCHW(null)}
                className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-2xl transition"
              >
                {language === "bn" ? "বন্ধ করুন" : "Close"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Mission8;
