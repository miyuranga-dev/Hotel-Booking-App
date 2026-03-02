import { Route, Routes, useLocation } from "react-router"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import AllRooms from "./pages/AllRooms"
import RoomDetails from "./pages/RoomDetails"
import MyBooking from "./pages/MyBooking"
import HotelReg from "./components/HotelReg"
import Layout from "./pages/hotelOwner/Layout"
import Dashboard from "./pages/hotelOwner/Dashboard"
import ListRoom from "./pages/hotelOwner/ListRoom"
import AddRoom from "./pages/hotelOwner/AddRoom"
import {Toaster} from 'react-hot-toast'
import { useAppContext } from "./context/AppContext"
import Experience from "./pages/ExperienceCard"
import AboutUs from "./pages/AboutUs"
function App() {
  const isOwnerPath = useLocation().pathname.includes("owner")
  const { showHotelReg } = useAppContext();
  return (
    <div>
      <Toaster/>
      {!isOwnerPath && <Navbar />}
      {showHotelReg && <HotelReg />} 
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/rooms" element={<AllRooms/>} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/my-bookings" element={<MyBooking />} />
          <Route path="/owner" element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="add-room" element={<AddRoom/>}/>
          <Route path="list-room" element={<ListRoom/>}/>
          </Route>
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}
export default App