<template>
    <div class="holdBox">
        <div class="selcat_item iconfont" @click="AlbumDetail()">&#xe62b;</div>
        <div class="select_item_title">{{tagItem.tagName}}</div>
    </div>
</template>

<script>
    export default {
        props: {
            tagItem: {
                type: Object,
                require: false
            }
        },
        methods: {
            AlbumDetail() {
                this.$router.push({
                    path: `/cate/${this.tagItem.tagName}`
                })
            }
        }
    }
</script>

<style scoped>
    .selectcategory .holdBox {
        width: 25%;
        margin: 0 2%;
    }
    
    .selectcategory .holdBox .selcat_item {
        width: 60px;
        height: 60px;
        border: 1px solid #fece00;
        margin: 5px auto;
        border-radius: 50%;
        font-size: 24px;
        line-height: 60px;
        text-align: center;
        color: #fece00;
    }
    
    .selectcategory .holdBox .select_item_title{
        font-size: 12px;
        text-align: center;
    }
</style>