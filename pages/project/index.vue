<template>
	<view class="container">

		<uni-row>
			<uni-col :span="6" v-for="(items,index) in 4" :key="index">
				<view class="select-container" @click="clickMenu(index)">
					<text class="title-text">{{getTitle(index)}}</text>
					<uni-icons :type="getArrowType(index)" color="#999" size="18"></uni-icons>
				</view>

			</uni-col>

		</uni-row>
		
		<uni-transition mode-class="fade" :show="showMenu">
			<view class="pop-container">
				<view v-for="(item,index) in content" :key="index" class="flex-item" @click="clickItem(item.name)">
					{{item.name}}
				</view>
			</view>
		</uni-transition>

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
				}
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
			clickItem(name) {

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
</style>