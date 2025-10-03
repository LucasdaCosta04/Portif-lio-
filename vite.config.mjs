import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Portif-lio-/', //Portif-lio is the name of the repository on GitHub
})
