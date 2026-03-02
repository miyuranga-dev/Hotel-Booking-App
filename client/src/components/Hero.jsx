import { useState } from "react"
import { assets, cities } from "../assets/assets"
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

function Hero() {
  const [destination, setDestination] = useState("");
  const { navigate, getToken, axios, setSearchedCities } = useAppContext();

  const onSearch = async (e) => {
    e.preventDefault();
    navigate(`/rooms?destination=${destination}`);
    //call api to save recent searched city
    await axios.post('/api/user/store-recent-search', { recentSearchedCity: destination }, { headers: { Authorization: `Bearer ${await getToken()}` } });
    //add destination to searched city max 3 recent searched cities
    setSearchedCities((prevSearchedCities) => {
      const updatedSearchedCities = [...prevSearchedCities, destination];
      if (updatedSearchedCities.length > 3) {
        updatedSearchedCities.shift();
      }
      return updatedSearchedCities;
    })
  }

  return (
  <section className="relative min-h-screen flex items-center justify-center bg-[url('/src/assets/heroImage.png')] bg-cover bg-center">

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative z-10 w-full max-w-6xl px-6 md:px-16 text-white text-center"
    >

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="inline-block mb-6 px-5 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-sm tracking-widest uppercase"
      >
        Luxury Hotel Booking
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
      >
        Find Your Next <span className="text-[#49b9FF]">Luxury Escape</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="mt-6 text-white/80 max-w-2xl mx-auto text-base md:text-lg"
      >
        Discover hand-picked hotels and unforgettable stays across the world.
        Comfort, elegance, and seamless booking — all in one place.
      </motion.p>

      {/* Search Card */}
      <motion.form
        onSubmit={onSearch}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-12 bg-white/95 backdrop-blur-2xl shadow-2xl rounded-3xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-5 gap-6 text-left"
      >

        {/* Destination */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Destination
          </label>
          <input
            onChange={(e) => setDestination(e.target.value)}
            value={destination}
            list="destinations"
            type="text"
            placeholder="Where are you going?"
            required
            className="mt-2 text-gray-800 font-medium border-b border-gray-200 focus:border-black outline-none pb-2 bg-transparent"
          />
          <datalist id="destinations">
            {cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </div>

        {/* Check In */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Check In
          </label>
          <input
            type="date"
            className="mt-2 text-gray-800 border-b border-gray-200 focus:border-black outline-none pb-2 bg-transparent"
          />
        </div>

        {/* Check Out */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Check Out
          </label>
          <input
            type="date"
            className="mt-2 text-gray-800 border-b border-gray-200 focus:border-black outline-none pb-2 bg-transparent"
          />
        </div>

        {/* Guests */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Guests
          </label>
          <input
            min={1}
            max={4}
            type="number"
            placeholder="1"
            className="mt-2 text-gray-800 border-b border-gray-200 focus:border-black outline-none pb-2 bg-transparent"
          />
        </div>

        {/* Button */}
        <div className="flex items-end">
          <button className="w-full bg-black hover:bg-[#49b9FF] transition-all duration-300 text-white font-semibold py-3 rounded-2xl shadow-lg hover:shadow-2xl">
            Search
          </button>
        </div>

      </motion.form>
    </motion.div>
  </section>
);
}

export default Hero