import Vue from 'vue'
import 'css/common.css'
import './index.css'

import request from 'js/request.js'
import url from 'js/api.js'

Vue.config.productionTip = false

import { InfiniteScroll } from 'mint-ui'
Vue.use(InfiniteScroll);

import Footer from 'components/Footer.vue'
import Swipe from 'components/Swipe.vue'

new Vue({
    el: '#app',
    components: { 'y-footer': Footer, 'y-swipe': Swipe },
    data: {
        hotLists: null,
        bannerLists: null,
        pageNum: 1,
        pageSize: 6,
        loading: false,
        allLoaded: false
    },
    created() {
        request({ url: url.hotList, pageNum: this.pageNum, pageSize: this.pageSize }).then(res => {
            this.hotLists = res.lists;
        });
        request({ url: url.banner }).then(res => {
            this.bannerLists = res.lists;
        }).catch(err => {})
    },
    methods: {
        loadMore() {
            if (this.allLoaded) return;
            this.loading = true; //函数节流
            request({ url: url.hotList, pageNum: this.pageNum, pageSize: this.pageSize }).then(res => {
                if (res.lists.length < this.pageSize) {
                    this.allLoaded = true;
                }
                this.hotLists = this.hotLists.concat(res.lists);
                this.pageNum++;
                this.loading = false;
            })
        }
    }
})