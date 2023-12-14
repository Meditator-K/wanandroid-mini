<template>
	<view class="container">
		<uni-search-bar bg-color="#E7E7E7" @confirm="search" @cancel="cancelSearch" v-model="inputValue"
			placeholder="请输入搜索内容"></uni-search-bar>

		<view v-if="showHot" class="flex-container">
			<view v-for="(item,index) in hotKeys" :key="index" class="flex-item" @click="clickHotKey(item.name)">
				{{item.name}}
			</view>
		</view>

		<uni-list v-else="showHot">
			<uni-list-item v-for="(item, index) in articles" :key="index" clickable="true" @click="clickArticle(item)">
				<template v-slot:body>
					<view class="expand-container"> 
						<view class="custom-body">
							<text>{{item.title.replace("<em class='highlight'>", '').replace("<\/em>",'')}}</text>
							<uni-icons type="star-filled" color="#999" size="18"></uni-icons>
						</view>
						<view class="custom-body">
							<text class="footer-text">{{item.shareUser}}</text>
							<text class="footer-text">{{item.niceShareDate}}</text>
						</view>
					</view>
				</template>
			</uni-list-item>
			<uni-load-more :status="loadStatus" v-show="!showHot"></uni-load-more>
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
				inputValue: '',
				hotKeys: [],
				pageNo: 0,
				articles: [],
				loadStatus: 'more',
				showHot: true
			}
		},
		created() {
			this.getHotKeys()
		},
		onReachBottom() {
			this.loadMore()
		},
		onPullDownRefresh() {
			this.pageNo = 0
			this.searchByKey()
		},
		methods: {
			getHotKeys() {
				get('/hotkey/json').then(res => {
					this.hotKeys = res.data
				}).catch(error => {
					uni.showToast({
						title: error,
						duration: 2000
					})
				})
			},
			clickHotKey(name) {
				this.inputValue = name
				this.searchByKey()
			},
			search(res) {
				console.log('输入：', res.value)
				this.searchByKey()
			},
			cancelSearch() {
				this.inputValue = ''
				this.showHot = true
			},
			searchByKey() {
				this.showHot = false
				post(`/article/query/${this.pageNo}/json?k=${this.inputValue}`).then(res => {
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
				this.searchByKey()
			},
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 10px;
		font-size: 14px;
		line-height: 24px;
	}

	.flex-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
	
	.expand-container{
		width: 100%;
	}

	.flex-item {
		margin: 5px;
		padding: 10px;
		background-color: #f2f2f2;
		border-radius: 5px;
		font-size: 12px;
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