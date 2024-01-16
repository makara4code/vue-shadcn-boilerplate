import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { defineConfig } from 'vite'
import path from "path"
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [IconsResolver()],
    }),
    Icons(),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  }
})
