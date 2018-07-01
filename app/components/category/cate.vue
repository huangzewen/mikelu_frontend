<template>
    <section class="category_list_wrap">
       <div class="list_wrap">
            <scroll-wrap :on-refresh="onRefresh">
                <cate-item slot="fresh" v-for="(item,index) in cate_list" :cate-item = "item" :key="index"></cate-item>
            </scroll-wrap>
        </div>
    </section>
</template>

<script>
    import CateItem from './cate_item'
    import Tools from '../../util/tool'
    import ScrollWrap from '../public/pullrefresh'
    import weui from 'weui.js';
    export default {
        data() {
            return {
                tagName: '',
                cate_list: [],
                page:1,
                num:10,
                isEnd:false
            }
        },
        components: {
            CateItem,
            ScrollWrap
        },
        created() {
            this.tagName = this.$route.params.name;
        },
        mounted() {
            Tools.singleRequest('post', Tools.reqUrl, {
                method: 'get',
                para: {
                    "method": "taobao.ailab.aicloud.open.audio.album.list",
                    "schema": "aaabbbccddd",
                    "user_id": '13188771122',
                    "utd_id": "adfdfdfd",
                    "tag_name": this.tagName,
                    "num": '1',
                    "size": '10'
                }
            }).then(res => {
                if (res) {
                    this.cate_list = JSON.parse(res.data.ailab_aicloud_open_audio_album_list_response.result.model)
                    console.log(JSON.parse(res.data.ailab_aicloud_open_audio_album_list_response.result.model));
                }
            })
           
        },
        methods: {
            onRefresh(){
                if(!this.isEnd){
                    this.page += 1
                    Tools.singleRequest('post', Tools.reqUrl, {
                        method: 'get',
                        para: {
                            "method": "taobao.ailab.aicloud.open.audio.album.list",
                            "schema": "aaabbbccddd",
                            "user_id": '13188771122',
                            "utd_id": "adfdfdfd",
                            "tag_name": this.tagName,
                            "num": this.page.toString(),
                            "size": '10'
                        }
                    }).then(res => {
                        if (res) {
                            if(JSON.parse(res.data.ailab_aicloud_open_audio_album_list_response.result.model).length < 10){
                                this.page -= 1;
                                this.isEnd = true
                            }
                            this.cate_list = this.cate_list.concat(JSON.parse(res.data.ailab_aicloud_open_audio_album_list_response.result.model))
                        }
                    })
                }else{
                    weui.alert('没有数据了')
                }
                
            }
        }
    }
</script>
<style scoped>

</style>