import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Edit2, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function ItemCard({ item, onToggle, onRemove, onEdit, onRestore, isCompleted = false }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.name);

  const handleEdit = () => {
    if (editValue.trim() && editValue !== item.name) {
      onEdit(item.id, editValue);
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditValue(item.name);
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.2 }}
      className={`shopping-item-card ${isCompleted ? 'shopping-item-completed' : ''}`}
    >
      <div className="flex items-center gap-3">
        {/* Botão de check/restore */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => isCompleted ? onRestore(item.id) : onToggle(item.id)}
          className={`p-2 rounded-full transition-all duration-200 ${
            isCompleted 
              ? 'hover:bg-primary/20 text-primary' 
              : 'hover:bg-accent/20 text-accent hover:text-accent-foreground'
          }`}
        >
          {isCompleted ? (
            <RotateCcw className="w-5 h-5" />
          ) : (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Check className="w-5 h-5" />
            </motion.div>
          )}
        </Button>

        {/* Nome do item */}
        <div className="flex-1">
          {isEditing ? (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleEdit}
              onKeyDown={handleKeyPress}
              className="bg-transparent border-accent focus:border-accent"
              autoFocus
            />
          ) : (
            <span 
              className={`text-lg ${isCompleted ? 'text-muted-foreground' : 'text-foreground'}`}
              onDoubleClick={() => !isCompleted && setIsEditing(true)}
            >
              {item.name}
            </span>
          )}
        </div>

        {/* Ações */}
        <div className="flex items-center gap-1">
          {!isCompleted && !isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="p-2 text-muted-foreground hover:text-foreground"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(item.id, isCompleted)}
            className="p-2 text-muted-foreground hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Data de criação/conclusão */}
      <div className="mt-2 text-xs text-muted-foreground">
        {isCompleted ? (
          <>Comprado em {new Date(item.completedAt).toLocaleDateString('pt-BR')}</>
        ) : (
          <>Adicionado em {new Date(item.createdAt).toLocaleDateString('pt-BR')}</>
        )}
      </div>
    </motion.div>
  );
}

