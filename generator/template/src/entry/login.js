import Vue from 'vue'
import App from '@/pages/auth/login.vue'
Vue.config.productionTip = false
new Vue({ render: h => h(App) }).$mount('#app')
