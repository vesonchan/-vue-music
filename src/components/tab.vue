<template>
    <div class="tab">
    <router-link tag="div" class="tab-item" to="/songs">
      <span class="tab-link">歌曲列表</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singers">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>   
</template>

<script type="text/ecmascript-6">
 export default {
 data() {
 return {

 }

 },
 components: {

 }
 }
</script>

<style scoped lang="scss">
 @import "../common/scss/mixin.scss";    
  .tab{
    display: flex;
    height:1.1rem;
    line-height: 1.1rem;
    .tab-item{
      flex: 1;
      text-align: center;
      .tab-link{
        padding-bottom: 0.04rem;
      }
      &.router-link-active
        .tab-link{
          color: yellow;
          border-bottom: 0.1rem solid yellow
        }
    }
 }
</style>
