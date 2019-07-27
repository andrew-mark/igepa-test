import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: {
    tiny: 375,
    small: 480,
    medium: 768,
    medium_large: 980,
    large: 1024,
    extra_large: 1280,
    infinity: Infinity
  },
  defaultBreakpoint: 'sm' // customize this for SSR
})
