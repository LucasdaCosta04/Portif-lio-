import { motion } from "framer-motion";

function About() {
  return (
    <motion.section
      id="about"
      className="py-20 px-6 bg-white dark:bg-gray-900 dark:text-white text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold mb-6">Sobre Mim</h2>
      <p className="max-w-3xl mx-auto text-lg">
        Sou estudante de Ciência da Computação pela UNISUL, apaixonado por tecnologia, criatividade e inovação.
        Busco oportunidades como estagiário na área de TI, com foco em programação, desenvolvimento web e projetos interativos.
      </p>
    </motion.section>
  );
}
export default About;
