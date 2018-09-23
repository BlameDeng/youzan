<template>
    <div id="address">
        <div class="container " style="min-height: 597px;">
            <div class="block-list address-list section section-first js-no-webview-block">
                <a class="block-item js-address-item address-item" v-for="list in addressLists" :key="list.id" v-if="addressLists" :class="{['address-item-default']:list.isDefault}">
                    <div class="address-title">{{list.name}} {{list.tel}}</div>
                    <p>{{list.provinceName}}{{list.cityName}}市{{list.districtName}}{{list.address}}</p>
                    <a class="address-item-after" @click="onToForm(list)">修改</a>
                </a>
            </div>
            <div v-if="addressLists&&!addressLists.length">
                没有地址，请添加
            </div>
            <div class="block stick-bottom-row center">
                <router-link :to="{name:'form',query:{type:'add'}}" class="btn btn-blue js-no-webview-block js-add-address-btn">
                    新增地址
                </router-link>>
            </div>
        </div>
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
                this.addressLists = res.lists;
            }).catch(err => {})
        },
        methods: {
            onToForm(list) {
                this.$router.push({ path: '/address/form', query: { type: 'edit', instance: list } });
            }
        }
    }
</script>
<style>
    @import './address_base.css';
    @import './address.css';
</style>