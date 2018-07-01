<template>
    <div id='app'>
        <router-view></router-view>  
        <!-- <play-to-device v-show="IS_SHOW_BOTTOM_PLAYAREA"></play-to-device> -->
        
    </div>
</template>

<script>
    import weui from 'weui.js'
    import PlayToDevice from './components/public/playtodevice'
    import Tools from './util/tool'



    export default {　
        created() {

        },
        components: {
            PlayToDevice
        },
        computed: {
            IS_SHOW_BOTTOM_PLAYAREA() {
                return this.$store.state.IS_SHOW_BOTTOM_PLAYAREA
            }
        }
    }
</script>

<style>
    @import './assets/base.scss';
</style>