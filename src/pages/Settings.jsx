import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Download, 
  Upload, 
  Trash2, 
  Info, 
  Smartphone,
  Heart,
  Github
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export function Settings({ 
  listName, 
  onListNameChange, 
  stats, 
  onClearAll,
  onExportData,
  onImportData 
}) {
  const [tempListName, setTempListName] = useState(listName);

  const handleNameSave = () => {
    if (tempListName.trim() && tempListName !== listName) {
      onListNameChange(tempListName.trim());
    }
  };

  const handleExport = () => {
    const data = {
      listName,
      exportDate: new Date().toISOString(),
      stats,
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

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (onImportData) {
            onImportData(data);
          }
        } catch (error) {
          alert('Erro ao importar arquivo. Verifique se o formato está correto.');
        }
      };
      reader.readAsText(file);
    }
  };

  const installPWA = () => {
    if ('serviceWorker' in navigator) {
      alert('Para instalar o app, use o menu do seu navegador e selecione "Adicionar à tela inicial" ou "Instalar app".');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 pb-20">
      <div className="space-y-6">
        {/* Personalização */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg border border-border p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-accent" />
            <h3 className="font-medium">Personalização</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="listName" className="text-sm font-medium">
                Nome da Lista
              </Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="listName"
                  value={tempListName}
                  onChange={(e) => setTempListName(e.target.value)}
                  placeholder="Nome da sua lista"
                  className="flex-1"
                />
                <Button 
                  onClick={handleNameSave}
                  disabled={!tempListName.trim() || tempListName === listName}
                  size="sm"
                >
                  Salvar
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Estatísticas */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-lg border border-border p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-accent" />
            <h3 className="font-medium">Estatísticas</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-3 bg-secondary rounded-lg">
              <div className="text-2xl font-bold text-accent">{stats.totalItems}</div>
              <div className="text-muted-foreground">Itens pendentes</div>
            </div>
            <div className="text-center p-3 bg-secondary rounded-lg">
              <div className="text-2xl font-bold text-accent">{stats.completedCount}</div>
              <div className="text-muted-foreground">Itens comprados</div>
            </div>
          </div>
        </motion.section>

        {/* Backup e Dados */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-lg border border-border p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Download className="w-5 h-5 text-accent" />
            <h3 className="font-medium">Backup e Dados</h3>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={handleExport}
              variant="outline" 
              className="w-full justify-start"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar dados
            </Button>
            
            <div>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
                id="import-file"
              />
              <Button 
                onClick={() => document.getElementById('import-file').click()}
                variant="outline" 
                className="w-full justify-start"
              >
                <Upload className="w-4 h-4 mr-2" />
                Importar dados
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Instalação PWA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-lg border border-border p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Smartphone className="w-5 h-5 text-accent" />
            <h3 className="font-medium">Instalação</h3>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Instale este app em seu dispositivo para uma experiência melhor.
            </p>
            <Button 
              onClick={installPWA}
              variant="outline" 
              className="w-full justify-start"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Instalar como app
            </Button>
          </div>
        </motion.section>

        {/* Zona de Perigo */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-lg border border-destructive/20 p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Trash2 className="w-5 h-5 text-destructive" />
            <h3 className="font-medium text-destructive">Zona de Perigo</h3>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Esta ação não pode ser desfeita. Todos os seus dados serão perdidos.
            </p>
            <Button 
              onClick={() => {
                if (window.confirm('Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.')) {
                  onClearAll();
                }
              }}
              variant="destructive" 
              className="w-full"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpar todos os dados
            </Button>
          </div>
        </motion.section>

        {/* Sobre */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-lg border border-border p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-accent" />
            <h3 className="font-medium">Sobre</h3>
          </div>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Lista de Compras v1.0</p>
            <p>Desenvolvido com React e muito ❤️</p>
            <div className="flex items-center gap-2 pt-2">
              <Github className="w-4 h-4" />
              <span>Open Source</span>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

