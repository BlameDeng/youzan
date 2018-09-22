import Vue from 'vue'

import "./cart_base.css"
import "./cart_trade.css"
import "./cart.css"

import request from 'js/request.js'
import url from 'js/api.js'

Vue.config.productionTip = false

import qs from 'qs'

new Vue({
    el: '#app',
    data: { cartLists: null },
    created() {
        let { id } = qs.parse(location.search.substr(1));
        request({ url: url.cartList }).then(res => {
            this.cartLists = res.cartList;
            console.log(res.cartList);
        }).catch(err => {})
    },
    methods:{
        onClickCheck(goods){
            
        }
    }
})