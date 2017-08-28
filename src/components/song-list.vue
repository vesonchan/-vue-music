<template>
 <div class="">
     <ul class="songs-wrap" v-if="da">
        <li class="song" v-for="(song,index) in da" @click="selectSong(song,index)"
         :class="{active:currentIndex===index}" >
            <div class="song-img"><img src="" alt="" v-lazy="song.image" ></div>
            <span class="song-name ellipsis">{{song.name+"--"+song.singer}}</span>
            <div class="icon-clear remove" @click.stop="remove(song,index)" v-show="index<da.length-3"></div>
        </li>
    </ul>  
    
 </div>
</template>

 <script type="text/ecmascript-6">
 import {mapGetters,mapActions} from 'vuex'
 export default {
 data() {
 return {
  
 }

 },
 created(){

 },
 computed:{
   ...mapGetters([
     'currentIndex'
   ])
 },
 props: {
      da: {
        type: Array,
        default: []
      },
      
 },
 methods:{
   selectSong(song,index){
     this.initial({songs:this.da,index:index})
   },
   remove(song,index){
      this.$emit('remove',song,index)
   },
   ...mapActions({
     initial:'initial'
   })
 },
 components: {

 }
 }
</script>

<style scoped lang="scss">
@import "../common/scss/mixin.scss";
.songs-wrap{
        
        .song{
            display: flex;
            align-items: center;
            height: 1.7rem;
            padding: 0 0.5rem;
            &.active{
                background:rgba(255, 255, 0,0.4);
            }
            // @include bd;
            .song-img{
                flex:0 0 1.5rem;
                @include wh(1.5rem,1.5rem);
                border-radius: 30%;
                // @include bd
                img{
                  @include wh(100%,100%);  
                }
            }
            .song-name{
                flex:1;
                text-align: left;
                padding:0 0.3rem;
                // @include bd
            }
            .remove{
                flex:0, 0, .7rem;
                @include wh(.7rem,.7rem);
                font-size: .7rem;
                // background:url("../common/svg/remove.svg");
                // background-size: contain;
                // @include bd
            }
        }
    }
 
</style>
