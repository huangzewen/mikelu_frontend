<template>
    <div class="home">
        <swiper :isAuto="false" :img-head="topHeadImg"></swiper>
        <!--search-->
        <div class="searchbar">
            <div class="iptArea">
                <input type="input" name="" value="" v-model="searchkeyword" placeholder="搜索您喜欢的儿歌、专辑、故事">
            </div>
            <div class="schBtn iconfont" @click="goToSearch">
                &#xe638;
            </div>
        </div>
        <category-select :tag-list="cateTag"></category-select>
        
        <hot-recommend :data-recommend="recommend" :data-type="recommendTag"></hot-recommend>
        <div class="fav_item weui-flex" @click="goToFav">
            <div class="icon iconfont">&#xe602;</div>
            <div class="title">
                收藏列表
            </div>
            <div class="rightArrow iconfont">
                &#xe655;
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from '../public/swiper'
    import CategorySelect from './home_category_select'
    import HotRecommend from './hot_recommend'
    import Tools from '../../util/tool'
    import weui from 'weui.js'
    import Config from '../../util/config'
    export default {
        data() {
            return {
                tag: [{
                    tagName: 'haha'
                }],
                topHeadImg:Config.public.topHeadImg,
                cateTag: [],
                searchkeyword: '',
                recommend:[],
                recommendTag:''
            }
        },
        created() {
            // 这里开始初始化数据
            const loading = weui.loading('加载中')

            //init 初始化

        Tools.singleRequest('post',`http://common.fogcloud.io/web/fogapi/`,{
            method:'get',
            api:'getdevicebyuser',
            para:`{
                "open_id":"${localStorage.getItem('open_id')}"
            }`
        }).then(res=>{
            res.data.data.devicelist.forEach(ele=>{
                if(ele.wx_device_alias === Tools.queryName){
                    localStorage.setItem('fog_device_id',ele.fog_device_id)
                    localStorage.setItem('fog_product_id',ele.fog_product_id)
                    localStorage.setItem('wx_device_id',ele.wx_device_id)
                    return
                }
            })
            return Tools.singleRequest('post', Tools.reqUrl, {
                method: 'get',
                para: {
                    "method": "taobao.ailab.aicloud.open.audio.tag.list",
                    "schema": localStorage.getItem('fog_product_id'),
                    "user_id": localStorage.getItem('fog_device_id'),
                    "utd_id": localStorage.getItem('fog_device_id')
                }
            })   
        }).then(res => {
                if (res) {
                    this.tag = JSON.parse(res.data.ailab_aicloud_open_audio_tag_list_response.result.model)
                    // this.cateTag = this.tag.slice(0, 4)
                    this.cateTag = this.tag;
                    this.recommendTag = this.tag[1].tagName
                    console.log(JSON.parse(res.data.ailab_aicloud_open_audio_tag_list_response.result.model).length)
                }
                return Tools.singleRequest('post',Tools.reqUrl , {
                    method:'get',
                    para:{
                        "method":'taobao.ailab.aicloud.open.audio.album.list',
                        "schema": localStorage.getItem('fog_product_id'),
                        "user_id": localStorage.getItem('fog_device_id'),
                        "utd_id": localStorage.getItem('fog_device_id'),
                        "tag_name":this.tag[1].tagName,
                        "num":'1',
                        "size":'10'
                    }
                })
            }).then(res=>{
                this.recommend = JSON.parse(res.data.ailab_aicloud_open_audio_album_list_response.result.model).slice(0,4);
                loading.hide()
            })
        },
        components: {
            Swiper,
            CategorySelect,
            HotRecommend
        },
        methods: {
            goToSearch() {
                if (this.searchkeyword === '') {
                    weui.alert('请输入关键字')
                } else {
                    this.$router.push({
                        path: `/search/${this.searchkeyword}`
                    })
                }

            },
            goToFav() {
                this.$router.push({
                    path: '/fav'
                })
            }
        }
    }
</script>

<style>
    .home {
        margin-bottom: 100px;
    }
    
    .fav_item {
        position: relative;
        font-size: 20px;
        line-height: 50px;
        height: 50px;
        border-top: 1px solid #ffef6a;
        border-bottom: 1px solid #ffef6a;
    }
    
    .fav_item .icon {
        width: 30px;
        text-align: center;
        font-size: 30px;
        color: #fece00;
    }
    
    .fav_item .title {
        width: 85%;
        padding-left: 10px;
        box-sizing: border-box;
        font-size: 17px;
        color: #fece00;
    }
    
    .fav_item .rightArrow {
        width: 30px;
        color: #989898;
    }
</style>