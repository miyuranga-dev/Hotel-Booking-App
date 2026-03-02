
import transporter from "../config/nodemailer.js";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

//function to check availability of rooms

const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
    try {
        const booking = await Booking.find({
            room,
            checkInDate: { $lte: checkOutDate },
            checkOutDate: { $gte: checkInDate },

        })
        const isAvailable = booking.length === 0;
        return isAvailable;

    } catch (error) {
        console.log(error.message);
    }
}

//api to check availability of room
//post /api/bookings/check-availability

export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;
        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
        res.json({ success: true, isAvailable });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//API to create a new Booking
//post /api/bookings/book

export const createBooking = async (req, res) => {
    try {
        const { checkInDate, checkOutDate, guests, room } = req.body;
        const user = req.user._id;

        //before booking check availability
        const isAvailable = await checkAvailability({
            checkInDate,
            checkOutDate,
            room
        });
        if (!isAvailable) {
            return res.json({ success: false, message: "Room is not available for the selected dates" });
        }
        //get Totalprice from Room
        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight * (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24);
        //calculate totalprice based on nights
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timediff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timediff / (1000 * 3600 * 24));
        totalPrice *= nights;
        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        })
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: req.user.email,
            subject: `Your Booking Confirmation - ${roomData.hotel.name}`,
            html: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
      <h2 style="color: #2c3e50; text-align: center;">Booking Confirmation</h2>
      <p>Dear <strong>${req.user.username}</strong>,</p>
      <p>Thank you for choosing <strong>${roomData.hotel.name}</strong> for your stay! We are excited to host you. Here are your booking details:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 15px;">
        <tbody>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Booking ID:</td>
            <td style="padding: 8px;">${booking._id}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Hotel Name:</td>
            <td style="padding: 8px;">${roomData.hotel.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Location:</td>
            <td style="padding: 8px;">${roomData.hotel.address}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Check-In Date:</td>
            <td style="padding: 8px;">${booking.checkInDate.toDateString()}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Check-Out Date:</td>
            <td style="padding: 8px;">${booking.checkOutDate.toDateString()}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Booking Amount:</td>
            <td style="padding: 8px;">${process.env.CURRENCY || 'LKR'} ${booking.totalPrice} /night</td>
          </tr>
        </tbody>
      </table>

      <p>If you need to make any changes or have any questions, please <a href="mailto:${process.env.SUPPORT_EMAIL}" style="color: #3498db; text-decoration: none;">contact us</a>. We are here to help!</p>

      <p>We look forward to welcoming you and wish you a wonderful stay!</p>

      <p style="margin-top: 30px; font-size: 0.9em; color: #7f8c8d;">Best regards,<br/>
      <strong>QuickStay Team</strong></p>

      <hr style="margin-top: 20px; border: none; border-top: 1px solid #ddd;" />

      <p style="font-size: 0.8em; color: #999; text-align: center;">This is an automated email. Please do not reply directly to this message. For assistance, contact <a href="mailto:${process.env.SUPPORT_EMAIL}" style="color: #3498db;">support</a>.</p>
    </div>
  `
        };
        await transporter.sendMail(mailOption)
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking, // send the actual booking object
        });
    } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to create booking",
        });
    }
}

//api to get all bookings for a user
//get /api/bookings/user

export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;
        const bookings = await Booking.find({ user }).populate("room hotel").sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (error) {
        res.json({ success: false, message: "failed to fetch booking" });

    }
}

export const getHotelBookings = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({ owner: req.auth.userId });
        if (!hotel) {
            return res.json({ success: false, message: "No hotel found" });
        }
        const bookings = await Booking.find({ hotel: hotel._id }).populate("room hotel user").sort({ createdAt: -1 });
        //Total Bookings 
        const totalBookings = bookings.length;
        //Total Revenue
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
        res.json({ success: true, dashboardData: { totalBookings, totalRevenue, bookings } });
    } catch (error) {
        res.json({ success: false, message: "Failed to fetch booking" });
    }
};