<template>
 <div class="search">
    <div class="search-box-wrap">
        <searchBox @query="query" ref="searchBox" @click="">

        </searchBox>
    </div>
    <div class="history" v-show="!search">
        <span class="history-text">搜索历史</span><span class="icon-clear clear" @click.stop="clear"></span>
    </div>
    <transition-group name="fade"  tag="ul" @click.stop>
      <div  :key="history" class="history-content" v-show="histories.length&&!search" v-for="(history,index) in histories" @click.stop="addSearch(history)">
          <span class="history-name">{{history}}</span><span class="delete icon-delete" @click.stop="deletehistory(history,index)"></span>
      </div>
    </transition-group>
    <div class="search-content" v-for="item in result" @click.stop="selectItem(item)">
        <div :class="getIcon(item)" class="icon"></div>
        <div class="content ellipsis" v-html="getDisplayName(item)"></div>
        <!-- <div class="delete icon-delete"></div> -->
    </div>
 </div>
</template>

 <script type="text/ecmascript-6">
 import searchBox from "base/search-box";
 import {ERR_OK} from "api/config"
 import {go} from "api/search"
 import Singer from "common/js/singer"
 import{createSong} from "common/js/song"
 import {mapMutations} from "vuex"
 import {mapActions,mapGetters} from "vuex"
 import {saveSearch,loadSearch,clearSearch,deleteSearch,savePlay} from "common/js/cache"

 export default {
 data() {
 return {
    search:'',
    result:[],
    
    
    
 }

 },
 created(){
//   this.gethistory()
  // loadSearch()
//   console.log(this.searches)
 },
 computed:{
   ...mapGetters(['histories'])
 },
 methods:{
    query(val){
        this.search = val;
        go(this.search,1).then((res)=>{
            if(res.code ===ERR_OK){
                this.result = this.getResult(res.data)
            }
        })
    },
    // 查询结果
    getResult(data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: "singer"}})
        }
        if (data.song) {
          ret = ret.concat(this.normalizeSongs(data.song.list))
        }
        return ret
      },
      normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
    //   选择得到的搜索项目并保存缓存
      selectItem(item) {
        if (item.type === "singer") {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
          this.$router.push({
            path: `/singers/${singer.id}`
          })
          this.setSinger(singer);
          // saveSearch(this.search)
        }else{  
        //   this.insertSong(item)
            this.setOfficialPlayList({song:savePlay(item)})
            // savePlay(item)
            this.$router.push({
            path:'/songs'
          })
            // saveSearch(this.search)
        }
        saveSearch(this.search)
        // savePlay(item)
        // this.setHistory(this.search)
        // this.$emit('select', item)
      },
    //   歌手或者歌曲图片
      getIcon(item) {
        if (item.type === "singer") {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
    //   得到歌手或者歌曲的结果
      getDisplayName(item) {
        if (item.type === "singer") {
          return item.singername
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      // 把搜索历史记录输入输入框中
      addSearch(history){
        this.$refs.searchBox.addSearch(history)
      },
      
   clear(){
     this.setHistories(clearSearch())
   },
   deletehistory(query){
      this.setHistories(deleteSearch(query))
   },
    
      ...mapMutations({
          setSinger:"setSinger",
          setHistories:'setHistories'
      }),
      ...mapActions({
          setOfficialPlayList:"setOfficialPlayList"
      }),
      

 },
 watch:{
   
 },
 components: {
    searchBox
 }
 }
</script>

<style scoped lang="scss">
.search{
   background: #333;
   position: fixed;
   top: 1.8rem;
   width: 100%;
   bottom: 2.4rem;
   overflow: scroll;
    .search-box-wrap{
        margin:0 .5rem;
    }
    .history{
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 1rem;
        padding: 0 .5rem;
        .history-text{
            flex:1;
            text-align: left;
        }
        .clear{
            flex:0 0 .7rem
        }
    }
    .history-content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 1rem;
        padding: 0 .5rem;
        &.fade-enter-active, &.fade-leave-active{
        transition: all 0.1s
        }
        &.fade-enter, &.fade-leave-to{
        height: 0
        }
        .history-name{
          flex:1;
            text-align: left;
        }
    }
    .search-content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 1rem;
        padding: 0 .5rem;
        padding-top: .3rem;
        // border-top:0.02rem solid white;
        .icon{
            flex:0 0 0.7rem;
        }
        .content{
            flex:1;
            text-align: left;
            font-size:.5rem;
        }
        .delete{
            flex:0 0 .7rem
        }
    }
}
 
</style>
