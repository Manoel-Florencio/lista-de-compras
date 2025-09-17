import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export function FloatingAddButton({ onClick, show = true }) {
  if (!show) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="floating-button"
      aria-label="Adicionar item"
    >
      <motion.div
        animate={{ rotate: 0 }}
        whileHover={{ rotate: 90 }}
        transition={{ duration: 0.2 }}
      >
        <Plus className="w-6 h-6" />
      </motion.div>
    </motion.button>
  );
}

