<template>
	<view class="container">

		<view class="title-row">
			<uni-row >
				<uni-col :span="6" v-for="(items,index) in 4" :key="index">
					<view class="select-container" @click="clickMenu(index)">
						<text class="title-text">{{getTitle(index)}}</text>
						<uni-icons :type="getArrowType(index)" color="#999" size="18"></uni-icons>
					</view>
			
				</uni-col>
			
			</uni-row>
		</view>

		<uni-transition mode-class="fade" :show="showMenu">
			<view class="pop-container">
				<view v-for="(item,index) in content" :key="index" class="flex-item" @click="clickItem(item)">
					{{item.name}}
				</view>
			</view>
		</uni-transition>

		<uni-grid :column="2" @change="change" :showBorder="false">
			<uni-grid-item v-for="(item, index) in articles" :index="index" :key="index">
				<view class="grid-item-box">
					<image class="img" :src="item.envelopePic" mode="scaleToFill"></image>
					<text class="text">{{item.title}}</text>
				</view>
			</uni-grid-item>
		</uni-grid>
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
				this.curIndex = index;
				this.showMenu = !this.showMenu
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
				this.projectId = items.id
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
			change() {

			}
		}
	}
</script>

<style lang="scss">
	.container {
		font-size: 14px;
		line-height: 24px;
		width: 100%;
		flex-direction: column;
	}
	
	.title-row{
		background-color: #fff;
		position: sticky;
		top: 0;
		z-index: 10;
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