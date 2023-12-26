<template>
	<view class="container">

		<view class="title-row">
			<uni-row>
				<uni-col :span="6" v-for="(items,index) in 4" :key="index">
					<view class="select-container" @click="clickMenu(index)">
						<text class="title-text">{{getTitle(index)}}</text>
						<uni-icons :type="getArrowType(index)" color="#999" size="18"></uni-icons>
					</view>

				</uni-col>

			</uni-row>
		</view>

		<view>

			<uni-transition mode-class="fade" :show="showMenu" style="z-index: 10;position: absolute;margin-top: 30px;">
				<view class="pop-container">
					<view v-for="(item,index) in content" :key="index" class="flex-item" @click="clickItem(item)">
						{{item.name}}
					</view>
				</view>
			</uni-transition>

			<uni-grid :column="2" @change="change" :showBorder="false"
				style="z-index: 5;position: absolute;width: 100vw;margin-top: 30px;">
				<uni-grid-item v-for="(item, index) in articles" :index="index" :key="index">
					<view class="grid-item-box">
						<image class="img" :src="item.envelopePic" mode="scaleToFill"></image>
						<text class="text">{{item.title}}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
			<uni-load-more :status="loadStatus" v-show="!showHot"></uni-load-more>
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
				titles: [],
				content: [],
				showMenu: false,
				curIndex: 0,
				styles: {
					with: '100%',
					height: '150px',
					top: '30px',
				},
				pageNo: 0,
				loadStatus: 'more',
				articles: [],
				projectId: 0
			}
		},
		created() {
			this.getProjectData()
		},
		onReachBottom() {
			this.loadMore()
		},
		onPullDownRefresh() {
			this.pageNo = 0
			this.getProjectData()
		},
		methods: {
			getProjectData() {
				get('/project/tree/json').then(res => {
					const items = res.data
					const size = Math.ceil(items.length / 4)
					for (let i = 0; i < items.length; i += size) {
						const childItems = items.slice(i, i + size)
						this.titles.push(childItems)
					}
					console.log(this.titles)
					this.projectId = items[0].id
					this.getProjectList()
				}).catch(error => {
					uni.showToast({
						title: error,
						duration: 2000
					})
				})
			},
			clickMenu(index) {
				if (this.showMenu && index != this.curIndex) {
					this.showMenu = this.showMenu
				}else{
					this.showMenu = !this.showMenu
				}
				this.curIndex = index;
				this.content = this.titles[index]
			},
			getTitle(index) {
				switch (index) {
					case 0:
						return '分类一';
					case 1:
						return '分类二';
					case 2:
						return '分类三';
					case 3:
						return '分类四';
					default:
						return '';
				}
			},
			getArrowType(index) {
				if (this.curIndex === index && this.showMenu) {
					return 'up';
				} else {
					return 'down';
				}
			},
			clickItem(item) {
				this.showMenu = false
				this.projectId = item.id
				this.pageNo = 0
				this.getProjectList()
			},
			getProjectList() {
				get(`/project/list/${this.pageNo}/json?cid=${this.projectId}`).then(res => {
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
			loadMore() {
				this.pageNo++
				this.loadStatus = 'loading'
				this.getProjectList()
			},
			change(e) {
				let {
					index
				} = e.detail
				uni.navigateTo({
					url: '/pages/webview?title=' + encodeURIComponent(this.articles[index].title) + '&url=' +
						encodeURIComponent(
							this.articles[index].link)
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		font-size: 14px;
		line-height: 24px;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow-y: scroll;
	}

	.title-row {
		background-color: #fff;
		position: fixed;
		top: 0;
		height: 30px;
		z-index: 15;
		width: 100%;
	}

	.select-container {
		width: 100%;
		height: 30px;
		display: flex;
		justify-content: center;
	}

	.title-text {
		font-size: 13px;
	}

	.pop-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		padding: 10px;
		background-color: #fff;
		// border-bottom: 0.5px solid black;
	}

	.flex-item {
		margin-left: 5px;
		margin-right: 5px;
		margin-top: 2px;
		margin-bottom: 2px;
		padding-left: 5px;
		padding-right: 5px;
		padding-top: 2px;
		padding-bottom: 2px;
		background-color: #f2f2f2;
		border-radius: 5px;
		font-size: 12px;
	}

	.grid-item-box {
		flex: 1;
		width: 50vw;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		padding: 5px;
	}

	.img {
		margin: 5px;
		border-radius: 5px;
		width: 90%;
		height: 100%;
	}

	.text {
		width: 100%;
		padding: 5px;
		font-size: 12px;
		text-align: center;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
</style>