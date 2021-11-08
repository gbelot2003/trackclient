import Vue from 'nativescript-vue'
import App from './components/App'
import Home from './components/Home'
import Drawpad from './components/Drawpad'
import store from './store'

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
Vue.registerElement('DrawingPad', () => require('@nativescript-community/drawingpad'));

new Vue({
  store,
  render: h => h('frame', [h(Drawpad)])
}).$start()
