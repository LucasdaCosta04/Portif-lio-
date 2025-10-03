import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

function Header({ toggleDarkMode, darkMode }) {
  return (
    <motion.header
      className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur z-50 px-6 py-3 flex justify-between items-center shadow-sm"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4">
        <div className="font-bold text-xl">Portif-lio-</div>
      </div>

      <div className="flex items-center gap-4">
        <nav className="hidden md:flex gap-6">
          <a href="#about" className="text-sm font-medium hover:text-yellow-500">Sobre</a>
          <a href="#projects" className="text-sm font-medium hover:text-yellow-500">Projetos</a>
          <a href="#contact" className="text-sm font-medium hover:text-yellow-500">Contato</a>
        </nav>

        <button
          onClick={toggleDarkMode}
          aria-label="Alternar tema"
          className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </motion.header>
  );
}

export default Header;
