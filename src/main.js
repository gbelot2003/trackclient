import Vue from 'nativescript-vue'
import App from './components/App'
import Home from './components/Home'
import Drawpad from './components/Drawpad'
import Barcode from './components/Barcode'

import store from './store'

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
Vue.registerElement('DrawingPad', () => require('@nativescript-community/drawingpad').DrawingPad);
Vue.registerElement('BarcodeScanner', () => require('nativescript-barcodescanner').BarcodeScannerView)

new Vue({
  render: h => h('frame', [h(Barcode)]),
  store,
}).$start()
