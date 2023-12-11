<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		onLoad(options) {
			const title = decodeURIComponent(options.title)
			this.url = decodeURIComponent(options.url)
			
			uni.setNavigationBarTitle({
				title:title
			})
		}
	}
</script>

<style>

</style>