import { createApp } from 'vue'
import './style.css'
import App from './Layout.vue'
import './assets/styles/default-off.css';
import clickOutsideDirective from "@/shared/clickOutsideDirective.ts";

const app = createApp(App)
app.directive('click-outside', clickOutsideDirective)

app.mount('#app')