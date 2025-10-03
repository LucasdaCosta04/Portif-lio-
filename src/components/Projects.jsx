import { motion } from "framer-motion";

const projetos = [
  {
    titulo: 'Projeto 1S - PSC',
    descricao: 'Sistema em Java para controle de empréstimos.',
    link: 'https://github.com/LucasdaCosta04/Projeto-1S-PSC'
  },
  {
    titulo: 'NutriLife',
    descricao: 'Plataforma de nutrição com arquitetura moderna.',
    link: 'https://github.com/carloshlohn/NutriLife-model'
  }
];

function Projects() {
  return (
    <motion.section
      id="projects"
      className="py-20 px-6 bg-gradient-to-tr from-yellow-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 dark:text-white text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold mb-10">Projetos em Destaque</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {projetos.map((proj, i) => (
          <motion.article
            key={i}
            className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg max-w-sm text-left transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            whileHover={{ scale: 1.04 }}
          >
            <h3 className="text-xl font-semibold mb-2">{proj.titulo}</h3>
            <p className="mb-4">{proj.descricao}</p>
            <a href={proj.link} target="_blank" rel="noreferrer" className="text-yellow-500 font-medium hover:underline">
              Ver no GitHub →
            </a>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
export default Projects;
