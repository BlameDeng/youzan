<template>
    <div id="myform" style="cursor:pointer;">
        <div class="container " style="min-height: 597px;">
            <div class="section section-first">
                <div class="block form js-form">
                    <input class="js-id" name="id" type="hidden" value="69150287">
                    <div class="block-item" style="border-top:0;">
                        <label>收货人</label>
                        <input type="text" placeholder="请输入姓名" name="user_name" v-model.trim="name" maxlength="20">
                    </div>
                    <div class="block-item">
                        <label>联系电话</label>
                        <input type="tel" placeholder="联系电话" name="tel" v-model.trim="tel" maxlength="11">
                    </div>
                    <div class="block-item">
                        <label>选择地区</label>
                        <div class="select-group">
                            <select class="js-province-selector" v-model.trim="provinceValue">
                                <option value="-1">选择省份</option>
                                <option :value="p.value" v-for="p in addressData.list" :key="p.value">{{p.label}}</option>
                            </select>
                            <select class="js-city-selector" v-model.trim="cityValue">
                                <option value="-1">选择城市</option>
                                <option :value="c.value" v-for="c in cityList" :key="c.value">{{c.label}}</option>
                            </select>
                            <select class="js-county-selector" name="area_code" data-code="440402" v-model.trim="districtValue">
                                <option value="-1">选择地区</option>
                                <option :value="d.value" v-for="d in districtList" :key="d.value">{{d.label}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="block-item">
                        <label>详细地址</label>
                        <input type="text" placeholder="街道门牌信息" name="address_detail" v-model.trim="address" maxlength="100">
                    </div>
                </div>
            </div>
            <div class="block section js-save block-control-btn">
                <div class="block-item c-blue center">保存</div>
            </div>
            <div class="block section js-delete block-control-btn" v-show="type==='edit'">
                <div class="block-item c-red center">删除</div>
            </div>
            <div class="block stick-bottom-row center js-save-default" v-show="type==='edit'">
                <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                type: '',
                name: '',
                tel: '',
                provinceValue: -1,
                cityValue: -1,
                districtValue: -1,
                address: '',
                id: '',
                instance: null,
                addressData: require('js/address.json'),
                cityList: null,
                districtList: null
            }
        },
        created() {
            this.type = this.$route.query.type;
            let instance = this.$route.query.instance;
            if (instance) {
                console.log(instance)
                this.instance = instance;
                this.name = instance.name;
                this.tel = instance.tel;
                this.provinceValue = +instance.provinceValue;
                this.cityValue = +instance.cityValue;
                this.districtValue = +instance.districtValue;
                this.address = instance.address;
            }
        },
        watch: {
            provinceValue(val) {
                if (val === -1) { return }
                let list = this.addressData.list;
                let index = list.findIndex(item => {
                    return item.value === val;
                });
                this.cityList = list[index].children;
                this.cityValue = -1;
                this.districtValue = -1;
                if (this.type === "edit") {
                    this.cityValue = +this.instance.cityValue;
                }
            },
            cityValue(val) {
                if (val === -1) { return }
                if (this.cityList) {
                    let list = this.cityList;
                    let index = list.findIndex(item => {
                        return item.value === val;
                    });
                    this.districtList = list[index].children;
                    this.districtValue = -1;
                    if (this.type === "edit") {
                        this.districtValue = +this.instance.districtValue;
                    }
                }
            }
        }
    }
</script>
<style>
    @import './address_base.css';
    @import './address.css';
</style>