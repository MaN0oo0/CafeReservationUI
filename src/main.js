import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import './assets/main.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@/main.css';
const app = createApp(App);
app.use(store).use(router);
app.mount('#app');