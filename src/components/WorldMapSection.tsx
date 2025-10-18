import { WorldMap } from "@/components/ui/world-map";
import { motion } from "framer-motion";

export function WorldMapSection() {
  return (
    <div className="py-40 dark:bg-black bg-white w-full">
      <div className="max-w-7xl mx-auto text-center px-4">
        <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
          Connectivité{" "}
          <span className="text-neutral-400">
            {"Mondiale".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          Présence internationale avec expertise locale. Nous servons nos clients à travers le monde 
          depuis nos bureaux stratégiquement positionnés.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <WorldMap
          dots={[
            {
              start: { lat: 33.5731, lng: -7.5898 }, // Morocco (Casablanca)
              end: { lat: 40.4168, lng: -3.7038 }, // Spain (Madrid)
            },
            {
              start: { lat: 33.5731, lng: -7.5898 }, // Morocco (Casablanca)
              end: { lat: 24.7136, lng: 46.6753 }, // Saudi Arabia (Riyadh)
            },
            {
              start: { lat: 40.4168, lng: -3.7038 }, // Spain (Madrid)
              end: { lat: 51.5074, lng: -0.1278 }, // London
            },
            {
              start: { lat: 24.7136, lng: 46.6753 }, // Saudi Arabia (Riyadh)
              end: { lat: 25.2048, lng: 55.2708 }, // Dubai
            },
            {
              start: { lat: 33.5731, lng: -7.5898 }, // Morocco
              end: { lat: 48.8566, lng: 2.3522 }, // Paris
            },
            {
              start: { lat: 40.4168, lng: -3.7038 }, // Madrid
              end: { lat: 41.9028, lng: 12.4964 }, // Rome
            },
          ]}
        />
      </div>
    </div>
  );
}
