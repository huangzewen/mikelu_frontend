<template>
    <div>
        <div class="fav_list_wrap">
            <div class="list_wrap">
                <fav-item  v-for="(item,index) in fav_list" :fav-item="item" :fav-index="index" :key="index"></fav-item>           
            </div>
            <div class="addFav iconfont" @click="addFav" v-show="isShowAdd">
                &#xe608;
            </div>
        </div>
    </div>
</template>

<script>
    import FavItem from './fav_item'
    import weui from 'weui.js'
    import Tools from '../../util/tool'

    export default {
        data () {
            return {
                 fav_list:[],
                 fav_name:'新建',
                 isShowAdd:false     
            }
        },
        components: {
            FavItem
        },
        created () {
            Tools.singleRequest('get', Tools.fogUrl + `?device=${localStorage.getItem('fog_device_id')}`).then(res=>{
                this.fav_list = res.data.data
                if(this.fav_list.length === 3){
                    this.isShowAdd = false
                }else{
                    this.isShowAdd = true
                }
            })
        },
        methods: {
            addFav() {
                weui.dialog({
                    title: '新建收藏列表',
                    content: '<input class="inputArea" id="inputDOM" value="收藏夹'+ (this.fav_list.length + 1) +'" v-model="fav_name"/>',
                    className: 'cus_addFav_item',
                    buttons: [{
                        label: '取消',
                        type: 'default',
                        onClick: function () { alert('取消') }
                    }, {
                        label: '确定',
                        type: 'primary',
                        onClick: this.CreateFavConfirmBtn
                    }]
                });
            },
            CreateFavConfirmBtn(){
                let inputDOM = document.getElementById('inputDOM')
                let fav_name = inputDOM.value
                
                if(fav_name === ''){
                    console.log('kong')
                    return
                }
                Tools.singleRequest('post', Tools.fogUrl, {
                    device: localStorage.getItem('fog_device_id'),
                    name:fav_name
                }).then(res=>{
                    console.log(res);
                    window.location.reload()
                })
            }
        }
    }
</script>

<style scoped>
    
</style>