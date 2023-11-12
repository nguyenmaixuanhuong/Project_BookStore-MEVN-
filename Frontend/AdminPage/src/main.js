import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// const fileUpload = require('express-fileupload');
const app = createApp(App)

app.use(router)
// app.use(fileUpload())
app.mount('#app')
