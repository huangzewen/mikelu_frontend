<template>
    <div class="select_cate_wrap">
        <!---->
        <div class="selectcategory" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
            <category-item v-for="(item,index) in tagList" :tag-item="item"  :key="index"></category-item>
        </div>
    </div>
</template>

<script>
    import CategoryItem from './home_category_select_item'

    export default {
        data () {
            return {
                startX: 0,
                isMove: false,
                isTouch: false,
                moveX: 0,
                moveDistance: 0
            }
        },
        components: {
            CategoryItem,
            
        },
        props: {
            tagList: {
                type: Array,
                reqiure: false
            }
        },
        methods: {
            touchStart(e){
                this.isTouch = true
                this.startX = e.changedTouches[0].clientX
            },
            touchMove(e){
                if(!this.isTouch){
                    return
                }
                this.moveX = e.changedTouches[0].clientX - this.startX
                let transformMoveDistance = this.moveDistance + this.moveX
                if(transformMoveDistance > 0) {
                    transformMoveDistance = 0
                    this.moveDistance = 0
                }else if(transformMoveDistance < -(this.tagList.length * 70)){
                    transformMoveDistance = -(this.tagList.length * 70)
                    this.moveDistance = -(this.tagList.length * 70)
                }
                this.$el.children[0].style.transform = `translate3d(${transformMoveDistance}px , 0 ,0)`
                console.log(this.moveDistance);
            },
            touchEnd(e){ 
                this.moveDistance = this.moveDistance + (e.changedTouches[0].clientX - this.startX)
                this.isTouch = false
            }
        }
    }
</script>

<style scoped>
    /*---------------------*/
    
    .selectcategory {
        width: 100%;
        margin: 10px 0;
        transform: translate3d(0, 0, 0);
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
    }

</style>