import Vue from 'vue'
import App from '@/pages/index/index.vue'
Vue.config.productionTip = false
new Vue({ render: h => h(App) }).$mount('#app')
