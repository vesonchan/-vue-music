import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const songs = (resolve) => {
    import ('components/songs').then((module) => {
        resolve(module)
    })
};
const singers = (resolve) => {
    import ('components/singers').then((module) => {
        resolve(module)
    })
};
const search = (resolve) => {
    import ('components/search').then((module) => {
        resolve(module)
    })
};
const singer = (resolve) => {
    import ('components/singer').then((module) => {
        resolve(module)
    })
};




export default new Router({
    routes: [{
            path: "/",
            redirect: "/songs"
        },
        {
            path: '/songs',
            component: songs
        },
        {
            path: '/singers',
            component: singers,
            children: [{
                path: ':id',
                component: singer
            }]
        },
        {
            path: '/search',
            component: search
        }
    ]
})