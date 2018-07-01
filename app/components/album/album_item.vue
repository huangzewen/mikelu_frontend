<template>
    <div class="music_list">
        <div class="music_line">
            <div class="music_pic"><img :src="albumData.coverUrlLarge"/></div>
            <div class="seemore iconfont" @click="showFn">{{isShow ? '&#xe64c;' : '&#xe654;'}}</div>
            <div class="music_title">
                <ul>
                    <li>{{albumData.trackTitle}}</li>
                    <li>{{durationFormatTime}}</li>
            </ul>  
            </div>
        </div>
        <div class="music_btn" v-show="isShow">
            <ul class="function">
                <li @click="toDevice">
                    <span class="iconfont">&#xe639;</span>
                    <span>点播</span>
                </li>
                <!-- <li @click = "goToPlay">
                    <span class="iconfont">&#xe604;</span>
                    <span>试听</span>
                </li> -->
                <li @click="toFav">
                    <span class="iconfont">&#xe602;</span>
                    <span>收藏</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import weui from 'weui.js'
    import Tools from '../../util/tool'

    export default {
        data () {
            return {
                isShow:false,
                favAction:[]
            }
        },
        props: {
            albumData: {
                type: Object,
                require: false
            }
        },
        mounted () {
            var _ = this
        },
        methods: {
            goToPlay() {
                // this.$router.push({
                //     path: `/play/${this.albumData.id}`
                // })
                weui.alert('暂不支持')
            },
            showFn(){
                this.isShow = !this.isShow
            },
            toDevice(){
                Tools.SinglePlayToDevice(this.albumData.id, Tools.device_id,function(res){
                    console.log(res);
                })
            },
            toFav(){
                this.$emit('itemMenu',{id: this.albumData.id , music_name:this.albumData.trackTitle})
            },
            
        },
        computed: {
            durationFormatTime(){
                let min = Math.floor(this.albumData.duration / 60);
                let seconds = this.albumData.duration % 60;
                let times = (min !== 0 ? min + ':' : '') + (seconds < 10 ? '0' + seconds:seconds)
                return times
            }
        }

    }
</script>

<style scoped>
    .music_title li:first-child {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>