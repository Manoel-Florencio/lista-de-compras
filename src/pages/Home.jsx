import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Package } from 'lucide-react';
import { AddItemForm } from '../components/AddItemForm';
import { ItemCard } from '../components/ItemCard';
import { FloatingAddButton } from '../components/FloatingAddButton';

export function Home({ 
  items, 
  onAddItem, 
  onToggleItem, 
  onRemoveItem, 
  onEditItem 
}) {
  const addFormRef = useRef(null);

  const handleFloatingButtonClick = () => {
    addFormRef.current?.querySelector('input')?.focus();
  };

  return (
    <div className="max-w-md mx-auto px-4 pb-20">
      {/* Formulário de adicionar item */}
      <div ref={addFormRef} className="mb-6">
        <AddItemForm 
          onAddItem={onAddItem}
          placeholder="O que você precisa comprar?"
        />
      </div>

      {/* Lista de itens */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {items.length > 0 ? (
            items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onToggle={onToggleItem}
                onRemove={onRemoveItem}
                onEdit={onEditItem}
                isCompleted={false}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="mb-4">
                <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                Lista vazia
              </h3>
              <p className="text-sm text-muted-foreground">
                Adicione alguns itens para começar suas compras
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Estatísticas rápidas */}
      {items.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 p-4 bg-card rounded-lg border border-border"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Total de itens</span>
            </div>
            <span className="text-lg font-bold text-accent">
              {items.length}
            </span>
          </div>
        </motion.div>
      )}

      {/* Botão flutuante */}
      <FloatingAddButton 
        onClick={handleFloatingButtonClick}
        show={items.length > 3}
      />
    </div>
  );
}

