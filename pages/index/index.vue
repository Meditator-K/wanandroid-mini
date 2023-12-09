<template>
	<view class="container">

		<swiper class="swiper-box" :interval="2000" :autoplay="true" :indicator-dots="true">
			<swiper-item v-for="(item, index) in banner" :key="index">
				<view class="swiper-item">
					<image :src="item.imagePath" mode="scaleToFill"></image>
				</view>
			</swiper-item>
		</swiper>



	</view>
</template>

<script>
	import {
		get
	} from '@/utils/http.js'
	export default {
		data() {
			return {
				banner: []
			}
		},
		created() {
			this.getHomeData()
		},
		methods: {
			getHomeData() {
				get('/banner/json').then(res => {
					this.banner = res.data
				}).catch(error => {
					uni.showToast({
						title: error,
						duration: 2000
					})
				})
			},
			clickItem(e) {
				this.swiperDotIndex = e
			},

		}
	}
</script>

<style lang="scss">
	.container {
		font-size: 14px;
		line-height: 24px;
	}

	.swiper-box {
		width: 100%;
		height: 180px;

		image {
			width: 100%;
			height: 100%
		}

	}

	.swiper-item {
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
</style>