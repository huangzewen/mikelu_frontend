import VueRouter from 'vue-router'
import HomeComponent from './components/home/home'
import SearchComponent from './components/search/search'
import FavComponent from './components/fav/favorate'
import AlbumComponent from './components/album/album'
import PlayComponent from './components/play/play'
import CategoryComponent from './components/category/cate'
import FavList from './components/fav_list/fav_list'

const Router = new VueRouter({
    routes: [{
        component: HomeComponent,
        path: '/'
    }, {
        component: SearchComponent,
        path: '/search/:keyword'
    }, {
        component: FavComponent,
        path: '/fav'
    }, {
        component: AlbumComponent,
        path: '/album/:id'
    }, {
        component: PlayComponent,
        path: '/play/:id'
    }, {
        component: CategoryComponent,
        path: '/cate/:name'
    },{
        component: FavList,
        path: '/favlist/:id'
    }]
})

export default Router