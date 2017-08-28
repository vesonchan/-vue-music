<template>
 <div class="singer">
    <div class="header">
        <i class="icon-back" @click="back"></i>
        <span class="singer-name">{{singer.name}}</span>
    </div>
    <ul class="songs">
        <li class="song" v-for="(song,index) in songs" @click="selectSong(song,index)" :class="{active:currentIndex===index}">
            <div class="song-img">
                <img src="" alt=""  v-lazy="song.image"> 
            </div>
            <span class="song-name ellispse">{{song.name}}--{{song.singer}}</span>
            <div class="icon-not-favarite" ></div>
        </li>
    </ul>
 </div>
</template>

 <script type="text/ecmascript-6">
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import {mapGetters} from 'vuex'
  import {mapActions} from "vuex"
 export default {
 data() {
 return {
    songs:[],
 }

 },
 created(){
    //  console.log(this.singer)
     this.getSinger()
 },
 computed:{
     ...mapGetters([
        'singer',
        'currentIndex'
      ])
    
 },
 methods:{
    back(){
         this.$router.back()
    },
    getSinger(){
         if (!this.singer.id) {
          this.$router.push('/singers')
          return
        }
         getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this.normalizeSongs(res.data.list)
            // console.log(this.songs)
          }
        })
    },
    normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
    },
    // 选中歌曲
    selectSong(song,index){
        // this.currentIndex = index
        this.setPlayList({songs:this.songs,index})
    },
    ...mapActions({
        setPlayList:"setPlayList"
    })
    
 },
 components: {

 }
 }
</script>

<style scoped lang="scss">
@import "../common/scss/mixin.scss";
.singer{
    position: fixed;
    top:0;
    bottom: 0;
    left:0;
    right:0;
    width:100%;
    z-index: 100;
    background: #222;
    overflow: scroll;
    .header{
        display: flex;
        align-items: center;
        .icon-back{
            padding-left:0.5rem;
            color:white;
            font-size: .9rem;
        }
        .singer-name{
            font-size: .8rem;
            font-weight: 900;
            // margin-bottom: .3rem;
            flex:1;
            padding-right: 1.4rem
        }

    }
    .songs{
        padding: 0.2rem 0.5rem;
        height: 100%;
        overflow:scroll;
        .song{
            display: flex;
            align-items: center;
            padding-top:.2rem;
            &.active{
                background:rgba(255, 255, 0,0.4);
            }
            // overflow:scroll;
            // font-size:50%;
            .song-img{
                flex:0 0 1.5rem;
                @include wh(1.5rem,1.5rem);
                img{ 
                    @include wh(100%,100%)
                }
            }
            .song-name{
                flex:1;
                text-align: left;
                margin-left:.7rem;
               
            }
        }
    }
}
 
</style>
