import Vue from 'vue'
import App from './App.vue'
import router from './router'
import registerComponents from '../packages'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
Vue.use(Antd)

Vue.config.productionTip = false

registerComponents(Vue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
