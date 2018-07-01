<template>
  <div class="fav_list_item">
    <div class="rightSide iconfont" @click="menuBtn">&#xe60f;</div>
    <div class="fav_list_item_title" @click="playBtn">{{musicItem.music_name}}</div>
  </div>
</template>

<script>
  import Tools from '../../util/tool'
  import weui from 'weui.js'


  export default {
    props: {
      musicItem:{
        type:Object,
        require:false
      }
    },
    methods: {
      menuBtn(){
        var _ = this
        weui.actionSheet([
            {
                label: '播放',
                onClick: function () {
                    _.playBtn()
                }
            }, {
                label: '删除',
                onClick: function () {
                    _.deleteFn()
                }
            }
        ], [
            {
                label: '取消',
                onClick: function () {
                    console.log('取消');
                }
            }
        ]);
      },
      playBtn(){
        Tools.SinglePlayToDevice(this.musicItem.track_id,'',function(res){
          if(res){
            console.log(res)
          }
        })
      },
      deleteFn(){
        this.$emit('whatDelet',this.musicItem.track_id)
        Tools.singleRequest('delete', Tools.fogCollectionUrl +  `?track_id=${this.musicItem.track_id}&collection=${this.musicItem.collection}`)
          .then(res=>{
            console.log(res)
          })
      }
    }
  }
</script>

<style scoped>

</style>