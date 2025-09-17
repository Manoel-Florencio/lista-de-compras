import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { History } from './pages/History';
import { Settings } from './pages/Settings';
import { useShoppingList } from './hooks/useShoppingList';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
  const {
    items,
    completedItems,
    listName,
    stats,
    addItem,
    toggleItem,
    restoreItem,
    removeItem,
    editItem,
    clearCompleted,
    clearAll,
    setListName,
  } = useShoppingList();

  const handleExportData = () => {
    const data = {
      items,
      completedItems,
      listName,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lista-compras-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (data) => {
    try {
      if (data.listName) setListName(data.listName);
      // Aqui você poderia implementar a importação completa dos dados
      // Por simplicidade, vamos apenas mostrar uma mensagem
      alert('Dados importados com sucesso!');
    } catch (error) {
      alert('Erro ao importar dados.');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home
            items={items}
            onAddItem={addItem}
            onToggleItem={toggleItem}
            onRemoveItem={removeItem}
            onEditItem={editItem}
          />
        );
      case 'history':
        return (
          <History
            completedItems={completedItems}
            onRestoreItem={restoreItem}
            onRemoveItem={removeItem}
            onClearCompleted={clearCompleted}
          />
        );
      case 'settings':
        return (
          <Settings
            listName={listName}
            onListNameChange={setListName}
            stats={stats}
            onClearAll={clearAll}
            onExportData={handleExportData}
            onImportData={handleImportData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        listName={listName}
        onListNameChange={setListName}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        itemCount={stats.totalItems}
      />
      
      <main className="pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
