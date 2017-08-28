<template>
  <div class="singers-list">
      <ul class="singers">
          <li class="singer" @click="selectSinger(singer)" v-for="singer in data">
              <img src="" alt="" class="avatar" v-lazy="singer.avatar">
              <span class="singer-name">{{singer.name}}</span>
          </li>
      </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    created(){
       
    },
    mounted(){
        
    },
    methods:{
        selectSinger(singer){
            
            this.$emit('select',singer)
        }
    },
    computed: {
     
    }
  }
</script>

<style scoped lang="scss" >
 @import "../common/scss/mixin.scss";
 .singers-list{
     width: 100%;
     .singers{
         padding:0 0.8rem;
         .singer{
            display: flex;
            align-items: center;
            margin-top:0.2rem;
            // @include bd;
            .avatar{
             @include wh(1.5rem,1.5rem);
             border-radius: 50%;
            //  @include bd;
            }
            .singer-name{
                margin-left:1rem;
                color:white;
            }
         }
     }
 }
</style>
