<template>
 <div class="search-box">
    <i class="icon-search"></i>
    <input type="text" class="search ellipsis" v-model="search" placeholder="搜索歌曲歌手">
    <i class="icon-dismiss" v-show="search" @click="clear"></i>

 </div>
</template>

<script type="text/ecmascript-6">
 export default {
 data() {
 return {
    search:''
 }

 },
 methods:{
    clear(){
       this.search = ''
    },
    addSearch(query){
        this.search = query;
    }
 },
 watch:{
     search(val){
        this.$emit('query',val)
     }
 },
 components: {

 }
 }
</script>

<style scoped lang="scss">
.search-box{
    width: 100%;
    height: 1rem;
    display: flex;
    background: #333;
    align-items: center;
    .icon-search{
        font-size:.9rem;
    }
    .search{
        flex:1;
        padding-left:.2rem;
        background: rgba(255,255,255, .7);
        line-height: 1rem;
        font-size: 0.6rem;
        color:white;
    }
    .icon-dismiss{
        font-size:.7rem;
        line-height: 1rem;
    }
}
 
</style>
