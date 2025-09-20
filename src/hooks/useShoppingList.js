import { useLocalStorage } from './useLocalStorage';
import { useState, useCallback } from 'react';

export function useShoppingList() {
  const [items, setItems] = useLocalStorage('shopping-list-items', []);
  const [completedItems, setCompletedItems] = useLocalStorage('shopping-list-completed', []);
  const [listName, setListName] = useLocalStorage('shopping-list-name', 'Minha Lista de Compras');
  const [isLoading, setIsLoading] = useState(false);

  // Adicionar um único item
  const addItem = useCallback((itemName) => {
    if (!itemName || !itemName.trim()) return;

    const newItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: itemName.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setItems(prevItems => [newItem, ...prevItems]);
  }, [setItems]);

  // **NOVA FUNÇÃO para adicionar múltiplos itens de uma vez**
  const addMultipleItems = useCallback((itemNames) => {
    if (!itemNames || itemNames.length === 0) return;

    const newItems = itemNames.map((name, index) => ({
      id: `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    }));

    // Atualiza o estado de uma só vez, garantindo que todos os itens sejam adicionados
    setItems(prevItems => [...newItems, ...prevItems]);
  }, [setItems]);

  // ... (o resto do seu código: toggleItem, restoreItem, etc. pode continuar o mesmo)

  const toggleItem = useCallback((itemId) => {
    const item = items.find(item => item.id === itemId);
    if (!item) return;

    setItems(prevItems => prevItems.filter(item => item.id !== itemId));

    const completedItem = {
      ...item,
      completed: true,
      completedAt: new Date().toISOString(),
    };

    setCompletedItems(prevCompleted => [completedItem, ...prevCompleted]);
  }, [items, setItems, setCompletedItems]);

  const restoreItem = useCallback((itemId) => {
    const item = completedItems.find(item => item.id === itemId);
    if (!item) return;

    setCompletedItems(prevCompleted => prevCompleted.filter(item => item.id !== itemId));

    const restoredItem = {
      ...item,
      completed: false,
      completedAt: null,
    };

    setItems(prevItems => [restoredItem, ...prevItems]);
  }, [completedItems, setCompletedItems, setItems]);

  const removeItem = useCallback((itemId, fromCompleted = false) => {
    if (fromCompleted) {
      setCompletedItems(prevCompleted => prevCompleted.filter(item => item.id !== itemId));
    } else {
      setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    }
  }, [setCompletedItems, setItems]);

  const editItem = useCallback((itemId, newName) => {
    if (!newName.trim()) return;

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, name: newName.trim() }
          : item
      )
    );
  }, [setItems]);

  const clearCompleted = useCallback(() => {
    setCompletedItems([]);
  }, [setCompletedItems]);

  const clearAll = useCallback(() => {
    setItems([]);
    setCompletedItems([]);
  }, [setItems, setCompletedItems]);

  const stats = {
    totalItems: items.length,
    completedCount: completedItems.length,
    totalEver: items.length + completedItems.length,
  };

  return {
    items,
    completedItems,
    listName,
    isLoading,
    stats,

    // Ações
    addItem,
    addMultipleItems, // **Exportar a nova função**
    toggleItem,
    restoreItem,
    removeItem,
    editItem,
    clearCompleted,
    clearAll,
    setListName,
  };
}
