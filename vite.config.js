import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Quando o front-end chamar '/api/send-email', o Vite irá redirecionar
      // para o seu servidor de backend rodando em 'http://localhost:3001'
      '/api': { 
        // 🚨 Mude a URL para a porta/endereço onde seu backend está rodando 🚨
        target: 'http://localhost:3001', 
        changeOrigin: true,
        // (Opcional) Rewrite a URL se necessário, mas para '/api' geralmente não é
        // rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
// SOLUÇÃO: Força o Vite a pré-otimizar o pacote
  optimizeDeps: {
    include: [
      '@vis.gl/react-google-maps', 
      // Se tiver outras libs que dão problemas de export, coloque-as aqui
    ],
  },
});
