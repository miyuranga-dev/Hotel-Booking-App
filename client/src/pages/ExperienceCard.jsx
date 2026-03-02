import { assets, experiences } from "../assets/assets";
import Title from "../components/Title"; // <-- fixed path
import { motion } from "framer-motion";

const ExperienceCard = ({ experience, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform bg-white"
      style={{ minHeight: "300px" }}
    >
      <img
        src={experience.image}
        alt={experience.title}
        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <h3 className="text-white text-lg font-semibold">{experience.title}</h3>
        <p className="text-white text-sm mt-1 line-clamp-2">{experience.description}</p>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 py-20 bg-slate-50">
      <Title
        title="Experiences"
        subtitle="Discover unforgettable activities and unique moments during your stay. From wellness and adventure to cultural experiences, make your trip truly remarkable."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 w-full">
        {experiences.map((exp, index) => (
          <ExperienceCard key={index} experience={exp} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Experience;