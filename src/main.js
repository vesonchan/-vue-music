// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

import "./common/scss/common.scss"
import "./common/scss/icon.css"
import VueLazyload from 'vue-lazyload'
// import store from './store'
import Vuex from "vuex"
import storage from 'good-storage'
import { loadSearch, loadPlay, savePlay } from 'common/js/cache'
// import createSong from "common/js/song"
Vue.config.productionTip = false;
// 移动端rem
(function(win) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if (width > 540) { // 最大宽度
            width = 540;
        }
        var rem = width / 6.4;
        docEl.style.fontSize = rem + 'px';
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    refreshRem();

})(window)
// 初始化数据
// const musicDatas = [{
//         "songmid": "003PirDu34iWHk",
//         "songname": "Kissin U",
//         "interval": 199,
//         "albummid": "001JrSUB2lIHJQ",
//         "songid": 672834,
//         "singer": [{ name: "Miranda Cosgrove" }],
//     },
//     {
//         "songmid": "001LhLgf3kpOD1",
//         "songname": "Disgusting",
//         "interval": 219,
//         "albummid": "001JrSUB2lIHJQ",
//         "songid": 672836,
//         "singer": [{ name: "Miranda Cosgrove" }],
//     },
//     {
//         "songmid": "003PirDu34iWHk",
//         "songname": "Kissin U",
//         "interval": 199,
//         "albummid": "001JrSUB2lIHJQ",
//         "songid": 672836,
//         "singer": [{ name: "Miranda Cosgrove" }],
//     },
//     {
//         "songmid": "003PirDu34iWHk",
//         "songname": "Kissin U",
//         "interval": 199,
//         "albummid": "001JrSUB2lIHJQ",
//         "songid": 672836,
//         "singer": [{ name: "Miranda Cosgrove" }],
//     },
//     {
//         "songmid": "003PirDu34iWHk",
//         "songname": "Kissin U",
//         "interval": 199,
//         "albummid": "001JrSUB2lIHJQ",
//         "songid": 672836,
//         "singer": [{ name: "Miranda Cosgrove" }],
//     },
//     {
//         "songmid": "003PirDu34iWHk",
//         "songname": "Kissin U",
//         "interval": 199,
//         "albummid": "001JrSUB2lIHJQ",
//         "songid": 672836,
//         "singer": [{ name: "Miranda Cosgrove" }],
//     },
//     {
//         "songmid": "003PirDu34iWHk",
//         "songname": "Kissin U",
//         "interval": 199,
//         "albummid": "001JrSUB2lIHJQ",
//         "songid": 672836,
//         "singer": [{ name: "Miranda Cosgrove" }],
//     },
//     {
//         "songmid": "003PirDu34iWHk",
//         "songname": "Kissin U",
//         "interval": 199,
//         "albummid": "001JrSUB2lIHJQ",
//         "songid": 672836,
//         "singer": [{ name: "Miranda Cosgrove" }],
//     },
// ];

// function normalizeSongs(list) {
//     let ret = []
//     list.forEach((item) => {
//         let { musicData } = item

//         ret.push(createSong(musicData))

//     })
//     return ret
// };

// 用vue-lazyload
Vue.use(VueLazyload);

// 用vuex
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        singer: {},
        playState: false,
        currentIndex: -1,
        playList: [],
        officialPlayList: loadPlay(),
        realPlayList: [],
        histories: loadSearch()

    },
    mutations: {
        setSinger(state, singer) {
            state.singer = singer
        },
        setPlayState(state, flag) {
            state.playState = flag
        },
        setCurrentIndex(state, index) {
            state.currentIndex = index
        },
        setPlayList(state, list) {
            state.playList = list
        },
        // 增加歌在前面
        setOfficialPlayList(state, list) {
            state.officialPlayList.unshift(list)
        },
        setRealPlayList(state, list) {
            state.realPlayList = list
        },
        setHistories(state, list) {
            state.histories = list
        },
        // 删除songs列表的歌
        deleteOfficialPlayList(state, index) {
            state.officialPlayList.splice(index, 1)
        }
    },
    actions: {
        // 设置歌手的歌曲列表
        setPlayList({ commit, state }, { songs, index }) {
            commit("setPlayList", songs);
            commit("setRealPlayList", state.playList)
            commit("setCurrentIndex", index);
            commit("setPlayState", true)
        },
        // 设置搜索后的歌曲增加到默认列表
        setOfficialPlayList({ commit, state }, { song, index }) {

            commit("setOfficialPlayList", song);
            // commit('setRealPlayList', state.officialPlayList);
            commit("setCurrentIndex", 0)
                // commit("setPlayState", true)
        },
        // 设置默认首页的歌曲列表
        setMyplayList({ commit, state }, { song, index }) {
            commit('setRealPlayList', state.officialPlayList);
            commit("setCurrentIndex", index)
            commit("setPlayState", true)
        },
        initial({ commit, state }, { songs, song, index }) {
            commit('setRealPlayList', songs);
            commit("setCurrentIndex", index);
            commit("setPlayState", true);
        }
    },
    getters: {
        singer: state => {
            return state.singer
        },
        playState: state => {
            return state.playState
        },
        currentIndex: state => {
            return state.currentIndex
        },
        playList: state => {
            return state.playList
        },
        currentSong: state => {
            return state.realPlayList[state.currentIndex] || {}
        },
        officialPlayList: state => {
            return state.officialPlayList
        },
        realPlayList: state => {
            return state.realPlayList
        },
        histories: state => {
            return state.histories
        }
    }

});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    store,
    components: { App }

})