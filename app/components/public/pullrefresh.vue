<template>
    <!--增加判断。PC or Mobile-->
    <div class="refresh_wrap" ref="fresh_scroll" @touchstart = "touchStart" @touchmove="touchMove" @touchend = "touchEnd">
        <slot name="fresh"></slot>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                startY: 0,
                moveY: 0,
                isMove: false,
                moveY:0,
                scrollHeight: 0,
                platform: false, // false mobile , true pc
                scrollTop: 0,
                hasData: true
            }
        },
        props: {
            scrollType: {
                type: String,
                require: false,
                default: 'topTobottom' //滚动刷新
            },
            onRefresh: {
                type: Function,
                require: true
            },
            innerFresh: {
                type: Boolean,
                require: false,
                default: false
            },
            scrollVal: {
                type: Number,
                require: false
            }
        },
        created() {


        },
        mounted() {
            this.scrollHeight = this.$el.scrollHeight;
            window.addEventListener('scroll', this.scrollFn);
        },
        updated() {
            this.scrollHeight = this.$el.scrollHeight;
        },
        methods: {
            wheelFn(e) {
                if (e.deltaY > 60) { //down
                    this.PublicFn();
                    this.isMove = true;
                }
            },
            touchStart(e) {
                this.isMove = true;
                this.startY = e.touches[0].pageY;
                // console.log('touchstart',this.startY,this.scrollTop,this.scrollHeight);
            },
            touchMove(e) {
                if (!this.isMove) {
                    return;
                }
                this.moveY = e.touches[0].pageY - this.startY
                this.$el.style.transform = "translate3d(0,-50px,0)";
                this.$el.style.transition = "transform 0.3s ease-in-out";

                
            },
            touchEnd(e) {
                if(this.moveY < 0){
                    this.$el.style.transform = "translate3d(0,0,0)";
                    this.$el.style.transition = "transform 0.3s ease-in-out";
                    let minusVal;
                    if (this.innerFresh) {
                        minusVal = Math.round(this.scrollHeight - document.documentElement.clientHeight * 0.6 + 60);
                        this.scrollTop = this.scrollVal;
                    } else {
                        minusVal = this.scrollHeight - document.documentElement.clientHeight + 65;
                    }
                    if (this.scrollTop > minusVal - 100) {
                        if (this.hasData) {
                            this.onRefresh();
                        }
                    }
                    this.moveY = 0;
                }
                
            },
            scrollFn() {
                this.scrollTop = document.body.scrollTop;
            },
            noMoreFn(bool) {
                this.hasData = bool;
                console.log(this.hasData);
            },
            /* PC */
            PublicFn() {
                let minusVal;
                if (this.innerFresh) {
                    minusVal = Math.round(this.scrollHeight - document.documentElement.clientHeight * 0.6 + 60);
                    this.scrollTop = this.scrollVal;
                } else {
                    minusVal = this.scrollHeight - document.documentElement.clientHeight + 64;
                }
                console.log(minusVal, this.scrollHeight, this.scrollTop);
                if (this.scrollTop > minusVal - 100) {
                    if (this.hasData) {
                        this.onRefresh();
                        //console.log(this.scrollHeight,this.scrollTop,this.$el.offsetHeight,this.$el.clientHeight,document.documentElement.clientHeight);
                    }
                }
            }
            /* Mobile */
        }
    }
</script>