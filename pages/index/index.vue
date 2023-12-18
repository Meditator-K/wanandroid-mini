<template>
	<view class="container">
		<view class="search" @click="onSearch">
			<text class="footer-text">请输入搜索内容</text>
		</view>

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
			<uni-load-more :status="loadStatus"></uni-load-more>
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
				articles: [],
				pageNo: 0,
				loadStatus: 'more'
			}
		},
		created() {
			this.getHomeData()
			this.getArticleData()
		},
		onReachBottom() {
			this.loadMore()
		},
		onPullDownRefresh() {
			this.pageNo = 0
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
				get(`/article/list/${this.pageNo}/json`).then(res => {
					uni.stopPullDownRefresh()
					const newItems = res.data.datas
					if (newItems.length === 0) {
						this.loadStatus = 'no-more'
					} else {
						if (this.pageNo === 0) {
							this.articles = newItems
						} else {
							this.articles.push(...newItems)
						}
						this.loadStatus = 'more'
					}
				}).catch(error => {
					if (this.pageNo !== 0) {
						this.pageNo--
					}
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
			loadMore() {
				this.pageNo++
				this.loadStatus = 'loading'
				this.getArticleData()
			},
			onSearch() {
				uni.navigateTo({
					url: '/pages/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 10px;
		font-size: 14px;
		line-height: 24px;
		// background-color: white;
	}

	.search {
		background-color: #E7E7E7;
		border-radius: 10px;
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 5px;
		padding-bottom: 5px;
		margin-bottom: 10px;
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.swiper-box {
		width: 100%;
		height: 180px;
		margin-bottom: 10px;
		image {
			width: 100%;
			height: 100%;
			border-radius: 10px;
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