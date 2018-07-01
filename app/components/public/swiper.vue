<template>
    <div class="swiper_wrap" @touchstart = "touchStart" @touchmove = "touchMove" @touchend="touchEnd">
        <div class="swiper_item" v-for="item in imgHead">
            <img :src="item"/>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isTouch: false,
                isMove: false,
                startX: 0,
                moveX: 0,
                currentIndex: 0
            }
        },
        props: {
            isAuto: {
                type: Boolean,
                require: false,
                default: true
            },
            imgHead:{
                type: Array,
                require:false
            }
        },
        mounted() {
            this.imgHead.forEach((ele, index) => {
                this.$el.children[index].style.transform = `translate3d(${index*100}%,0,0)`
            });
            if (this.isAuto) {
                setInterval(() => {
                    this.autoMove()
                }, 4000)
            }
        },
        updated() {
            console.log(this.isAuto);
        },
        methods: {
            touchStart(e) {
                this.isTouch = true
                this.startX = e.changedTouches[0].clientX
            },
            touchMove(e) {
                if (!this.isTouch) {
                    return
                }
                this.moveX = e.changedTouches[0].clientX - this.startX
                this.isMove = true
            },
            touchEnd(e) {
                if (!this.isMove) {
                    return
                }
                this.moveFn()
                this.isTouch = false
                this.isMove = false
            },
            autoMove() {
                if (this.currentIndex < this.imgHead.length - 1) {
                    this.currentIndex += 1;
                } else {
                    this.currentIndex = 0;
                }
                this.$el.style.transform = `translate3d(-${100*this.currentIndex}%,0,0)`;
                this.$el.style.transition = `transform 0.5s ease-out`;

            },
            moveFn() {
                if (this.moveX < -100) {
                    //right
                    if (this.currentIndex < this.imgHead.length - 1) {
                        this.currentIndex += 1;
                    } else {
                        this.currentIndex = 0
                    }
                    this.moveSlide()
                } else {
                    //left
                    if (this.currentIndex < this.imgHead.length - 1 && this.currentIndex !== 0) {
                        this.currentIndex -= 1;
                    } else {
                        this.currentIndex = 0;
                    }
                    this.moveSlide();
                }
            },
            moveSlide() {
                this.$el.style.transform = `translate3d(-${100*this.currentIndex}%,0,0)`;
                this.$el.style.transition = `transform 0.3s ease-out`;
            }
        }
    }
</script>

<style scoped>
    .swiper_wrap {
        position: relative;
        height: 4.69rem;
    }
    
    .swiper_wrap .swiper_item {
        position: absolute;
        height: 4.69rem;
    }
    
    .swiper_wrap .swiper_item img {
        width: 100%;
        height: 4.69rem;
    }
</style>