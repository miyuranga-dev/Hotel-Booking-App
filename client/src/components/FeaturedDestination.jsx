import { useAppContext } from "../context/AppContext";
import { HotelCard } from "./HotelCard";
import Title from "./Title";
import { motion } from "framer-motion";

function FeaturedDestination() {
  const { rooms, navigate } = useAppContext();

  return rooms.length > 0 && (
    <section className="flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20 overflow-hidden">
      
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Title
          title="Featured Destination"
          subtitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
        />
      </motion.div>

      {/* Hotel Cards */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
        {rooms.slice(0, 4).map((room, index) => (
          <motion.div
            key={room._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.8 }}
            viewport={{ once: true }}
            className="hover:scale-105 transition-transform duration-300"
          >
            <HotelCard room={room} index={index} />
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.button
        onClick={() => { navigate('/rooms'); scrollTo(0, 0); }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        viewport={{ once: true }}
        className="my-16 px-6 py-3 text-sm font-medium rounded-2xl border border-gray-300 bg-white text-gray-800 shadow hover:bg-gray-50 hover:shadow-lg transition-all cursor-pointer"
      >
        View All Destinations
      </motion.button>

    </section>
  );
}

export default FeaturedDestination;