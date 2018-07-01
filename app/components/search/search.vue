<template>
    <section class="category_list_wrap bottomHigher">
        <div class="list_wrap">
            <scroll-fresh :on-refresh="onRefresh">
                <div slot="fresh">
                    <span class="sub_item_title">专辑</span>
                    <search-item v-for = "(item,index) in searchList_album" :key="index" :list-data="item" :data-type="1"></search-item>
                </div>
            </scroll-fresh>
            <!-- <span class="sub_item_title">声音</span>
            <search-item v-for = "(items,indexs) in searchList_track" :key="indexs" :list-data="items" :data-type="2"></search-item>     -->
        </div>
    </section>
</template>

<script>
    import SearchItem from './search_item'
    import Tools from '../../util/tool'
    import ScrollFresh from '../public/pullrefresh'
    import weui from 'weui.js'

    export default {
        data() {
            return {
                keyword: '',
                searchList_album: [],
                searchList_track: [],
                page:1,
                num:10,
                isEnd:true
            }
        },
        created() {
            this.keyword = this.$route.params.keyword
        },
        mounted() {
            Tools.singleRequest('post', Tools.reqUrl, {
                method: 'get',
                para: {
                    "method": 'taobao.ailab.aicloud.open.audio.search',
                    "schema": localStorage.getItem('fog_product_id'),
                    "user_id": localStorage.getItem('fog_device_id'),
                    "utd_id": localStorage.getItem('fog_device_id'),
                    "key": this.keyword,
                    "search_type": "3",
                    "num": '1',
                    "size": '10'
                }
            }).then(res => {
                if (res) {
                    this.searchList_album = JSON.parse(res.data.ailab_aicloud_open_audio_search_response.result.model).albums
                    this.searchList_track = JSON.parse(res.data.ailab_aicloud_open_audio_search_response.result.model).tracks
                }
            })
        },
        components: {
            SearchItem,
            ScrollFresh
        },
        methods: {
            onRefresh(){
                if(!this.isEnd){
                    this.page += 1
                    Tools.singleRequest('post',Tools.reqUrl , {
                        "method": 'taobao.ailab.aicloud.open.audio.search',
                        "schema": localStorage.getItem('fog_product_id'),
                        "user_id": localStorage.getItem('fog_device_id'),
                        "utd_id": localStorage.getItem('fog_device_id'),
                        "key": this.keyword,
                        "search_type": "3",
                        "num": this.page,
                        "size": '10'
                    }).then(res=>{
                        if(res){
                            if(JSON.parse(res.data.ailab_aicloud_open_audio_search_response.result.model).albums.length < 10){
                                this.page -= 1;
                                this.isEnd = true
                            }
                            this.searchList_album = this.searchList_album.concat(JSON.parse(res.data.ailab_aicloud_open_audio_search_response.result.model).albums)
                        }
                    })
                }else{
                    weui.alert('到最后了')
                }
            }
        }
    }
</script>

<style scoped>
    .sub_item_title {
        font-size: 14px;
        line-height: 40px;
        border-bottom: 1px solid #eee;
        display: block;
        padding: 0 10px;
    }
    
    .bottomHigher {
        margin-bottom: 80px;
    }
</style>