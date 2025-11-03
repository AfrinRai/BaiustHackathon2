import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const Mission2 = () => {
  const [position, setPosition] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Step 1: Get user location
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setPosition([lat, lng]);

        // Step 2: Fetch nearest facilities
        try {
          const res = await axios.get(`http://localhost:5000/api/facilities/nearest?lat=${lat}&lng=${lng}`);
          setFacilities(res.data);
          localStorage.setItem("offlineFacilities", JSON.stringify(res.data)); // cache offline
        } catch (err) {
          console.error("Offline mode used", err);
          const cached = localStorage.getItem("offlineFacilities");
          if (cached) setFacilities(JSON.parse(cached));
        } finally {
          setLoading(false);
        }
      },
      () => {
        // Location denied or error
        alert("Location access denied. Showing cached data.");
        const cached = localStorage.getItem("offlineFacilities");
        if (cached) setFacilities(JSON.parse(cached));
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <p className="text-center mt-10">Fetching nearby health centers...</p>;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🏥 Nearby Health Facilities</h1>

      {position ? (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "500px", width: "80%", maxWidth: "900px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {/* User marker */}
          <Marker position={position}>
            <Popup>📍 You are here</Popup>
          </Marker>

          {/* Facility markers */}
          {facilities.map((f) => (
            <Marker
              key={f._id}
              position={[f.location.coordinates[1], f.location.coordinates[0]]}
            >
              <Popup>
                <strong>{f.name}</strong> <br />
                ধরন: {f.type} <br />
                দূরত্ব: {(f.distance / 1000).toFixed(2)} km <br />
                Landmark: {f.landmark || "নির্দিষ্ট নেই"}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p className="text-center">Detecting location...</p>
      )}

      {/* Fallback list */}
      <div className="mt-6 w-4/5 max-w-lg">
        <h2 className="text-2xl font-bold mb-2">📝 তালিকা দেখুন</h2>
        <ul className="list-disc pl-5">
          {facilities.map((f) => (
            <li key={f._id}>
              <strong>{f.name}</strong> ({f.type}) — Landmark: {f.landmark || "নির্দিষ্ট নেই"} — Distance: {(f.distance/1000).toFixed(2)} km
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Mission2;
