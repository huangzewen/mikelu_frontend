<template>
	<div class="list_item" @click="itemClick">
		<div class="album_pic">
			<img :src="cateItem.coverUrlLarge" />
		</div>
		<div class="right_arrow iconfont">
			&#xe655;
		</div>
		<div class="album_title">
			<span>{{cateItem.albumTitle}}</span>
			<span>共{{cateItem.includeTrackCount}}个</span>
		</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props: {
            cateItem: {
                type: Object,
                require: false
            }
        },
        mounted() {
            
        },
        methods: {
            itemClick() {
                this.$router.push({
                    path: `/album/${this.cateItem.id}`,
                    query:{
                        info:this.cateItem
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>