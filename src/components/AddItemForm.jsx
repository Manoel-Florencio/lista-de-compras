import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function AddItemForm({ onAddItem, placeholder = "Adicionar item..." }) {
  const [itemName, setItemName] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName.trim()) {
      onAddItem(itemName);
      setItemName('');
      setIsExpanded(false);
    }
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    if (!itemName.trim()) {
      setIsExpanded(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`
              w-full pl-12 pr-16 py-4 text-lg
              bg-card border-2 border-border
              focus:border-accent focus:ring-2 focus:ring-accent/20
              transition-all duration-200
              ${isExpanded ? 'rounded-xl' : 'rounded-full'}
            `}
          />
          
          {/* Ícone do carrinho */}
          <ShoppingCart className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          
          {/* Botão de adicionar */}
          <Button
            type="submit"
            size="sm"
            disabled={!itemName.trim()}
            className={`
              absolute right-2 top-1/2 transform -translate-y-1/2
              w-10 h-10 rounded-full
              bg-accent hover:bg-accent/90 text-accent-foreground
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
            `}
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {/* Dicas de uso */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 text-sm text-muted-foreground text-center"
          >
            Pressione Enter para adicionar ou clique no botão +
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}

