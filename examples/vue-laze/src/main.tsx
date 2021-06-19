import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

const root = document.getElementById('root');

if (root) {
  createApp(App).mount(root);
}
