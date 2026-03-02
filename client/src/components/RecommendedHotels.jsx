import { useAppContext } from "../context/AppContext";
import { HotelCard } from "./HotelCard";
import Title from "./Title";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function RecommendedHotels() {
  const { rooms, searchedCities } = useAppContext();
  const [recommended, setRecommended] = useState([]);

  const filterHotels = () => {
    const filteredHotels = rooms
      .slice()
      .filter((room) => searchedCities.includes(room.hotel.city));
    setRecommended(filteredHotels);
  };

  useEffect(() => {
    filterHotels();
  }, [rooms, searchedCities]);

  if (recommended.length === 0) return null;

  return (
    <section className="relative px-6 md:px-16 lg:px-24 py-24 bg-gradient-to-b from-white to-slate-100 overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Title
          title="Recommended Hotels"
          subtitle="Discover our handpicked selection of exceptional properties offering refined comfort and unforgettable experiences."
        />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
        {recommended.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>
    </section>
  );
}

export default RecommendedHotels;