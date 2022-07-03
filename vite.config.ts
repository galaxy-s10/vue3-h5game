import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

// @ts-ignore
import { outputStaticUrl } from './config/utils/outputStaticUrl';

const path = require('path');
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  return {
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src') },
      /**
       * 不建议省略.vue后缀
       * https://cn.vitejs.dev/config/shared-options.html#resolve-extensions
       */
      // extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue'],
    },
    plugins: [
      legacy(),
      vue(),
      eslint({
        failOnError: false,
        failOnWarning: false,
        cache: true,
      }),
    ],
    build: {
      target: 'es2015', // 默认:modules
    },
    define: {
      ['process.env']: {
        NODE_ENV: isProduction ? 'production' : 'development',
        PUBLIC_PATH: outputStaticUrl(isProduction),
        VUE_APP_RELEASE_PROJECT_NAME: require('./package').name,
        VUE_APP_RELEASE_PROJECT_VERSION: require('./package').version,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          /**
           * 这里的样式会注入到每一个vue组件中，请慎用
           */
          additionalData: `@use "sass:math";@import "@/assets/css/global.scss";`,
          // cli5以下用prependData，cli5及以上本用additionalData，如果报错尝试在路径别名前加~，如@import "~@/assets/css/global.scss";
        },
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://info.interacmobi.com', // TODO:这个要换成constant.js里面的H5_APP_STRATEGY_URL
          secure: false, // 默认情况下（secure: true），不接受在HTTPS上运行的带有无效证书的后端服务器。设置secure: false后，后端服务器的HTTPS有无效证书也可运行
          /**
           * changeOrigin，是否修改请求地址的源
           * 默认changeOrigin: false，即发请求即使用devServer的localhost:port发起的，如果后端服务器有校验源，就会有问题
           * 设置changeOrigin: true，就会修改发起请求的源，将原本的localhost:port修改为target，这样就可以通过后端服务器对源的校验
           */
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/'),
        },
      },
    },
  };
});
