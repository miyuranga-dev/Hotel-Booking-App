import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { assets, facilityIcons, roomCommonData } from "../assets/assets";
import { StarRating } from "../components/StarRating";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const RoomDetails = () => {
  const { getToken, rooms, navigate, axios } = useAppContext();
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const room = rooms.find(room => room._id === id);
    if (room) {
      setRoom(room);
      setMainImage(room.images[0]);
    }
  }, [rooms, id]);

  const checkAvailability = async () => {
    try {
      if (checkInDate >= checkOutDate) {
        toast.error("Check-Out date should be greater than Check-In date");
        return;
      }
      const { data } = await axios.post("/api/bookings/check-availability", {
        room: id,
        checkInDate,
        checkOutDate
      });
      if (data.success) {
        setIsAvailable(data.isAvailable);
        toast[data.isAvailable ? "success" : "error"](
          data.isAvailable
            ? "Room is available for booking"
            : "Room is not available for the selected dates"
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!isAvailable) return checkAvailability();

    try {
      const { data } = await axios.post(
        "/api/bookings/book",
        {
          room: id,
          checkInDate,
          checkOutDate,
          guests,
          paymentMethod: "Pay at Hotel"
        },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/my-bookings");
        scrollTo(0, 0);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return room && (
    <div className="py-28 md:py-36 px-4 md:px-16 lg:px-24 xl:px-32 space-y-16">
      
      {/* Room Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 animate-fadeIn">
        <h1 className="text-3xl md:text-4xl font-playfair">{room.hotel.name} 
          <span className="font-inter text-sm ml-2">{room.roomType}</span>
        </h1>
        <p className="text-xs font-inter py-2 px-3 text-white bg-orange-500 rounded-full animate-fadeIn">20% OFF</p>
      </div>

      {/* Rating & Location */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 animate-fadeIn">
        <div className="flex items-center gap-1">
          <StarRating />
          <p className="ml-2 text-gray-500">200+ reviews</p>
        </div>
        <div className="flex items-center gap-1 text-gray-500 mt-2 md:mt-0">
          <img src={assets.locationIcon} alt="location-icon" />
          <span>{room.hotel.address}</span>
        </div>
      </div>

      {/* Room Images */}
      <div className="flex flex-col lg:flex-row gap-6 animate-fadeIn">
        <div className="lg:w-1/2 w-full">
          <img
            src={mainImage}
            alt="room-image"
            className="w-full rounded-xl shadow-lg object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
          {room?.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`room-img-${i}`}
              onClick={() => setMainImage(img)}
              className={`w-full rounded-xl shadow-md object-cover cursor-pointer transition-all duration-300 hover:scale-105 ${img === mainImage ? "outline outline-3 outline-orange-500" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Amenities & Price */}
      <div className="flex flex-col md:flex-row md:justify-between mt-10 animate-fadeIn">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl md:text-4xl font-playfair">Experience Luxury Like Never Before</h2>
          <div className="flex flex-wrap items-center gap-4">
            {room.amenities.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 transition-all hover:scale-105">
                <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
                <p className="text-xs">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-2xl font-medium animate-fadeIn">LKR {room.pricePerNight} /night</p>
      </div>

      {/* Booking Form */}
      <form onSubmit={onSubmitHandler} className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-lg p-6 rounded-xl max-w-6xl mx-auto animate-fadeIn space-y-4 md:space-y-0 md:space-x-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-10 text-gray-500">
          <div className="flex flex-col">
            <label htmlFor="CheckInDate" className="font-medium">Check-In</label>
            <input type="date" id="checkInDate" min={new Date().toISOString().split('T')[0]} onChange={e => setCheckInDate(e.target.value)} className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none" required />
          </div>
          <div className="w-px h-16 bg-gray-300/70 max-md:hidden"></div>
          <div className="flex flex-col">
            <label htmlFor="CheckOutDate" className="font-medium">Check-Out</label>
            <input type="date" id="checkOutDate" min={checkInDate} disabled={!checkInDate} onChange={e => setCheckOutDate(e.target.value)} className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none" required />
          </div>
          <div className="w-px h-16 bg-gray-300/70 max-md:hidden"></div>
          <div className="flex flex-col">
            <label htmlFor="Guests" className="font-medium">Guests</label>
            <input type="number" id="Guests" value={guests} onChange={e => setGuests(e.target.value)} className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none" required />
          </div>
        </div>
        <button type="submit" className="bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md md:px-24 py-3 cursor-pointer animate-fadeIn">
          {isAvailable ? "Book now" : "Check Availability"}
        </button>
      </form>

      {/* Common Specifications */}
      <div className="mt-24 space-y-4 animate-fadeIn">
        {roomCommonData.map((spec, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <img src={spec.icon} alt={`${spec.title}-icon`} className="w-7" />
            <div>
              <p className="text-base">{spec.title}</p>
              <p className="text-gray-500">{spec.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="max-w-3xl border-y border-gray-300 mt-16 py-10 text-gray-500 animate-fadeIn">
        <p>
          Guests will be allocated on the ground floor according to availability. You get a comfortable two-bedroom apartment with a true city feeling. Price is for two guests. Mark the correct number of guests for exact pricing.
        </p>
      </div>

      {/* Hosted By */}
      <div className="flex flex-col items-start gap-4 mt-8 animate-fadeIn">
        <div className="flex gap-4">
          <img src={room.hotel.owner.image} alt="Host" className="h-14 w-14 md:h-18 md:w-18 rounded-full" />
          <div>
            <p className="text-lg md:text-xl">Hosted By {room.hotel.name}</p>
            <div className="flex items-center mt-1">
              <StarRating />
              <p className="ml-2">200+ Reviews</p>
            </div>
          </div>
        </div>
        <button className="px-6 py-3 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer">Contact Now</button>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fadeIn {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s forwards;
        }
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default RoomDetails;