<template>
  <div id="app">
    <VHeader></VHeader>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <play-list></play-list>
  </div>
</template>

<script>
import VHeader from "components/VHeader"
import tab from "components/tab"
import playList from "components/play-list"
export default {
  components:{
    VHeader,
    tab,
    playList
  }
}
</script> 

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background: #222222;
  font-size:50%;
}
</style>
