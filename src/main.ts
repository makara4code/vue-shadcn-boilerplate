import "./styles/index.css";
import "./styles/shiki.css";
import "./styles/themes.css";

import App from './App.vue'
import { createApp } from 'vue'
import i18n from "@/locales";
import pinia from '@/stores';
import router from '@/router'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
