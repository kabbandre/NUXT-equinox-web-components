import Vue from 'vue'

import { applyPolyfills, defineCustomElements } from 'equinox-web-components/loader'

Vue.config.productionTip = false
Vue.config.ignoredElements = [/e-\w*/]

// Bind the custom elements to the window object
applyPolyfills().then(() => {
  defineCustomElements(window)
})
