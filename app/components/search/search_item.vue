<template>
    <div class="list_item" @click="itemClick">
        <div class="album_pic">
            <img :src="listData.coverUrlLarge" />
        </div>
        <div class="right_arrow iconfont">
            &#xe655;
        </div>
        <div class="album_titles">
            <span>{{ this.dataType === 1 ? listData.albumTitle : listData.trackTitle}}</span>
            <span>共{{ this.dataType === 1 ? listData.includeTrackCount :'1'}}个</span>
        </div>
    </div>

</template>

<script>
    import weui from 'weui.js'
    export default {
        props: {
            listData: {
                type: Object,
                require: false
            },
            dataType: {
                type: Number,
                require: false
            }
        },

        mounted() {
            console.log(this.dataType, this.listData);
        },
        methods: {
            itemClick() {
                if (this.dataType === 1) {
                    this.$router.push({
                        path: `/album/${this.listData.id}`
                    })
                } else {
                    this.$router.push({
                        path: `/play/${this.listData.id}`
                    })
                }

            }
        }

    }
</script>

<style scoped>

</style>