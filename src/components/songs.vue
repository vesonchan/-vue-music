<template>
    <div class="songs" @click.stop>
        <!-- <ul class="songs-wrap" v-show="officialPlayList.length">
            <li class="song" v-for="(song,index) in officialPlayList" @click="selectSong(song,index)"
             :class="{active:currentIndex===index}" >
                <div class="song-img"><img src="" alt="" v-lazy="song.image" ></div>
                <span class="song-name ellipsis">{{song.name+"--"+song.singer}}</span>
                <div class="icon-clear remove" @click="remove(song,index)"></div>
            </li>
        </ul>   -->
        <song-list :da="temporarySongs" @remove="removeSong"></song-list>
    </div>
</template>

 <script type="text/ecmascript-6">
import { mapGetters } from "vuex"
import { mapActions, mapMutations } from "vuex"
import { createSong } from 'common/js/song'
import songList from 'components/song-list'
import {loadPlay,deletePlay} from 'common/js/cache'
export default {
    data() {
        return {
            songs:[],
            load:[],
            musicData: [
                {
                    songmid: "003PirDu34iWHk",
                    songname: "Kissin U",
                    interval: 199,
                    albummid: "001JrSUB2lIHJQ",
                    songid: 672834,
                    singer: [{ name: "Miranda Cosgrove" }],
                },
                {
                  "songmid": "001LhLgf3kpOD1",
                  "songname":"Disgusting",
                  "interval":219,
                   "albummid":"001JrSUB2lIHJQ",
                   songid:672836,
                  "singer":[{name: "Miranda Cosgrove"}],
                },
                {
                  "songmid": "003ULjcY1UECQn",
                  "songname":"You're Not Alone",
                  "interval":235,
                   "albummid":"002ke9Cq3KeWYj",
                   songid:8121365,
                   singer:[{name:"Owl City "},{name:"Britt Nicole"}]
                },  
                
            ]

        }

    },
    created(){
        // this.initial()
            
        
        
    },
    
    computed: {
        ...mapGetters([
            'officialPlayList',
            'currentIndex'
        ]),
        temporarySongs() {
            this.songs = this.officialPlayList.concat(this.normalizeSongs(this.musicData))
            return this.officialPlayList.concat(this.normalizeSongs(this.musicData))
        },
    },
    watch: {
        songs(val) {
            this.setRealPlayList(val)
        }
        
    },

    methods: {
        // selectSong(song,index){
        //     this.setMyplayList({song:song,index:index})

        // },
        normalizeSongs(list) {
            let ret = []
            list.forEach((item) => {


                ret.push(createSong(item))

            })
            return ret
        },
        // getSongs(){
        //     this.songs = this.normalizeSongs(this.musicData).concat(this.officialPlayList);
        //     console.log(this.songs)
        //     // this.setOfficialPlayList({song:this.songs})
        //     // this.setRealPlayList(this.songs)
        //     // this.setOfficialPlayList({song:this.songs,index:1})
        // },
        // select() {
        //     this.setOfficialPlayList({ song: this.songs })
        // },
        removeSong(song,index){
            deletePlay(song)
            this.deleteOfficialPlayList(index)
        },
        initial(){
            this.load = loadPlay();
            this.setOfficialPlayList({song:this.load})
        },
        ...mapMutations({
            // setOfficialPlayList:'setOfficialPlayList',
            deleteOfficialPlayList:'deleteOfficialPlayList',
            setRealPlayList: 'setRealPlayList'
        }),
        ...mapActions({
            setOfficialPlayList: "setOfficialPlayList",
            // setMyplayList:'setMyplayList'
        })
    },

    components: {
        songList
    }
}
</script>

<style scoped lang="scss">
@import "../common/scss/mixin.scss";
.songs {
    position: fixed;
    top: 1.8rem;
    bottom: 3rem;
    left: 0;
    right: 0;
    background: #333;
    overflow: scroll; // width: 100%;
    // height: 100%;
    .songs-wrap {

        .song {
            display: flex;
            align-items: center;
            height: 1.4rem;
            padding: 0 0.5rem;
            &.active {
                background: rgba(255, 255, 0, 0.4);
            } // @include bd;
            .song-img {
                flex: 0 0 1rem;
                @include wh(1rem, 1rem);
                border-radius: 30%; // @include bd
                img {
                    @include wh(100%, 100%);
                }
            }
            .song-name {
                flex: 1;
                text-align: left;
                padding: 0 0.3rem; // @include bd
            }
            .remove {
                flex: 0, 0, .7rem;
                @include wh(.7rem, .7rem);
                font-size: .7rem; // background:url("../common/svg/remove.svg");
                // background-size: contain;
                // @include bd
            }
        }
    }
}
</style>
