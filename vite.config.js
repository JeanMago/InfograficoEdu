import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Substitui 'NOME_DO_REPOSITORIO' pelo nome exato do teu projeto no GitHub
export default defineConfig({
  plugins: [react()],
  base: '/NOME_DO_REPOSITORIO/', 
})