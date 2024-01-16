<template>
	<view>

		<view class="title-container">
			<uni-icons type="contact" color="#fff" size="40px"></uni-icons>
			<view class="column-container">
				<text style="font-size: 18px;color: #fff;">独孤求败</text>
				<text style="font-size: 14px;color: #fffef8;margin-top: 3px;">ID:666666666</text>
			</view>
		</view>
		<view style="background-color: aliceblue;">
			<view class="row-container">
				<uni-icons type="heart" color="#000" size="24px"></uni-icons>
				<view style="flex: 1;"></view>
				<text style="font-size: 16px;color: #000;">我的收藏</text>
				<uni-icons type="forward" color="#000" size="24px"></uni-icons>
			</view>
			<view class="divider"></view>
			<view class="row-container">
				<uni-icons type="calendar" color="#000" size="24px"></uni-icons>
				<view style="flex: 1;"></view>
				<text style="font-size: 16px;color: #000;">TODO</text>
				<uni-icons type="forward" color="#000" size="24px"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {

		}
	}
</script>

<style>
	.title-container {
		background-color: #feba07;
		border-radius: 8px;
		padding: 12px;
		margin: 10px 20px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.column-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-left: 10px;
	}

	.row-container {
		padding: 10px 15px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.divider {
		height: 1px;
		background-color: grey;
		margin-left: 15px;
		margin-right: 15px;
	}
</style>