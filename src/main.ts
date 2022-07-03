import { createApp } from 'vue';

import App from './App.vue';

import router from '@/router/index';
import store from '@/store/index';
import '@/assets/css/overwrite.scss';
import '@/utils/lib-flexible';

console.log(process.env);
console.table(process.env);

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
