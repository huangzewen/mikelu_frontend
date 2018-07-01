<template>
    <div class="album_wrap">
        <scroll-wrap :on-refresh="onRefresh">
            <div slot="fresh" :inner-fresh="true">
                <album-head :tag-item="tagItem"></album-head>
                <album-item v-for = "(item , index) in album_list" :album-data='item' :key="index"  v-on:itemMenu="itemMenuSelect"></album-item>
            </div>
        </scroll-wrap>
    </div>
</template>

<script>
    import AlbumItem from './album_item'
    import AlbumHead from './album_head'
    import ScrollWrap from '../public/pullrefresh'
    import Tools from '../../util/tool'
    import weui from 'weui.js'

    export default {
        data() {
            return {
                tagId: '',
                album_list: [],
                tagName:'',
                album_item:[],
                page:1,
                num:10,
                totalCount:0,
                isEnd:false,
                favItemList:[],
                selectedMusic:{}
            }
        },
        components: {
            AlbumItem,
            AlbumHead,
            ScrollWrap
        },
        created() {
            this.tagId = this.$route.params.id;
            this.tagItem = this.$route.query.info
        },
        mounted() {
            var _ = this;
            Tools.singleRequest('post', Tools.reqUrl, {
                method: 'get',
                para: {
                    "method": "taobao.ailab.aicloud.open.audio.track.list",
                    "schema": localStorage.getItem('fog_product_id'),
                    "user_id": localStorage.getItem('fog_device_id'),
                    "utd_id": localStorage.getItem('fog_device_id'),
                    "album_id": this.tagId,
                    "sort": "ASC",
                    "num": '1',
                    "size": '10'
                }
            }).then(res => {
                if (res) {
                    this.album_list = JSON.parse(res.data.ailab_aicloud_open_audio_track_list_response.result.model);
                    this.totalCount = this.tagItem.includeTrackCount
                } 
            });
            Tools.singleRequest('get', Tools.fogUrl + `?device=${localStorage.getItem('fog_device_id')}`)
                .then(res=>{
                    res.data.data.forEach(ele=>{
                        this.favItemList.push({
                            label:ele.name,
                            onClick:function(){
                                _.addToFav(ele.id)
                            }
                        })
                    })
                })
        },
        methods: {
            onRefresh(){
                if(this.isEnd){
                    weui.alert('没有数据了')
                }else{
                    this.page += 1
                    Tools.singleRequest('post', Tools.reqUrl, {
                        method: 'get',
                        para: {
                            "method": "taobao.ailab.aicloud.open.audio.track.list",
                            "schema": localStorage.getItem('fog_product_id'),
                            "user_id": localStorage.getItem('fog_device_id'),
                            "utd_id": localStorage.getItem('fog_device_id'),
                            "album_id": this.tagId,
                            "sort": "ASC",
                            "num": this.page.toString(),
                            "size": '10'
                        }
                    }).then(res => {
                        if (res) {
                            if(JSON.parse(res.data.ailab_aicloud_open_audio_track_list_response.result.model).length < 10){
                                this.page -= 1;
                                this.isEnd = true
                            }
                            this.album_list = this.album_list.concat(JSON.parse(res.data.ailab_aicloud_open_audio_track_list_response.result.model));
                        } 
                    });
                }
            },
            itemMenuSelect(obj){
                this.selectedMusic = obj
                weui.actionSheet(this.favItemList, [
                    {
                        label: '取消',
                        onClick: function () {
                            console.log('取消');
                        }
                    }
                ], {
                    className: 'custom-classname'
                });
            },
            addToFav(obj){
                console.log(obj, this.selectedMusic)
                 Tools.singleRequest('post', Tools.fogCollectionUrl, {
                    track_id: this.selectedMusic.id,
                    collection: obj,
                    music_name:this.selectedMusic.music_name
                }).then(res=>{
                    console.log(res)
                })
            }
        }
    }
</script>

<style scoped>
    .album_wrap {
        /* margin-bottom: 70px; */
    }
</style>