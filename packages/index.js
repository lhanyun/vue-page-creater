const registerComponents = (Vue) => {
  Vue.component('c-area-wrap', () => import('./area-wrap'))
  Vue.component('c-white-space', () => import('./white-space'))
  Vue.component('c-art-list', () => import('./art-list'))
  Vue.component('zv-button', () => import('./button'))
}

export default registerComponents
