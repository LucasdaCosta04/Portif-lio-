import { motion } from "framer-motion";

function Contact() {
  return (
    <motion.section
      id="contact"
      className="py-20 px-6 bg-white dark:bg-gray-900 dark:text-white text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold mb-6">Entre em Contato</h2>
      <form action="https://formspree.io/f/xovllwnn" method="POST" className="max-w-xl mx-auto space-y-4">
        <input type="text" name="name" placeholder="Seu nome" required className="w-full p-3 border rounded dark:bg-gray-700" />
        <input type="email" name="email" placeholder="Seu e-mail" required className="w-full p-3 border rounded dark:bg-gray-700" />
        <textarea name="message" rows="5" placeholder="Sua mensagem..." required className="w-full p-3 border rounded dark:bg-gray-700"></textarea>
        <button type="submit" className="btn-animated bg-yellow-400 px-6 py-3 rounded font-bold hover:bg-yellow-500 text-black">
          Enviar
        </button>
      </form>
    </motion.section>
  );
}
export default Contact;
