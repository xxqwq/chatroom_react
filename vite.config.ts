import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  AutoImport({
    imports: [
      // 自动导入react相关
      'react'
    ],
    dts: 'src/auto-imports.d.ts'
  })],
  resolve: {
    alias: {
      '@': '/src', // 修改为你的实际路径
    },
  },
});
