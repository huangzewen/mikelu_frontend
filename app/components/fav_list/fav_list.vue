<template>
    <div class="fav_list">
      <fav-list-item v-for="(item,index) in music_list" :key="index" :music-item="item" v-on:whatDelet="whatDelet"></fav-list-item>
    </div>
  </template>
  
  <script>
    import FavListItem from './fav_list_item'

    export default {
      data () {
        return {
          music_list:[]  
        }
      },
      components: {
        FavListItem
      },
      mounted () {
        this.music_list = this.$route.query.musicList
      },
      methods: {
        whatDelet(trackid){
          this.music_list.forEach((ele,index) => {
            if(ele.track_id === trackid){
              this.music_list.splice(index,1)
              return
            }
          })
        }
      }
    }   
  </script>
  
  <style scoped>
    
  </style>