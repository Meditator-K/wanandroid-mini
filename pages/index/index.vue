<template>
	<view class="container">

		<swiper class="swiper-box" :interval="2000" :autoplay="true" :indicator-dots="true">
			<swiper-item v-for="(item, index) in banners" :key="index">
				<view class="swiper-item" @click="clickBanner(item)">
					<image :src="item.imagePath" mode="scaleToFill"></image>
				</view>
			</swiper-item>
		</swiper>

		<uni-list>
			<uni-list-item v-for="(item, index) in articles" :key="index" clickable="true" @click="clickArticle(item)">
				<template v-slot:body>
					<view style="width: 100%;">
						<view class="custom-body">
							<text>{{item.title}}</text>
							<uni-icons type="star-filled" color="#999" size="18"></uni-icons>
						</view>
						<view class="custom-body">
							<text class="footer-text">{{item.shareUser}}</text>
							<text class="footer-text">{{item.niceShareDate}}</text>
						</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>


	</view>
</template>

<script>
	import {
		get
	} from '@/utils/http.js'
	export default {
		data() {
			return {
				banners: [],
				articles: []
			}
		},
		created() {
			this.getHomeData(),
				this.getArticleData()
		},
		methods: {
			getHomeData() {
				get('/banner/json').then(res => {
					this.banners = res.data
				}).catch(error => {
					uni.showToast({
						title: error,
						duration: 2000
					})
				})
			},
			clickBanner(item) {
				console.log('banner:', item)
				uni.navigateTo({
					url: '/pages/webview?title=' + encodeURIComponent(item.title) + '&url=' + encodeURIComponent(
						item.url)
				})
			},
			getArticleData() {
				get('/article/list/0/json').then(res => {
					this.articles = res.data.datas
				}).catch(error => {
					uni.showToast({
						title: error,
						duration: 2000
					})
				})
			},
			clickArticle(item) {
				console.log('article:', item)
				uni.navigateTo({
					url: '/pages/webview?title=' + encodeURIComponent(item.title) + '&url=' + encodeURIComponent(
						item.link)
				})
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

	.custom-body {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.footer-text {
		font-size: 12px;
		color: #999;
	}
</style>