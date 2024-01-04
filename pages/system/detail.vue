<template>
	<view class="container">
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
		get,
		post
	} from '@/utils/http.js'
	export default {
		data() {
			return {
				id: '',
				articles: [],
				pageNo: 0,
				loadStatus: 'more'
			}
		},
		onLoad(options) {
			const title = decodeURIComponent(options.title)
			this.id = decodeURIComponent(options.id)

			uni.setNavigationBarTitle({
				title: title
			})
			this.getData()
		},
		onReachBottom() {
			this.loadMore()
		},
		onPullDownRefresh() {
			this.pageNo = 0
			this.getData()
		},
		methods: {
			getData() {
				get(`/article/list/${this.pageNo}/json?cid=${this.id}`).then(res => {
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
				uni.navigateTo({
					url: '/pages/webview?title=' + encodeURIComponent(item.title) + '&url=' + encodeURIComponent(
						item.link)
				})
			},
			loadMore() {
				this.pageNo++
				this.loadStatus = 'loading'
				this.getData()
			},
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 3px;
		font-size: 14px;
		line-height: 24px;
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