import { assets, exclusiveOffers } from "../assets/assets";
import Title from "./Title";
import { motion } from "framer-motion";

export const ExclusiveOffers = () => {
  return (
    <section className="relative px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-28 bg-slate-50 overflow-hidden">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center justify-between w-full"
      >
        <Title
          align="left"
          title="Exclusive Offers"
          subtitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories"
        />
        <button className="group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12 tracking-widest text-gray-800 hover:text-[#49b9FF] transition-all">
          View All Offers
          <img
            src={assets.arrowIcon}
            alt="arrow-icon"
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </button>
      </motion.div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {exclusiveOffers.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="group relative flex flex-col justify-between gap-4 pt-16 px-6 pb-6 rounded-2xl text-white shadow-lg overflow-hidden"
            style={{ backgroundImage: `url(${item.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            {/* Discount Badge */}
            <p className="px-3 py-1 absolute top-4 left-4 text-xs bg-white/90 text-gray-800 font-medium rounded-full shadow">
              {item.priceOff}% OFF
            </p>

            {/* Content */}
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-medium font-playfair">{item.title}</p>
              <p className="text-gray-100">{item.description}</p>
              <p className="text-xs text-white/70 mt-2">Expires: {item.expiryDate}</p>
            </div>

            {/* Button */}
            <button className="flex items-center gap-2 font-medium cursor-pointer mt-4 text-white hover:text-[#49b9FF] transition-all">
              View Offer
              <img
                src={assets.arrowIcon}
                alt="arrow-icon"
                className="invert group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>

            {/* Overlay for subtle dark gradient */}
            <div className="absolute inset-0 bg-black/20 rounded-2xl pointer-events-none"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};