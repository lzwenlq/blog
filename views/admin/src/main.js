/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueClipboards from 'vue-clipboards';
import Promise from 'bluebird';
import elementUI from 'element-ui';

import VueFilter from './services/filter';
import routes from './routes';
import App from './components/App.vue';
import Loading from './components/loading/';
import Toolbar from './components/toolbar/';

// Install plugins
Vue.use(VueRouter);
Vue.use(VueFilter);
Vue.use(elementUI);
Vue.use(VueClipboards);

Vue.component(Loading.name, Loading);
Vue.component(Toolbar.name, Toolbar);

window.Promise = Promise;

// Set up a new router
const router = new VueRouter({
    routes,
    mode: 'hash', // history
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }

        return {
            x: 0,
            y: 0
        };
    }
});

export default new Vue({
    el: '#app',
    router,
    ...App
});
