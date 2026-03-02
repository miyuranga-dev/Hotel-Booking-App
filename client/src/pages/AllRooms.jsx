import { useSearchParams } from "react-router";
import { assets, facilityIcons } from "../assets/assets";
import { StarRating } from "../components/StarRating";
import { useState, useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const CheckBox = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input type="checkbox" checked={selected} onChange={(e) => onChange(e.target.checked, label)} />
    <span className="font-light select-none">{label}</span>
  </label>
);

const RadioButton = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input type="radio" name="sortOption" checked={selected} onChange={() => onChange(label)} />
    <span className="font-light select-none">{label}</span>
  </label>
);

const AllRooms = () => {
  const [searchParams] = useSearchParams();
  const { rooms, navigate, currency } = useAppContext();
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({ roomType: [], priceRange: [] });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Room"];
  const priceRanges = ["0 to 5000", "5000 to 10000", "10000 to 25000", "25000 to 6000"];
  const sortOptions = ["Price Low to High", "Price High to Low", "Newest First"];

  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      if (checked) updated[type].push(value);
      else updated[type] = updated[type].filter((item) => item !== value);
      return updated;
    });
  };

  const handleSortChange = (option) => setSelectedSort(option);

  const matchesRoomType = (room) => selectedFilters.roomType.length === 0 || selectedFilters.roomType.includes(room.roomType);
  const matchesPriceRange = (room) =>
    selectedFilters.priceRange.length === 0 ||
    selectedFilters.priceRange.some((range) => {
      const [min, max] = range.split("to").map(Number);
      return room.pricePerNight >= min && room.pricePerNight <= max;
    });
  const sortRooms = (a, b) => {
    if (selectedSort === "Price Low to High") return a.pricePerNight - b.pricePerNight;
    if (selectedSort === "Price High to Low") return b.pricePerNight - a.pricePerNight;
    if (selectedSort === "Newest First") return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  };

  const filterDestination = (room) => {
    const destination = searchParams.get("destination");
    if (!destination) return true;
    return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
  };

  const filteredRooms = useMemo(
    () => rooms.filter((room) => matchesRoomType(room) && matchesPriceRange(room) && filterDestination(room)).sort(sortRooms),
    [rooms, selectedFilters, selectedSort, searchParams]
  );

  const clearFilters = () => {
    setSelectedFilters({ roomType: [], priceRange: [] });
    setSelectedSort("");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 pt-28 px-4 md:px-16 lg:px-24">
      {/* Rooms List */}
      <div className="flex-1">
        {filteredRooms.map((room) => (
          <div key={room._id} className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-32 last:border-0">
            <img
              src={room.images[0]}
              alt="hotel-img"
              title="View Room Details"
              className="max-h-64 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
              onClick={() => {
                navigate(`/rooms/${room._id}`);
                scrollTo(0, 0);
              }}
            />
            <div className="md:w-1/2 flex flex-col gap-2">
              <p className="text-gray-500">{room.hotel.city}</p>
              <p
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
                className="text-gray-800 text-3xl font-playfair cursor-pointer"
              >
                {room.hotel.name}
              </p>
              <div className="flex items-center">
                <StarRating />
                <p className="ml-2">200+ reviews</p>
              </div>
              <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                <img src={assets.locationIcon} alt="location-icon" />
                <span>{room.hotel.address}</span>
              </div>
              <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                {room.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70">
                    <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-xl font-medium text-gray-700">LKR {room.pricePerNight} /night</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="lg:w-80">
        {/* Mobile filter toggle */}
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="lg:hidden mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          {mobileFilterOpen ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Filter panel */}
        <div
          className={`bg-white border border-gray-300 text-gray-600 rounded-md shadow-sm p-5 transition-all duration-500 ${
            mobileFilterOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden lg:max-h-full lg:opacity-100"
          }`}
        >
          <p className="text-base font-medium text-gray-800 mb-2 flex justify-between">
            Filters
            <span
              onClick={clearFilters}
              className="text-sm text-blue-600 cursor-pointer hidden lg:inline-block"
            >
              Clear
            </span>
          </p>

          <div className="mb-4">
            <p className="font-medium text-gray-800 pb-2">Room Type</p>
            {roomTypes.map((room, idx) => (
              <CheckBox
                key={idx}
                label={room}
                selected={selectedFilters.roomType.includes(room)}
                onChange={(checked) => handleFilterChange(checked, room, "roomType")}
              />
            ))}
          </div>

          <div className="mb-4">
            <p className="font-medium text-gray-800 pb-2">Price Range</p>
            {priceRanges.map((range, idx) => (
              <CheckBox
                key={idx}
                label={`${currency} ${range}`}
                selected={selectedFilters.priceRange.includes(range)}
                onChange={(checked) => handleFilterChange(checked, range, "priceRange")}
              />
            ))}
          </div>

          <div className="mb-4">
            <p className="font-medium text-gray-800 pb-2">Sort By</p>
            {sortOptions.map((option, idx) => (
              <RadioButton
                key={idx}
                label={option}
                selected={selectedSort === option}
                onChange={() => handleSortChange(option)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;