import Title from "./Title";
import { testimonials } from "../assets/assets";
import { StarRating } from "./StarRating";
import { motion } from "framer-motion";

const Testimonial = () => {
  return (
    <section className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-28 overflow-hidden">
      
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Title
          title="What Our Guests Say"
          subtitle="Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world"
        />
      </motion.div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.8 }}
            viewport={{ once: true }}
            className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            {/* User Info */}
            <div className="flex items-center gap-4">
              <img
                className="w-14 h-14 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="font-playfair text-lg font-semibold text-gray-800">
                  {testimonial.name}
                </p>
                <p className="text-gray-500 text-sm">{testimonial.address}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-4">
              <StarRating />
            </div>

            {/* Review */}
            <p className="text-gray-500 mt-4 text-sm">
              "{testimonial.review}"
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;