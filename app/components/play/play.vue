<template>
<div>
<section class="play_board_wrap">
        <div class="play_music_title">
            告白气球
        </div>
        <div class="play_pic">
        
        </div>
        <div class="play_info">
            <div>简介</div>
            <div>塞纳河畔，左岸的咖啡，我手一杯，品尝你的美，留下唇印的嘴</div>
        </div>
        <div class="play_state">
            <div class="play_progress">
                <div class="progress_bg"></div>
                <div class="progress_go"></div>
            </div>
            <span class="toLeft">00:00</span>
            <span class="toRight">04:10</span>
        </div>
        <div class="controlPanel">
            <span class="iconfont">&#xe639;</span>
            <span class="iconfont" >&#xe604;</span>
            <span class="iconfont">&#xe602;</span>
        </div>
    </section>
</div>
</template>

<script>
    import Tools from '../../util/tool'
    export default {
        data() {
            return {
                playId: ''
            }
        },
        created() {
            this.playId = this.$route.params.id

        },
        mounted() {
            this.$store.commit('IS_SHOW_BOTTOM_PLAYAREA', false)

            // Tools.singleRequest('post', Tools.reqUrl, {
            //     method: 'get',
            //     para: {
            //         "method": "taobao.ailab.aicloud.open.audio.track.list",
            //         "schema": "aaabbbccddd",
            //         "user_id": '13188771122',
            //         "utd_id": "adfdfdfd",
            //         "album_id": this.tagId,
            //         "sort": "ASC",
            //         "num": '1',
            //         "size": '10'
            //     }
            // })
        },
        components: {

        },
        beforeDestroy() {
            this.$store.commit('IS_SHOW_BOTTOM_PLAYAREA', true)
        }
    }
</script>

<style scoped>
    .mask{
        background: #eee;
        opacity: 0.5;
    }
</style>