import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
// SOLUÇÃO: Força o Vite a pré-otimizar o pacote
  optimizeDeps: {
    include: [
      '@vis.gl/react-google-maps', 
      // Se tiver outras libs que dão problemas de export, coloque-as aqui
    ],
  },
});
