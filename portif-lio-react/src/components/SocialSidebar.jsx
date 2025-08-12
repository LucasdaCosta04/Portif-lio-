import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

function SocialSidebar() {
  return (
    <motion.aside
      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-4"
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <a href="https://www.linkedin.com/in/lucasdacosta04" target="_blank" rel="noreferrer" className="text-gray-800 dark:text-white">
        <FaLinkedin size={22} />
      </a>
      <a href="mailto:lucas.costa15gl@gmail.com" className="text-gray-800 dark:text-white">
        <FaEnvelope size={22} />
      </a>
      <a href="https://github.com/LucasdaCosta04" target="_blank" rel="noreferrer" className="text-gray-800 dark:text-white">
        <FaGithub size={22} />
      </a>
    </motion.aside>
  );
}
export default SocialSidebar;
