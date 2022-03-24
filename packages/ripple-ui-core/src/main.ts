import { createApp } from 'vue'
import App from './App.vue'

import RplEventBusPlugin from '../plugins/eventbus'

createApp(App).use(RplEventBusPlugin).mount('#app')
