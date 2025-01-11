import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: 'out/main', 
      rollupOptions: {
        input: [
          resolve(__dirname, 'src/main/index.js'),   
          resolve(__dirname, 'src/main/server.js'),  
        ],
      }, 
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: 'out/preload',  // Optional: If you have a preload script, set the outDir
    },
  },
  renderer: {
    plugins: [react()],
    build: {
      outDir: 'out/renderer',
      chunkSizeWarningLimit: 500,  
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      },
    },
  },
});
