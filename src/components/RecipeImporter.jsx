import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Plus, ClipboardList, Lightbulb } from 'lucide-react';
import { processRecipeText } from '../lib/recipeProcessor';
import { Badge } from './ui/badge';
import { toast } from 'sonner'; // Importar toast para feedback ao usuário

export function RecipeImporter({ onAddItems }) {
  const [recipeText, setRecipeText] = useState('');
  const [suggestedItems, setSuggestedItems] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleProcessText = () => {
    if (recipeText.trim()) {
      const extracted = processRecipeText(recipeText);
      setSuggestedItems(extracted);
      setShowSuggestions(true);
      if (extracted.length === 0) {
        toast.info('Nenhum ingrediente relevante detectado. Tente ajustar o texto da receita.');
      }
    } else {
      setSuggestedItems([]);
      setShowSuggestions(false);
      toast.info('Por favor, cole o texto da receita para processar.');
    }
  };

  const handleAddSuggested = () => {
    if (suggestedItems.length > 0) {
       onAddItems(suggestedItems);
      setRecipeText('');
      setSuggestedItems([]);
      setShowSuggestions(false);
      toast.success(`${suggestedItems.length} itens adicionados à lista!`);
    } else {
      toast.error('Nenhum item para adicionar.');
    }
  };

  const handleRemoveSuggestion = (itemToRemove) => {
    setSuggestedItems(prev => prev.filter(item => item !== itemToRemove));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-lg border border-border p-4 space-y-4"
    >
      <div className="flex items-center gap-2">
        <ClipboardList className="w-5 h-5 text-accent" />
        <h3 className="font-medium">Importar Receita</h3>
      </div>

      <Textarea
        placeholder="Cole aqui o texto da sua receita (ingredientes)."
        value={recipeText}
        onChange={(e) => setRecipeText(e.target.value)}
        rows={6}
        className="bg-background border-border focus:border-accent"
      />

      <Button
        onClick={handleProcessText}
        disabled={!recipeText.trim()}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Lightbulb className="w-4 h-4 mr-2" />
        Processar Ingredientes
      </Button>

      <AnimatePresence>
        {showSuggestions && suggestedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 overflow-hidden"
          >
            <p className="text-sm text-muted-foreground">
              Sugestões de ingredientes (clique para remover):
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedItems.map((item, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80 transition-colors"
                  onClick={() => handleRemoveSuggestion(item)}
                >
                  {item}
                </Badge>
              ))}
            </div>
            <Button
              onClick={handleAddSuggested}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar {suggestedItems.length} itens à lista
            </Button>
          </motion.div>
        )}

        {showSuggestions && suggestedItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-sm text-muted-foreground py-4"
          >
            Nenhum ingrediente detectado. Tente colar um texto diferente.
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
