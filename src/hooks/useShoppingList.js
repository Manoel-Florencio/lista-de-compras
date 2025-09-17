import { useLocalStorage } from './useLocalStorage';
import { useState } from 'react';

export function useShoppingList() {
  const [items, setItems] = useLocalStorage('shopping-list-items', []);
  const [completedItems, setCompletedItems] = useLocalStorage('shopping-list-completed', []);
  const [listName, setListName] = useLocalStorage('shopping-list-name', 'Minha Lista de Compras');
  const [isLoading, setIsLoading] = useState(false);

  // Adicionar novo item
  const addItem = (itemName) => {
    if (!itemName.trim()) return;
    
    const newItem = {
      id: Date.now().toString(),
      name: itemName.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setItems(prevItems => [newItem, ...prevItems]);
  };

  // Marcar item como comprado
  const toggleItem = (itemId) => {
    const item = items.find(item => item.id === itemId);
    if (!item) return;

    // Remove da lista principal
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    
    // Adiciona à lista de comprados
    const completedItem = {
      ...item,
      completed: true,
      completedAt: new Date().toISOString(),
    };
    
    setCompletedItems(prevCompleted => [completedItem, ...prevCompleted]);
  };

  // Restaurar item da lista de comprados
  const restoreItem = (itemId) => {
    const item = completedItems.find(item => item.id === itemId);
    if (!item) return;

    // Remove da lista de comprados
    setCompletedItems(prevCompleted => prevCompleted.filter(item => item.id !== itemId));
    
    // Adiciona de volta à lista principal
    const restoredItem = {
      ...item,
      completed: false,
      completedAt: null,
    };
    
    setItems(prevItems => [restoredItem, ...prevItems]);
  };

  // Remover item permanentemente
  const removeItem = (itemId, fromCompleted = false) => {
    if (fromCompleted) {
      setCompletedItems(prevCompleted => prevCompleted.filter(item => item.id !== itemId));
    } else {
      setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    }
  };

  // Editar nome do item
  const editItem = (itemId, newName) => {
    if (!newName.trim()) return;
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId 
          ? { ...item, name: newName.trim() }
          : item
      )
    );
  };

  // Limpar lista de comprados
  const clearCompleted = () => {
    setCompletedItems([]);
  };

  // Limpar toda a lista
  const clearAll = () => {
    setItems([]);
    setCompletedItems([]);
  };

  // Estatísticas
  const stats = {
    totalItems: items.length,
    completedCount: completedItems.length,
    totalEver: items.length + completedItems.length,
  };

  return {
    // Estado
    items,
    completedItems,
    listName,
    isLoading,
    stats,
    
    // Ações
    addItem,
    toggleItem,
    restoreItem,
    removeItem,
    editItem,
    clearCompleted,
    clearAll,
    setListName,
  };
}

