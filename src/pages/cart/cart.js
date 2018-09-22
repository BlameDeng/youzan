import Vue from 'vue'

import "./cart_base.css"
import "./cart_trade.css"
import "./cart.css"

import request from 'js/request.js'
import url from 'js/api.js'

Vue.config.productionTip = false

import qs from 'qs'
import mixin from 'js/mixin.js'

new Vue({
    el: '#app',
    data: {
        cartLists: null,
        total: 0
    },
    mixins: [mixin],
    computed: {
        allSelected: {
            get() {
                if (this.cartLists && this.cartLists.length) {
                    return this.cartLists.every(shop => shop.checked);
                }
                return true;
            },
            set(val) {
                this.cartLists.forEach(shop => {
                    shop.checked = val;
                    shop.goodsList.forEach(goods => {
                        goods.checked = val;
                    })
                })
            }
        },
        selectedLists() {
            if (this.cartLists && this.cartLists.length) {
                let arr = [];
                let total = 0;
                this.cartLists.forEach(shop => {
                    shop.goodsList.forEach(goods => {
                        if (goods.checked) {
                            arr.push(goods);
                            total += goods.price*goods.number;
                        }
                    })
                });
                this.total = total;
                return arr;
            }
            return [];
        }
    },
    created() {
        let { id } = qs.parse(location.search.substr(1));
        request({ url: url.cartList }).then(res => {
            let arr = [];
            res.cartList.forEach(item => {
                item.checked = true;
                item.goodsList.forEach(goods => {
                    goods.checked = true;
                });
                arr.push(item);

            });
            this.cartLists = arr;
            console.log(this.cartLists);
        }).catch(err => {})
    },
    methods: {
        onClickGoods(goods, shop) {
            goods.checked = !goods.checked;
            shop.checked = shop.goodsList.every(goods => goods.checked)
        },
        onClickShop(shop) {
            shop.checked = !shop.checked;
            shop.goodsList.forEach(goods => {
                goods.checked = shop.checked;
            })
        },
        onSelectedAll() {
            this.allSelected = !this.allSelected;
        }
    }
})