import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Trash2, RotateCcw, Calendar } from 'lucide-react';
import { ItemCard } from '../components/ItemCard';
import { Button } from '../components/ui/button';

export function History({ 
  completedItems, 
  onRestoreItem, 
  onRemoveItem, 
  onClearCompleted 
}) {
  // Agrupar itens por data
  const groupedItems = completedItems.reduce((groups, item) => {
    const date = new Date(item.completedAt).toLocaleDateString('pt-BR');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedItems).sort((a, b) => {
    return new Date(b.split('/').reverse().join('-')) - new Date(a.split('/').reverse().join('-'));
  });

  return (
    <div className="max-w-md mx-auto px-4 pb-20">
      {/* Cabeçalho com ações */}
      {completedItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-card rounded-lg border border-border"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-accent" />
              <span className="font-medium">
                {completedItems.length} {completedItems.length === 1 ? 'item comprado' : 'itens comprados'}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onClearCompleted}
              className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpar
            </Button>
          </div>
        </motion.div>
      )}

      {/* Lista de itens agrupados por data */}
      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {sortedDates.length > 0 ? (
            sortedDates.map((date) => (
              <motion.div
                key={date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-3"
              >
                {/* Cabeçalho da data */}
                <div className="flex items-center gap-2 px-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {date}
                  </h3>
                  <div className="flex-1 h-px bg-border"></div>
                  <span className="text-xs text-muted-foreground">
                    {groupedItems[date].length} {groupedItems[date].length === 1 ? 'item' : 'itens'}
                  </span>
                </div>

                {/* Itens da data */}
                <div className="space-y-2">
                  {groupedItems[date].map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onRestore={onRestoreItem}
                      onRemove={onRemoveItem}
                      isCompleted={true}
                    />
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="mb-4">
                <CheckCircle className="w-16 h-16 mx-auto text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                Nenhum item comprado ainda
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Quando você marcar itens como comprados, eles aparecerão aqui
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <RotateCcw className="w-4 h-4" />
                <span>Dica: Você pode restaurar itens comprados para a lista principal</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Estatísticas */}
      {completedItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 p-4 bg-card rounded-lg border border-border"
        >
          <h4 className="font-medium mb-3">Estatísticas</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total comprado:</span>
              <span className="font-medium">{completedItems.length} itens</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Última compra:</span>
              <span className="font-medium">
                {new Date(completedItems[0]?.completedAt).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

