# Guia de Deploy - Lista de Compras

## 🚀 Opções de Deploy

### 1. Vercel (Recomendado) ⭐

**Vantagens:**
- Deploy automático
- CDN global
- HTTPS gratuito
- Domínio personalizado
- Integração com Git

**Passos:**

1. **Via CLI:**
   ```bash
   # Instalar Vercel CLI
   npm i -g vercel
   
   # Fazer login
   vercel login
   
   # Deploy
   vercel --prod
   ```

2. **Via Dashboard:**
   - Acesse [vercel.com](https://vercel.com)
   - Conecte seu repositório GitHub
   - Deploy automático a cada push

### 2. Netlify

**Vantagens:**
- Interface amigável
- Deploy por drag & drop
- Formulários gratuitos
- Funções serverless

**Passos:**

1. **Via Drag & Drop:**
   - Acesse [netlify.com](https://netlify.com)
   - Arraste a pasta `dist/` para o dashboard
   - Site estará online em segundos

2. **Via Git:**
   - Conecte repositório GitHub
   - Configure build: `npm run build`
   - Pasta de publicação: `dist`

### 3. GitHub Pages

**Vantagens:**
- Gratuito para repositórios públicos
- Integração nativa com GitHub
- Domínio github.io

**Passos:**

1. **Configurar GitHub Actions:**
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy
   on:
     push:
       branches: [ main ]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
           with:
             node-version: '18'
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

2. **Configurar Pages:**
   - Vá em Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages

### 4. Firebase Hosting

**Vantagens:**
- Integração com outros serviços Firebase
- CDN global
- SSL automático

**Passos:**

1. **Instalar Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Configurar projeto:**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Deploy:**
   ```bash
   npm run build
   firebase deploy
   ```

### 5. Surge.sh

**Vantagens:**
- Deploy super rápido
- CLI simples
- Domínio personalizado

**Passos:**

1. **Instalar Surge:**
   ```bash
   npm install -g surge
   ```

2. **Deploy:**
   ```bash
   npm run build
   cd dist
   surge
   ```

## 🔧 Configurações Importantes

### Vite Config para Deploy

Se usar subpasta, configure o `base` no `vite.config.js`:

```javascript
export default defineConfig({
  base: '/nome-do-repositorio/', // Para GitHub Pages
  plugins: [react()],
})
```

### PWA e Service Worker

Para PWA funcionar em produção, certifique-se de que:

1. **HTTPS está habilitado** (automático na maioria dos serviços)
2. **Manifest.json está acessível** em `/manifest.json`
3. **Service Worker está registrado** (se implementado)

### Redirecionamentos SPA

Para SPAs, configure redirecionamentos:

**Netlify** - criar `public/_redirects`:
```
/*    /index.html   200
```

**Vercel** - criar `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## 📊 Monitoramento

### Analytics

Adicione Google Analytics ou similar:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Performance

Use ferramentas como:
- Lighthouse (Chrome DevTools)
- PageSpeed Insights
- Web Vitals

## 🔒 Segurança

### Headers de Segurança

Configure headers no seu provedor:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### HTTPS

Sempre use HTTPS em produção. A maioria dos provedores oferece SSL gratuito.

## 🎯 Domínio Personalizado

### Configurar DNS

1. **Compre um domínio** (Namecheap, GoDaddy, etc.)
2. **Configure DNS** apontando para seu provedor
3. **Adicione domínio** no dashboard do provedor

### Exemplo Vercel:
```bash
vercel domains add meudominio.com
```

## 📱 Teste em Produção

Após deploy, teste:

1. **Funcionalidades básicas**
2. **PWA installation**
3. **Modo offline**
4. **Responsividade**
5. **Performance**

## 🚨 Troubleshooting

### Problemas Comuns:

1. **404 em rotas:** Configure redirecionamentos SPA
2. **Assets não carregam:** Verifique `base` no Vite config
3. **PWA não instala:** Verifique HTTPS e manifest
4. **Build falha:** Verifique dependências e Node version

### Logs de Debug:

```bash
# Vercel
vercel logs

# Netlify
netlify logs

# Firebase
firebase functions:log
```

## 📈 Otimizações

### Bundle Size

```bash
# Analisar bundle
npm run build -- --analyze
```

### Lazy Loading

```javascript
// Lazy load páginas
const Home = lazy(() => import('./pages/Home'));
const History = lazy(() => import('./pages/History'));
```

### Compressão

A maioria dos provedores oferece compressão Gzip/Brotli automaticamente.

---

**Recomendação:** Use Vercel para simplicidade e performance, ou Netlify para recursos extras como formulários.

