import Vue from 'vue'

import "./goods_common.css"
import "./goods_custom.css"
import "./goods.css"
import "./goods_theme.css"
import "./goods_mars.css"
import "./goods_sku.css"
import "./goods_transition.css"

import mixin from 'js/mixin.js'

import Swipe from 'components/Swipe.vue'

import qs from 'qs'

import request from 'js/request.js'
import url from 'js/api.js'

Vue.config.productionTip = false

import Footer from 'components/Footer.vue'

new Vue({
    el: '#app',
    components: { 'y-swipe': Swipe },
    data: {
        id: '',
        details: null,
        detailTab: ['商品详情', '本店成交'],
        selectedIndex: 0,
        dealLists: null,
        bannerLists: null,
        skuType: 1,
        showSku: false,
        skuNum: 1,
        isAddCart: false,
        showAddInfo: false
    },
    mixins: [mixin],
    created() {
        let { id } = qs.parse(location.search.substr(1));
        this.id = id;
        request({ url: url.details, method: 'POST', data: { id } }).then(res => {
            this.details = res.data;
            this.bannerLists = [];
            res.data.imgs.forEach(item => {
                this.bannerLists.push({
                    clickUrl: '',
                    img: item
                })
            });
        }).catch(err => {})
    },
    methods: {
        onClickTab(index) {
            this.selectedIndex = index;
            if (index) {
                request({ url: url.deal, method: 'POST', data: { id: this.id } }).then(res => {
                    this.dealLists = res.data.lists;
                }).catch(err => {})
            }
        },
        onClickSku(type) {
            this.skuType = type;
            this.showSku = true;
        },
        changeSkuNum(num) {
            if (this.skuNum === 1 && num === -1) {
                return
            }
            this.skuNum += num;
        },
        addCart() {
            request({ url: url.addCart, method: 'POST', data: { id: this.id, number: this.skuNum } }).then(res => {
                if (res.status === 200) {
                    this.showSku = false;
                    this.isAddCart = true;
                    this.showAddInfo = true;
                    setTimeout(() => {
                        this.showAddInfo = false
                    }, 3000);
                }
            }).catch(err => {})
        }
    },
    watch: {
        showSku(val) {
            document.body.style.overflow = val ? "hidden" : "auto";
            document.querySelector('html').style.overflow = val ? "hidden" : "auto";
            document.body.style.height = val ? "100%" : "auto";
            document.querySelector('html').style.height = val ? "100%" : "auto";

        }
    }
})