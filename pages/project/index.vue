<template>
	<view class="container">

		<uni-row class="row-container">
			<uni-col :span="6">
				<view class="select-container" @click="showPop">
					<text class="title-text">分类一</text>
					<uni-icons type="down" color="#999" size="18"></uni-icons>
				</view>
			</uni-col>
			<uni-col :span="6">
				<view class="select-container">
					<text class="title-text">分类二</text>
					<uni-icons type="down" color="#999" size="18"></uni-icons>
				</view>
			</uni-col>
			<uni-col :span="6">
				<view class="select-container">
					<text class="title-text">分类三</text>
					<uni-icons type="down" color="#999" size="18"></uni-icons>
				</view>
			</uni-col>
			<uni-col :span="6">
				<view class="select-container">
					<text class="title-text">分类四</text>
					<uni-icons type="down" color="#999" size="18"></uni-icons>
				</view>
			</uni-col>

		</uni-row>

		<view class="pop-container">

			<uni-popup ref="popup" background-color="#fff">
				<view ><text>popup 内容</text></view>
			</uni-popup>
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
				titles: []
			}
		},
		created() {
			this.getProjectData()
		},
		methods: {
			getProjectData() {
				get('/project/tree/json').then(res => {
					this.titles = res.data
				}).catch(error => {
					uni.showToast({
						title: error,
						duration: 2000
					})
				})
			},
			showPop() {
				this.$refs.popup.open('top')
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
		width: 100%;
	}

	.row-container {
		width: 100%;
	}

	.select-container {
		// width: 20%;
		height: 30px;
	}

	.title-text {
		font-size: 13px;
	}

	.pop-container {
		height: 150px;
		margin-top: 30px;
	}
</style>