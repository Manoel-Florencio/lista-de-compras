import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, History, Settings, Edit2, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Navbar({ 
  listName, 
  onListNameChange, 
  currentPage, 
  onPageChange, 
  itemCount = 0 
}) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editValue, setEditValue] = useState(listName);

  const handleNameEdit = () => {
    if (editValue.trim() && editValue !== listName) {
      onListNameChange(editValue.trim());
    }
    setIsEditingName(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleNameEdit();
    } else if (e.key === 'Escape') {
      setEditValue(listName);
      setIsEditingName(false);
    }
  };

  const navItems = [
    { id: 'home', icon: ShoppingCart, label: 'Lista', count: itemCount },
    { id: 'history', icon: History, label: 'Histórico' },
    { id: 'settings', icon: Settings, label: 'Config' },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-md mx-auto px-4 py-4">
        {/* Cabeçalho com nome da lista */}
        <div className="flex items-center justify-center mb-4">
          {isEditingName ? (
            <div className="flex items-center gap-2 w-full max-w-xs">
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleNameEdit}
                onKeyDown={handleKeyPress}
                className="text-center bg-transparent border-accent focus:border-accent"
                autoFocus
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNameEdit}
                className="p-1 text-accent"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditValue(listName);
                  setIsEditingName(false);
                }}
                className="p-1 text-muted-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => setIsEditingName(true)}
            >
              <h1 className="text-xl font-bold gradient-text text-center">
                {listName}
              </h1>
              <Edit2 className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
        </div>

        {/* Mensagem carinhosa */}
        <div className="text-center text-sm text-muted-foreground mb-4">
          {currentPage === 'home' && itemCount > 0 && (
            <span>Você tem {itemCount} {itemCount === 1 ? 'item' : 'itens'} para comprar 🛒</span>
          )}
          {currentPage === 'home' && itemCount === 0 && (
            <span>Sua lista está vazia. Que tal adicionar alguns itens? ✨</span>
          )}
          {currentPage === 'history' && (
            <span>Aqui estão seus itens comprados 📋</span>
          )}
          {currentPage === 'settings' && (
            <span>Personalize sua experiência 🎨</span>
          )}
        </div>

        {/* Navegação */}
        <div className="flex justify-center">
          <div className="flex bg-secondary rounded-full p-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(item.id)}
                  className={`
                    relative px-4 py-2 rounded-full transition-all duration-200
                    ${isActive 
                      ? 'bg-accent text-accent-foreground shadow-md' 
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">{item.label}</span>
                  
                  {/* Badge de contagem */}
                  {item.count > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {item.count > 99 ? '99+' : item.count}
                    </motion.span>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

