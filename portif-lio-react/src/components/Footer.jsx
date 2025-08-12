import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      className="bg-gray-100 dark:bg-gray-900 dark:text-white text-center py-6 text-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      © {new Date().getFullYear()} Lucas da Costa. Todos os direitos reservados.
    </motion.footer>
  );
}
export default Footer;
