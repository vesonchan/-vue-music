<template>
  <div class="singer" ref="singer">
    <singers-list :data="singers" @select="selectSinger"></singers-list>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import singersList from "components/singers-list";
  import Singer from "common/js/singer"
  import {mapMutations} from "vuex"
  
  export default {
    
    data() {
      return {
        like: [{ mid: "001Ic36m4AhaBw", name: "Avril Lavigne" }, { mid: "001F1svH2tTpsC", name: "Bruno Mars" }, 
       {mid: "000qrPik2w6lDr",name: "Taylor Swift"},{ mid: "002a1DuK4evNsR", name: "Owl City" },  
       { mid: "004ItgA32BhfdC", name: "Sia" }, { mid: "003Nz2So3XXYek", name: "陈奕迅" }, {mid: "004PTEQR3C16SV",name: "Katy Perry"},
        { mid: "0040HbAd0HG7N5", name: "打雷姐" }, { mid: "000Q4W691sMvLG", name: "苏打绿" }, 
        { mid: "0046fVNz3ruk2r", name: "Selena Gomez" }, {mid: "000sMqR84VZlDN", name: "Leona lewis"}, 
        { mid: "004cRD1k2n1Agg", name: "Christina Perri" },{ mid: "001HH3WP0nbf4N", name: "Pink"},
        ],
        singers:[],
        singer:{}
      }
    },
    computed:{
      
    },
    created(){
      this.getSingers(this.like);
      
    },
    mounted(){
     
    },
    methods: {
      // 获得歌手们
      getSingers(singers){
        singers.forEach(singer=>{
          this.singers.push(new Singer({id:singer.mid,name:singer.name}))
        });
      },
      // 选择歌手
      selectSinger(singer){
        this.$router.push({
                path:`/singers/${singer.id}` 
            }),
        this.setSinger(singer)
      },
      // vuex的mutation语法糖
      ...mapMutations({
        setSinger:"setSinger"
      })
    },
      
    components: {
      singersList
    }
   }
  
</script>

<style scoped lang="scss" >
  .singer{
    position: fixed;
    top:1.8rem;
    bottom: 2.4rem;
    width: 100%;
    background: #333;
    overflow: scroll;
    }
</style>
