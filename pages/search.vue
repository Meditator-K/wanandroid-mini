<template>
	<view class="container">
		<uni-search-bar bg-color="#E7E7E7" @confirm="search" v-model="inputValue"
			placeholder="请输入搜索内容"></uni-search-bar>

		<view class="flex-container">
			<view v-for="(item,index) in hotKeys" :key="index" class="flex-item" @click="clickHotKey(item.name)">
				{{item.name}}
			</view>
		</view>
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
				pageNo: 0
			}
		},
		created() {
			this.getHotKeys()
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
				this.searchByKey(name)
			},
			search(res) {
				console.log('输入：', res.value)
				this.searchByKey(res.value)
			},
			searchByKey(key) {
				console.log('关键字：', key)
				let obj = {
					'k': key
				}
				post(`/article/query/${this.pageNo}/json?k=${key}`).then(res => {
					// uni.stopPullDownRefresh()
					const newItems = res.data.datas
					// if (newItems.length === 0) {
					// 	this.loadStatus = 'no-more'
					// } else {
					// 	if (this.pageNo === 0) {
					// 		this.articles = newItems
					// 	} else {
					// 		this.articles.push(...newItems)
					// 	}
					// 	this.loadStatus = 'more'
					// }
				}).catch(error => {
					if (this.pageNo !== 0) {
						this.pageNo--
					}
					uni.showToast({
						title: error,
						duration: 2000
					})
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
	}

	.flex-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.flex-item {
		margin: 5px;
		padding: 10px;
		background-color: #f2f2f2;
		border-radius: 5px;
		font-size: 12px;
	}
</style>