import React from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";

const AboutUs = () => {
  return (
    <div className="px-4 md:px-16 lg:px-24 xl:px-32 py-28">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto">
        <Title 
          align="center" 
          title="About QuickStay" 
          subtitle="Discover the story behind QuickStay — luxury stays, curated experiences, and unforgettable memories across the world." 
        />
      </div>

      {/* Our Mission */}
      <div className="flex flex-col lg:flex-row items-center gap-10 mt-20">
        <img 
          src={assets.heroabout} 
          alt="Our Mission" 
          className="lg:w-1/2 rounded-xl shadow-lg object-cover"
        />
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-playfair mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            At QuickStay, our mission is to provide travelers with exceptional accommodations that combine comfort, style, and convenience. We aim to make every stay memorable through personalized experiences and dedicated service.
          </p>
          <h2 className="text-3xl font-playfair mb-4">Our Vision</h2>
          <p className="text-gray-600">
            To be the go-to platform for luxury and boutique stays worldwide, connecting travelers with unique properties that inspire and delight.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="mt-32">
        <Title 
          align="center" 
          title="Meet Our Team" 
          subtitle="Passionate professionals dedicated to delivering the best hospitality experience." 
        />
        <div className="flex flex-wrap justify-center gap-10 mt-16">
          {[1].map((member) => (
            <div key={member} className="flex flex-col items-center max-w-xs text-center">
              <img 
                src={assets.me} 
                alt={`Team Member ${member}`} 
                className="w-40 h-40 rounded-full object-cover shadow-lg"
              />
              <p className="mt-4 font-playfair text-xl">Prabodana Miyuranga</p>
              <p className="text-gray-500 text-sm">Full Stack Developer</p>
            </div>
          ))}
        </div>
      </div>

      {/* Optional Testimonials or Highlights */}
      <div className="mt-32 text-center">
        <h2 className="text-3xl font-playfair mb-4">Why Choose Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          QuickStay combines handpicked luxury properties, exceptional customer service, and curated experiences to make every trip unforgettable.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;