<template>
    <div class="playtodevice">
        <div class="album_pic">
            
        </div>
        <div class="play_content">
            <span>英语</span>
            <span>04:10</span>
            <span>《早教英语》</span>
        </div>
        <div class="control">
            <span class="iconfont">&#xe62a;</span>
            <span class="iconfont">&#xe60a;</span>
            <span class="iconfont">&#xe604;</span>
            <span class="iconfont">&#xe60b;</span>
        </div>
        <div class="mask"></div>
    </div>
</template>

<script>
    export default {


    }
</script>

<style scoped>
    .mask{
        background: #eee;
        opacity: 0.5;
        z-index: 999;
        width: 100%;
        height: 65px;
        top: 0;
        position: absolute;
    }
    .playtodevice {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 65px;
        background: #fece00;
        z-index: 9;
    }
    
    .playtodevice::after {
        content: "";
        clear: both;
        overflow: hidden;
        height: 0;
        visibility: hidden;
    }
    
    .album_pic {
        width: 50px;
        height: 50px;
        float: left;
        border: 1px solid #eee;
        margin: 6px;
        border-radius: 50%;
    }
    
    .play_content {
        float: left;
        font-size: 10px;
        /* border: 1px solid rebeccapurple; */
        width: 70px;
        color: #fff;
        padding: 5px 0;
    }
    
    .play_content span {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 20px;
    }
    
    .play_content span:first-child {
        font-size: 14px;
    }
    
    .play_content span:nth-child(0n+2) {
        font-size: 14px;
    }
    
    .control {
        position: relative; 
         margin-left: 130px;  
         text-align: right;  
        padding-right: 20px; 
        box-sizing: border-box;
        /* border: 1px solid red;  */
    }
    
    .control span {
        display: inline-block;
        width: 30px;
        height: 30px;
        /* border: 1px solid blue; */
        color: #fff;
        font-size: 16px;
        text-align: center;
        line-height: 32px;
        border: 1px solid #fff; 
        border-radius: 50%;
    }
    
    .control span:first-child {
        border: none;
        font-size: 20px;
    }
    
    .control span:nth-child(3) {
        width: 40px;
        height: 40px;
        line-height: 45px;
        font-size: 20px;
    }
</style>