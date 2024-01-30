import * as path from 'path';

import { createProxy } from './build/proxy';
import { loadEnv, type ConfigEnv, type UserConfig } from 'vite';
import { wrapperEnv } from './build/getEnv';
import { viteMockServe } from "vite-plugin-mock";

import Components from 'unplugin-vue-components/vite';
import dayjs from 'dayjs';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import pkg from './package.json';
import Vue from '@vitejs/plugin-vue';


const { devDependencies, name, version } = pkg;

const __APP_INFO__ = {
  pkg: { devDependencies, name, version },
  lastBuildTime: dayjs().format('DD-MM-YYYY HH:mm:ss'),
};

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  return {
    base: viteEnv.VITE_APP_BASE_PATH,
    root,
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        { find: 'vue-i18n', replacement: 'vue-i18n/dist/vue-i18n.cjs.js' },
      ],
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    plugins: [
      Vue(),
      Components({
        resolvers: [
          IconsResolver({
            alias: {
              lucide: 'lucide-vue-next',
            },
          }),
        ],
      }),
      Icons({
        compiler: 'vue3',
        autoInstall: true,
      }),

      viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        enable: true,
        watchFiles: true,
      }),
    ],
    server: {
      host: '0.0.0.0',
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      proxy: createProxy(viteEnv.VITE_PROXY),
    },
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      outDir: 'dist',
      minify: 'esbuild',
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  };
};
