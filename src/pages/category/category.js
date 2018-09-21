import Vue from 'vue'
import 'css/common.css'
import './category.css'

import request from 'js/request.js'
import url from 'js/api.js'

Vue.config.productionTip = false

import Footer from 'components/Footer.vue'

new Vue({
    el: '#app',
    components: { 'y-footer': Footer },
    data: {
        topLists: null,
        selectedIndex: 0
    },
    created() {
        request({ url: url.topList }).then(res => {
            this.topLists = res.lists;
        }).catch(err => {})
    },
    methods: {
        onSubList(id, index) {
            request({ url: url.subList, method: "POST", data: { id } }).then(res => {
                console.log(res)
                this.selectedIndex = index;
            }).catch(err => {})
        }
    }
})