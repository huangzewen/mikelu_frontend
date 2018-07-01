<template>
    <div class="list_item">
        <div class="album_pic iconfont">
                &#xe62b;
            <!-- <img src="https://img.alicdn.com/imgextra/i3/786678272/TB2ZOGJaMOI.eBjSszhXXbHvFXa_!!786678272.jpg" /> -->
        </div>
        <!-- <div class="right_arrow iconfont" @click="actionSheetFn">
            &#xe60f;
        </div> -->
        <div class="album_titles">
            <span @click="goToCate">{{favItem.name}}</span>
            <span>共{{favItem.music_list.length}}个</span>
        </div>
    </div>
</template>

<script>
    import weui from 'weui.js'
    import Tools from '../../util/tool'

    export default {
        props:{
            favItem:{
                require:true,
                type:Object
            },
            favIndex:{
                require: true,
                type: Number
            }
        },
        methods: {
            deleteFn() {
                let _  =this;
                weui.confirm('是否删除此专辑？', {
                    title: '',
                    buttons: [{
                        label: 'NO',
                        type: 'default',
                        onClick: function() {
                            console.log('no')
                        }
                    }, {
                        label: 'YES',
                        type: 'primary',
                        onClick: function() {
                            Tools.singleRequest('delete', Tools.fogUrl + `?device=${localStorage.getItem('fog_device_id')}&id=${_.favItem.id}`)
                                .then(res=>{
                                    window.location.reload()
                                })
                        }
                    }]
                });
            },

            updateName(){
                let _  = this;
                weui.dialog({
                    title: '新建收藏列表',
                    content: '<input class="inputArea" id="inputDOM" value="收藏夹'+ this.favIndex +'" v-model="fav_name"/>',
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
                console.log(fav_name);
                if(fav_name === ''){
                    console.log('kong')
                    return
                }
                Tools.singleRequest('put', Tools.fogUrl, {
                    device: localStorage.getItem('fog_device_id'),
                    name:fav_name,
                    id:this.favItem.id
                }).then(res=>{
                    console.log(res);
                    window.location.reload()
                })
            },
            actionSheetFn() {
                console.log(this.favItem.id)
                var _ = this;
                weui.actionSheet([], [{
                    label: '取消',
                    onClick: function() {
                        console.log('你点击了取消哦');
                    }
                }], {
                    className: 'custom-classname'
                })
            },
            goToCate() {
                this.$router.push({
                    path: `/favlist/${this.favItem.id}`,
                    query:{
                        musicList: this.favItem.music_list
                    }
                })
            }
        }   
    }
</script>

<style scoped>

</style>