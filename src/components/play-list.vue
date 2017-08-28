<template>
    <div class="playlist" v-show="realPlayList.length&&currentIndex > -1">
        <div class="item song-singer ellipsis">{{currentSong.name+"--"+currentSong.singer}}</div>
        <div class="progress item" ref="progressBar">
            <span class="start">{{format(this.currentTime)}}</span>
            <div  class="progress-bar" ref="progress" >
                <div class="now" ref="progressBtn" ></div>
            </div>
            <span class="end">{{format(currentSong.duration)}}</span>
        </div>
        <div class="play item">
            <i class="icon-prev same" @click.stop="prev"></i>
            <i :class="iCon" class="same" @click.stop="toggolePlay"></i>
            <i class="icon-next same" @click.stop="next"></i>
        </div>
        <audio :src="currentSong.url" ref="audio" @timeupdate="upDateTime"
        @ended="end"></audio>
    </div>
    
    
</template>

 <script type="text/ecmascript-6">
 import {mapGetters} from "vuex"
 import {mapActions} from "vuex"
 import {mapMutations} from "vuex"
 const progressBtnWidth = "0.2rem"
export default {
    data() {
        return {
            currentTime:'',
            
        }

    },
    created() {
      this.touch = {}
    },
    methods:{
        toggolePlay(){
            this.setPlayState(!this.playState)
        },
        prev(){
            let index = this.currentIndex-1;
            if(index==-1){
                index = this.realPlayList.length-1
            }
            this.setCurrentIndex(index);
            if(!this.playState){
                this.toggolePlay()
            }
        },
        next(){
            let index = this.currentIndex+1;
            if(index===this.realPlayList.length){
                index = 0
            }
            this.setCurrentIndex(index);
            if(!this.playState){
                this.toggolePlay()
            }
        },
        end(){
            this.next()
        },
        upDateTime(e){
            this.currentTime = e.target.currentTime
        },
        // 格式化时间
        format(time){
            const minute = Math.floor(time/60);
            const second = Math.floor(time%60);
            return `${minute}:${second}`
        },
        // 播放的进度条
        
      
        ...mapMutations({
            setPlayState:'setPlayState',
            setCurrentIndex:'setCurrentIndex'
        })
    },
    computed:{
        ...mapGetters([
            'currentSong',
            'playState',
            'currentIndex',
            'realPlayList',
            'officialPlayList'
        ]),
        iCon(){
        return this.playState?"icon-pause":"icon-play"
        },
        // 播放的百分比
        percent() {
        return this.currentTime / this.currentSong.duration
      },
    },
    created(){
        // console.log(this.realPlayList)
    },
    watch:{
        currentSong(){
            this.$nextTick(()=>{
                this.$refs.audio.play()
            })
        },
        playState(newPlayState){
            const audio = this.$refs.audio;
            this.$nextTick(()=>{
                newPlayState ? audio.play() : audio.pause()
            })
            
        }
    },
    components: {

    }
    
}
</script>

<style scoped lang="scss">
.playlist {
    width: 100%;
    height: 2.4rem;
    position: fixed;
    bottom: 0;
    left:0;
    display:flex;
    flex-direction: column;
    z-index:200;
    background: #222;
    align-content: center;
    .item{
        height:0.8rem;
        flex:1;
    }
    .song-singer{
        line-height:0.8rem;
        flex:1;
    }
    .progress {
        // position: relative;
        width: 100%;
        height:0.8rem;
        line-height:0.8rem;
        // top: 10px;
        // left: 0;
        span.start {
            // position: absolute;
            // left: 6px; // padding-right: 5px;
        }
        span.end {
            // position: absolute;
            // right: 4px; // padding-left: 5px;
        }
        .progress-bar {
            position: relative;
            width: 50%;
            height:0.1rem;
            bottom: 0.16rem;
            line-height:0.8rem;
            display: inline-block;
            background-color: rgba(255, 255, 255, .5);
            // vertical-align: 2px;
            border-radius: 3px;
            cursor: pointer;

            .now {
                position: absolute;
                left: 0;
                display: inline-block;
                line-height:0.8rem;
                max-width: 100%; // width: 70%;
                height:0.1rem;
                background-color: #31c27c;
            }
            .now::after {
                content: "";
                line-height:0.8rem;
                position: absolute;
                left: 100%;
                width: 0.2rem;
                height: 0.1rem;
                background-color: yellow;
            }
        }
    }
    .play{
        display:flex;
        align-items: center;
        height:0.8rem;
        line-height:0.8rem;
        .same{
            font-size:1rem;
            flex:1
        }
        
    }
}
</style>
