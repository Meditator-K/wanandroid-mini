<template>
	<view class="container">
		<uni-list>
			<uni-list-item v-for="(group,index) in info" :key="index">
				<template v-slot:body>
					<view class="list-container">
						<text class="title">{{group.name}}</text>
						<view class="wrap">
							<view v-for="(item,index1) in group.children" :key="index1" @click="clickItem(item)">
								<view class="item" :style="{'background-color':randomColor()}">
									<text class="item-text">{{item.name}}</text>
								</view>
							</view>
						</view>
					</view>
				</template>
			</uni-list-item>
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
				info: [],

			}
		},
		computed: {

		},
		created() {
			this.getData()
		},
		methods: {
			randomColor() {
				let colorList = [
					"#C7EDCC", "#5CACEE", "#FAF9DE", "#FFF2E2", "#E3EDCD", "#DCE2F1", "#E9EBFE"
				]
				let index = Math.floor(Math.random() * colorList.length)
				return colorList[index];
			},
			getData() {
				get('/tree/json').then(res => {
					console.log(res)
					this.info = res.data
				}).catch(error => {
					uni.showToast({
						title: error,
						duration: 2000
					})
				})
			},
			clickItem(item) {
				uni.navigateTo({
					url: '/pages/system/detail?title=' + encodeURIComponent(item.name) + '&id=' + encodeURIComponent(
						item.id)
				})
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

	.list-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.title {
		font-size: 15px;
		font-weight: bold;
		color: black;
	}

	.wrap {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		margin-top: 5px;
		margin-bottom: 5px;
	}

	.item {
		margin: 5px;
		padding: 0px 12px 2px 12px;
		border-radius: 16px;
	}

	.item-text {
		font-size: 12px;
		color: black;
	}
</style>