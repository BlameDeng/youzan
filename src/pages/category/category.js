import Vue from 'vue'
import 'css/common.css'
import './category.css'

import request from 'js/request.js'
import url from 'js/api.js'

Vue.config.productionTip = false

import Footer from 'components/Footer.vue'

import mixin from 'js/mixin.js'

new Vue({
    el: '#app',
    components: { 'y-footer': Footer },
    data: {
        topLists: null,
        selectedIndex: 0,
        brandLists: null,
        categoryLists: null,
        hotGoods: null,
        hotKeywords: null,
        hotShops: null
    },
    mixins:[mixin],
    created() {
        request({ url: url.topList }).then(res => {
            this.topLists = res.lists;
        }).catch(err => {});
        this.onSubList(0);
    },
    methods: {
        onSubList(index, id) {
            if (index === 0) {
                request({ url: url.rank, method: "POST" }).then(res => {
                    this.selectedIndex = index;
                    this.hotGoods = res.data.hotGoods;
                    this.hotKeywords = res.data.hotKeywords;
                    this.hotShops = res.data.hotShops;
                }).catch(err => {})
            } else {
                request({ url: url.subList, method: "POST", data: { id } }).then(res => {
                    this.selectedIndex = index;
                    this.brandLists = res.data.brandList;
                    this.categoryLists = res.data.categoryList;
                }).catch(err => {})
            }
        },
        onToSearch(list) {
            let name = encodeURIComponent(encodeURIComponent(list.name));
            location.href = `search.html?keyword=${name}&id=${list.id}`;
        }
    }
})