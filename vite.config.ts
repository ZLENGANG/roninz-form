import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        globalTypeFiles: ['./src/types/global.d.ts'],
      },
    }),
    dts({
      tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
    }),
  ],
  build: {
    outDir: 'dist', //输出文件名称
    lib: {
      entry: path.resolve(__dirname, './src/components/index.ts'), //指定组件编译入口文件
      name: 'RoninzForm',
      fileName: 'roninz-form',
    }, //库编译模式配置
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'element-plus'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    }, // rollup打包配置
  },
});
