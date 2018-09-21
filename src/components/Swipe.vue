<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swp-page swiper-slide" v-for="bannerList in bannerLists">
                <a class="js-no-follow" :href="bannerList.clickUrl">
                    <img class="goods-main-photo fadeIn" :src="bannerList.img">
                </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.css'
    export default {
        name: 'Swipe',
        props: {
            bannerLists: {
                type: Array,
                required: true
            }
        },
        created() {
        },
        mounted() {
            var mySwiper = new Swiper('.swiper-container', {
                // Optional parameters
                loop: true,
                autoplay: true,
                // If we need pagination
                pagination: {
                    el: '.swiper-pagination',
                },
                // And if we need scrollbar
                scrollbar: {
                    el: '.swiper-scrollbar',
                },
            })
        },
    }
</script>

<style>
    .swiper-slide img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
    }
</style>