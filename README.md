# Lista de Compras - WebApp

Um aplicativo web moderno e responsivo para gerenciar listas de compras, desenvolvido com React e TailwindCSS.

## 🚀 Funcionalidades

- ✅ **Adicionar itens** em tempo real
- ✅ **Marcar como comprado** com animações suaves
- ✅ **Histórico de compras** organizado por data
- ✅ **Restaurar itens** do histórico para a lista principal
- ✅ **Editar itens** com duplo clique
- ✅ **Personalização** do nome da lista
- ✅ **PWA** - Instalável como app nativo
- ✅ **Offline** - Funciona sem internet (localStorage)
- ✅ **Responsivo** - Otimizado para mobile e desktop
- ✅ **Tema escuro** com paleta de cores personalizada

## 🎨 Design

- **Paleta de cores**: Azul escuro (#0A192F), Dourado (#FFD700), Rosa escuro (#C2185B)
- **Layout**: Fundo escuro com cards arredondados
- **Animações**: Transições suaves com Framer Motion
- **UX**: Mensagens carinhosas e feedback visual

## 🛠️ Tecnologias

- **React 18** - Framework principal
- **Vite** - Build tool e dev server
- **TailwindCSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI modernos
- **Framer Motion** - Animações e transições
- **Lucide React** - Ícones
- **localStorage** - Persistência de dados offline

## 📱 PWA Features

- Manifest configurado para instalação
- Service Worker para cache offline
- Ícones adaptativos
- Tema color personalizado

## 🚀 Como usar

### Desenvolvimento

1. Instalar dependências:
   ```bash
   npm install
   ```

2. Iniciar servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Abrir no navegador: `http://localhost:5173`

### Produção

1. Criar build:
   ```bash
   npm run build
   ```

2. Os arquivos estarão na pasta `dist/`

## 📦 Deploy

### Vercel (Recomendado)

1. Instalar Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

### Netlify

1. Fazer upload da pasta `dist/` no Netlify
2. Ou conectar o repositório Git

### GitHub Pages

1. Configurar GitHub Actions para build automático
2. Deploy da pasta `dist/`

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes shadcn/ui
│   ├── ItemCard.jsx    # Card de item da lista
│   ├── AddItemForm.jsx # Formulário de adicionar item
│   ├── Navbar.jsx      # Barra de navegação
│   └── FloatingAddButton.jsx # Botão flutuante
├── pages/              # Páginas da aplicação
│   ├── Home.jsx        # Lista principal
│   ├── History.jsx     # Histórico de compras
│   └── Settings.jsx    # Configurações
├── hooks/              # Hooks customizados
│   ├── useLocalStorage.js # Hook para localStorage
│   └── useShoppingList.js # Hook principal da lista
├── App.jsx             # Componente principal
├── App.css             # Estilos globais
└── main.jsx            # Ponto de entrada
```

## 🎯 Funcionalidades Detalhadas

### Lista Principal
- Adicionar itens via input ou botão flutuante
- Marcar itens como comprados
- Editar itens com duplo clique
- Remover itens
- Contador de itens pendentes

### Histórico
- Visualizar itens comprados agrupados por data
- Restaurar itens para a lista principal
- Estatísticas de compras
- Limpar histórico

### Configurações
- Personalizar nome da lista
- Visualizar estatísticas
- Exportar/importar dados
- Instalar como PWA
- Limpar todos os dados

## 📱 Instalação como App

1. Abrir o website no navegador mobile
2. Usar o menu do navegador
3. Selecionar "Adicionar à tela inicial" ou "Instalar app"
4. O app aparecerá na tela inicial como um app nativo

## 💾 Persistência de Dados

Os dados são salvos automaticamente no localStorage do navegador, permitindo:
- Funcionamento offline
- Persistência entre sessões
- Sincronização automática

## 🎨 Customização

O tema pode ser facilmente customizado editando as variáveis CSS em `App.css`:

```css
:root {
  --background: #121212;
  --foreground: #FFFFFF;
  --accent: #FFD700;
  /* ... outras variáveis */
}
```

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

Desenvolvido com ❤️ usando React e TailwindCSS

