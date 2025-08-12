import { motion } from "framer-motion";

function HeroSection() {
  return (
    <motion.section
      className="relative h-screen flex flex-col justify-center items-center text-center px-4 pt-20 bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">HEY, I'M LUCAS DA COSTA</h1>
      <p className="text-lg max-w-2xl mb-6">
        Estudante de Ciência da Computação focado em desenvolvimento de sites e aplicações modernas.
      </p>
      <a
        href="#projects"
        className="btn-animated inline-block mt-4 bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 font-semibold rounded-lg shadow-lg"
      >
        PROJECTS
      </a>
    </motion.section>
  );
}
export default HeroSection;
