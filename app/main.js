import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Tool from './util/tool'
import App from './App'
import router from './router'
import weui from 'weui.js'
import Store from './store/store'


//设置html font-size
document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px'



let url = window.location.href
let paramObj = Tool.getParamFromUri(url)
localStorage.setItem('open_id',paramObj.open_id)
paramObj.device_id = paramObj.device_id.replace('#/','')
localStorage.setItem('device_id', paramObj.device_id)


Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(weui)

new Vue({
    el: '#app',
    router: router,
    store: Store,
    render: h => h(App)
})