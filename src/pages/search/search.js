import Vue from 'vue'
import 'css/common.css'
import './search.css'

import mixin from 'js/mixin.js'

import qs from 'qs'

import request from 'js/request.js'
import url from 'js/api.js'

Vue.config.productionTip = false

import Footer from 'components/Footer.vue'

new Vue({
    el: '#app',
    data: {
        searchLists: null,
        backToTop: false
    },
    mixins: [mixin],
    created() {
        if (location.search) {
            let { keyword, id } = qs.parse(location.search.substr(1));
            keyword = decodeURIComponent(decodeURIComponent(keyword));
            id = parseInt(id);
            request({ url: url.search, method: 'POST', data: { keyword, id } })
                .then(res => {
                    this.searchLists = res.lists;
                }).catch(err => {})
        }
    },
    methods: {
        onTouchmove() {
            console.log(document.documentElement.scrollTop)
            if (document.documentElement.scrollTop > 100) {
                this.backToTop = true;
            } else { this.backToTop = false; }
        },
        goToTop() {

        }
    }
})