<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #fff;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
	
	/* #ifdef MP-WEIXIN */
	//控制轮播图整体在左侧
	// wx-swiper .wx-swiper-dots {
	// 	left: 60px;
	// }
	wx-swiper .wx-swiper-dots {
		bottom: 0px;
	}
	//默认样式
	wx-swiper .wx-swiper-dot {
		background: rgba(0, 0,0, .3);
		height: 5px;
		width: 5px;
	}
	//轮播图当前index样式
	wx-swiper .wx-swiper-dot-active {
		width: 20px;
		height: 5px;
		border-radius: 10px;
		background-color: #999;
	}
	/* #endif */
	
</style>
