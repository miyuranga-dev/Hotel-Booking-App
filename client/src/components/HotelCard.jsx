import { Link } from "react-router";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

export const HotelCard = ({ room, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.7 }}
      viewport={{ once: true }}
    >
      <Link
        to={"/rooms/" + room._id}
        onClick={() => scrollTo(0, 0)}
        className="group relative rounded-3xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500"
      >
        {/* Image */}
        <div className="overflow-hidden">
          <img
            src={room.images[0]}
            alt="hotel"
            className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        {/* Badge */}
        {index % 2 === 0 && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-xs font-semibold px-4 py-1 rounded-full shadow-md">
            Best Seller
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-playfair text-lg font-semibold text-gray-800">
              {room.hotel.name}
            </h3>
            <div className="flex items-center gap-1 text-sm font-medium">
              <img src={assets.starIconFilled} alt="star" className="w-4" />
              4.5
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <img src={assets.locationIcon} alt="location" className="w-4" />
            <span className="truncate">{room.hotel.address}</span>
          </div>

          <div className="flex items-center justify-between mt-6">
            <p className="text-gray-800 font-semibold">
              <span className="text-2xl">LKR {room.pricePerNight}</span>
              <span className="text-sm text-gray-500"> / night</span>
            </p>

            <button className="px-5 py-2 text-sm font-medium rounded-xl bg-black text-white hover:bg-[#49b9FF] transition-all duration-300 shadow-md hover:shadow-xl">
              Book Now
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};