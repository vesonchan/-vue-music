import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200

// function insertArray(arr, val, compare, maxLen) {
//   const index = arr.findIndex(compare)
//   if (index === 0) {
//     return
//   }
//   if (index > 0) {
//     arr.splice(index, 1)
//   }
//   arr.unshift(val)
//   if (maxLen && arr.length > maxLen) {
//     arr.pop()
//   }
// }

function deleteFromArray(arr, compare) {
    const index = arr.findIndex(compare)
    if (index > -1) {
        arr.splice(index, 1)
    }
}
// 储存搜索关键词缓存
export function saveSearch(query) {
    let searches = storage.get(SEARCH_KEY, [])
    insertArray(searches, query, (item) => {
        return item === query
    }, 15)
    storage.set(SEARCH_KEY, searches)
    return searches
}
// 删除单个搜索缓存
export function deleteSearch(query) {
    let searches = storage.get(SEARCH_KEY, [])
    deleteFromArray(searches, (item) => {
        return item === query
    })
    storage.set(SEARCH_KEY, searches)
    return searches
}
// 删除所有的搜索缓存
export function clearSearch() {
    storage.remove(SEARCH_KEY)
    return []
}
// 加载搜索缓存
export function loadSearch() {
    return storage.get(SEARCH_KEY, [])
}
// 储存歌曲搜索缓存
export function savePlay(song) {
    let songs = storage.get(PLAY_KEY, [])
    insertArray(songs, song, (item) => {
        return song.id === item.id
    }, PLAY_MAX_LEN)
    storage.set(PLAY_KEY, songs)
    return song
}
// 加载歌曲缓存
export function loadPlay() {
    return storage.get(PLAY_KEY, [])
}
// 删除歌曲缓存
export function deletePlay(song) {
    let musicData = storage.get(PLAY_KEY, [])
    deleteFromArray(musicData, (item) => {
        return item.id === song.id
    })
    storage.set(PLAY_KEY, musicData)
    return musicData
}
export function saveFavorite(song) {
    let songs = storage.get(FAVORITE_KEY, [])
    insertArray(songs, song, (item) => {
        return song.id === item.id
    }, FAVORITE_MAX_LEN)
    storage.set(FAVORITE_KEY, songs)
    return songs
}

export function deleteFavorite(song) {
    let songs = storage.get(FAVORITE_KEY, [])
    deleteFromArray(songs, (item) => {
        return item.id === song.id
    })
    storage.set(FAVORITE_KEY, songs)
    return songs
}

export function loadFavorite() {
    return storage.get(FAVORITE_KEY, [])
}

function insertArray(arr, val, maxlen) {
    const index = arr.findIndex(item => {
        return item === val
    })
    if (index >= 0) {
        arr.splice(index, 1)
    }
    arr.unshift(val)
    if (arr.length > maxlen) {
        arr.pop()
    }
}