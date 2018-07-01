import {
    IS_SHOW_BOTTOM_PLAYAREA,
    STORY_TAGLIST
} from './store_mutations_type'



const mutation = {
    [IS_SHOW_BOTTOM_PLAYAREA](state, bool) {
        state.IS_SHOW_BOTTOM_PLAYAREA = bool
    },
    [STORY_TAGLIST](state, obj) {
        state.STORY_TAGLIST = obj
    }
}

export default mutation