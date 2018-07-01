<template>
    <div class="clearfix">
        <div class="album_pics clearfix" style="float:left;">
            <img :src="tagItem.coverUrlLarge" >
        </div>
        <div class="album_title" style="margin-left:2px;">
            <span class="story">故事</span>
            <span class="story_num">(共{{tagItem.includeTrackCount}}集)</span>
            <h6>{{tagItem.albumTitle}}</h6>
            <!-- <div class="coll iconfont">&#xe602;</div>
            <div class="play iconfont">&#xe639;</div> -->
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            tagItem:{
                require:true,
                type:Object
            }
        }
        
    }
</script>

<style scoped>

</style>