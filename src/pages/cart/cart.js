import Vue from "vue";

import "./cart_base.css";
import "./cart_trade.css";
import "./cart.css";

import request from "js/request.js";
import url from "js/api.js";

Vue.config.productionTip = false;

import qs from "qs";
import mixin from "js/mixin.js";

new Vue({
  el: "#app",
  data: {
    cartLists: null,
    total: 0,
    totalNum: 0,
    editingShop: null,
    editingShopIndex: -1
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
          });
        });
      }
    },
    allRemoveSelected: {
      get() {
        if (this.editingShop) {
          return this.editingShop.removeChecked;
        }
      },
      set(val) {
        if (this.editingShop) {
          this.editingShop.removeChecked = val;
          this.editingShop.goodsList.forEach(goods => {
            goods.removeChecked = val;
          });
        }
      }
    },
    selectedLists() {
      if (this.cartLists && this.cartLists.length) {
        let arr = [];
        let total = 0;
        let totalNum=0;
        this.cartLists.forEach(shop => {
          shop.goodsList.forEach(goods => {
            if (goods.checked) {
              arr.push(goods);
              total += goods.price * goods.number;
              totalNum += goods.number;
            }
          });
        });
        this.total = total;
        this.totalNum=totalNum;
        return arr;
      }
      return [];
    },
    removeLists() {
      if (this.editingShop) {
        let arr = [];
        this.editingShop.goodsList.forEach(goods => {
          if (goods.removeChecked) {
            arr.push(goods);
          }
        });
        return arr;
      }
      return [];
    }
  },
  created() {
    let { id } = qs.parse(location.search.substr(1));
    request({ url: url.cartList })
      .then(res => {
        let arr = [];
        res.cartList.forEach(shop => {
          shop.checked = true;
          shop.editing = false;
          shop.editingMsg = "编辑";
          shop.removeChecked = false;
          shop.goodsList.forEach(goods => {
            goods.checked = true;
            goods.removeChecked = false;
          });
          arr.push(shop);
        });
        this.cartLists = arr;
      })
      .catch(err => {});
  },
  methods: {
    onClickGoods(goods, shop) {
      let attr = this.editingShop ? "removeChecked" : "checked";
      goods[attr] = !goods[attr];
      shop[attr] = shop.goodsList.every(goods => goods[attr]);
    },
    onClickShop(shop) {
      let attr = this.editingShop ? "removeChecked" : "checked";
      shop[attr] = !shop[attr];
      shop.goodsList.forEach(goods => {
        goods[attr] = shop[attr];
      });
    },
    onSelectedAll() {
      let attr = this.editingShop ? "allRemoveSelected" : "allSelected";
      this[attr] = !this[attr];
    },
    onEdit(shop, shopIndex) {
      shop.editing = !shop.editing;
      shop.editingMsg = shop.editing ? "完成" : "编辑";
      this.cartLists.forEach((item, i) => {
        if (shopIndex !== i) {
          item.editing = false;
          item.editingMsg = shop.editing ? "" : "编辑";
        }
      });
      this.editingShop = shop.editing ? shop : null;
      this.editingShopIndex = shop.editing ? shopIndex : -1;
    },
    onClickNum(num, goods) {
      if (num === -1 && goods.number === 1) {
        return;
      }
      request({
        url: url.addCart,
        method: "POST",
        data: { id: goods.id, number: num }
      })
        .then(res => {
          goods.number += num;
        })
        .catch(err => {});
    },
    onRemove(goods, goodsIndex, shop, shopIndex) {
      if (goods.removeChecked) {
        shop.goodsList.splice(goodsIndex, 1);
      }
      if (!shop.goodsList.length) {
        this.cartLists.splice(shopIndex, 1);
        this.editingShop = null;
        this.editingShopIndex = -1;
        this.cartLists.forEach(shop => {
          shop.editing = false;
          shop.editingMsg = "编辑";
        });
      }
    },
    start(e, goods) {
      goods.startX = e.changedTouches[0].clientX;
    },
    end(e, goods, goodsIndex, shop, shopIndex) {
      if (goods.startX - e.changedTouches[0].clientX > 100) {
        this.onEdit(shop, shopIndex);
      }
    }
  }
});
