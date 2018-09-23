<template>
    <div id="address">
        <div class="container " style="min-height: 597px;">
            <div class="block-list address-list section section-first js-no-webview-block">
                <a class="block-item js-address-item address-item address-item-default" v-for="list in addressLists" :key="list.id">
                    <div class="address-title">{{list.name}} {{list.tel}}</div>
                    <p>{{list.provinceName}}{{list.cityName}}市{{list.districtName}}{{list.address}}</p>
                    <a class="address-item-after" @click="onToForm">修改</a>
                </a>
            </div>
            <div class="block stick-bottom-row center">
                <router-link to="/address/form" class="btn btn-blue js-no-webview-block js-add-address-btn">
                    新增地址
                </router-link>>
            </div>
        </div>
        <a style="display: block;" href="https://pfmarket.youzan.com/market/home?m_alias=3nu78u467kddj" class="ft-copyright"></a>
    </div>
</template>
<script>
    import request from 'js/request.js'
    import url from 'js/api.js'
    export default {
        name: 'All',
        data() {
            return { addressLists: null }
        },
        created() {
            request({ url: url.getAddress, method: 'GET' }).then(res => {
                console.log(res);
                this.addressLists = res.lists;
            }).catch(err => {})
        },
        methods: {
            onToForm() {
                this.$router.push({ path: '/address/form', redirect: { id: 123 } });
            }
        }
    }
</script>
<style>
    @import './address_base.css';
    @import './address.css';
</style>