import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import mutations from './store_mutations'


const state = {
    IS_SHOW_BOTTOM_PLAYAREA: true,
    STORY_TAGLIST: []
}

export default new Vuex.Store({
    state,
    mutations
})