<template>
    <div class="hot_recommend_wrap">
        <div class="recommend_title">
            <span>热门推荐</span>
            <span @click="goToMore">更多</span>
        </div>
        <div class="recommend_content weui-flex">
            <div class="holdBox" v-for="item in dataRecommend">
                <div class="item" @click="goToAlbum(item.id,item)">
                    <img :src="item.coverUrlLarge" />
                </div>
                <div class="item_title">
                    {{item.albumTitle}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'name',
        methods: {
            goToAlbum(index,item) {
                this.$router.push({
                    path: `album/${index}`,
                    query:{
                        info:item
                    }
                })
            },
            goToMore(){
                this.$router.push({
                    path: `cate/${this.dataType}`
                })
            }
        },
        props: {
            dataRecommend:{
                require:true,
                type:Array
            },
            dataType:{
                require: true,
                type: String
            }
        }
    }
</script>

<style scoped>
    .hot_recommend_wrap {
        position: relative;
        margin-bottom: 10px;
    }
    
    .recommend_title {
        font-size: 17px;
        border-top: 2px solid #feff8f;
        line-height: 40px;
        padding: 0 20px;
        color:#fece00;
    }
    .recommend_title span:last-child{
        font-size: 12px;
        color: #000;
        float: right;
    }
    
    
    .recommend_content {
        position: relative;
    }
    
    .recommend_content .holdBox {
        width: 25%;
    }
    
    .recommend_content .holdBox .item {
        width: 60px;
        height: 60px;
        border: 1px solid #eee;
        margin: 0 auto;
    }

    .recommend_content .holdBox .item img{
        width: 100%;
        
    }
    
    .recommend_content .holdBox .item_title {
        width: 60px;
        font-size: 12px;
        margin: 0 auto;
        text-align: center;
        line-height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

</style>