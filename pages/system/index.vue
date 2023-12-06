<template>
	<view class="container">
		<uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="info" :current="current" :mode="mode"
			:dots-styles="dotsStyles" field="content">
			<swiper class="swiper-box" @change="change" :current="swiperDotIndex">
				<swiper-item v-for="(item, index) in 3" :key="index">
					<view class="swiper-item" :class="'swiper-item' + index">
						<text style="color: #fff; font-size: 32px;">{{index+1}}</text>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>

		<button @click="getHomeData">获取首页数据</button>

		<view>
			<text>{{homeList}}</text>
		</view>
		<view>
			<uni-card :is-shadow="false" is-full>
				<text class="uni-h6">uni-forms 组件一般由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据。</text>
			</uni-card>
			<uni-section title="基本用法" type="line">
				<view class="example">
					<!-- 基础用法，不包含校验规则 -->
					<uni-forms ref="baseForm" :modelValue="baseFormData">
						<uni-forms-item label="姓名" required>
							<uni-easyinput v-model="baseFormData.name" placeholder="请输入姓名" />
						</uni-forms-item>
						<uni-forms-item label="年龄" required>
							<uni-easyinput v-model="baseFormData.age" placeholder="请输入年龄" />
						</uni-forms-item>
						<uni-forms-item label="性别" required>
							<uni-data-checkbox v-model="baseFormData.sex" :localdata="sexs" />
						</uni-forms-item>
						<uni-forms-item label="兴趣爱好" required>
							<uni-data-checkbox v-model="baseFormData.hobby" multiple :localdata="hobbys" />
						</uni-forms-item>
						<uni-forms-item label="自我介绍">
							<uni-easyinput type="textarea" v-model="baseFormData.introduction" placeholder="请输入自我介绍" />
						</uni-forms-item>
						<uni-forms-item label="日期时间">
							<uni-datetime-picker type="datetime" return-type="timestamp"
								v-model="baseFormData.datetimesingle" />
						</uni-forms-item>
					</uni-forms>
				</view>
			</uni-section>

			<uni-section title="对齐方式" type="line">
				<view class="example">
					<view class="segmented-control">
						<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem"
							styleType="button">
						</uni-segmented-control>
					</view>
					<!-- 展示不同的排列方式 -->
					<uni-forms ref="baseForm" :modelValue="alignmentFormData" :label-position="alignment">
						<uni-forms-item label="姓名" required>
							<uni-easyinput v-model="baseFormData.name" placeholder="请输入姓名" />
						</uni-forms-item>
						<uni-forms-item label="年龄" required>
							<uni-easyinput v-model="baseFormData.age" placeholder="请输入年龄" />
						</uni-forms-item>
					</uni-forms>
				</view>
			</uni-section>

			<uni-section title="表单校验" type="line">
				<view class="example">
					<!-- 基础表单校验 -->
					<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
						<uni-forms-item label="姓名" required name="name">
							<uni-easyinput v-model="valiFormData.name" placeholder="请输入姓名" />
						</uni-forms-item>
						<uni-forms-item label="年龄" required name="age">
							<uni-easyinput v-model="valiFormData.age" placeholder="请输入年龄" />
						</uni-forms-item>
						<uni-forms-item label="自我介绍" name="introduction">
							<uni-easyinput type="textarea" v-model="valiFormData.introduction" placeholder="请输入自我介绍" />
						</uni-forms-item>
					</uni-forms>
					<button type="primary" @click="submit('valiForm')">提交</button>
				</view>
			</uni-section>

			<uni-section title="自定义校验规则" type="line">
				<view class="example">
					<!-- 自定义表单校验 -->
					<uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData">
						<uni-forms-item label="姓名" required name="name">
							<uni-easyinput v-model="customFormData.name" placeholder="请输入姓名" />
						</uni-forms-item>
						<uni-forms-item label="年龄" required name="age">
							<uni-easyinput v-model="customFormData.age" placeholder="请输入年龄" />
						</uni-forms-item>
						<uni-forms-item label="兴趣爱好" required name="hobby">
							<uni-data-checkbox v-model="customFormData.hobby" multiple :localdata="hobbys" />
						</uni-forms-item>
					</uni-forms>
					<button type="primary" @click="submit('customForm')">提交</button>
				</view>
			</uni-section>


			<uni-section title="动态表单" type="line">
				<view class="example">
					<!-- 动态表单校验 -->
					<uni-forms ref="dynamicForm" :rules="dynamicRules" :modelValue="dynamicFormData">
						<uni-forms-item label="邮箱" required name="email">
							<uni-easyinput v-model="dynamicFormData.email" placeholder="请输入姓名" />
						</uni-forms-item>
						<uni-forms-item v-for="(item,index) in dynamicLists" :key="item.id"
							:label="item.label+' '+index" required :rules="item.rules"
							:name="'domains[' + item.id + ']'">
							<view class="form-item">
								<uni-easyinput v-model="dynamicFormData.domains[item.id]" placeholder="请输入域名" />
								<button class="button" size="mini" type="default" @click="del(item.id)">删除</button>
							</view>
						</uni-forms-item>
					</uni-forms>
					<view class="button-group">
						<button type="primary" size="mini" @click="add">新增域名</button>
						<button type="primary" size="mini" @click="submit('dynamicForm')">提交</button>
					</view>
				</view>
			</uni-section>
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
				info: [{
						colorClass: 'uni-bg-red',
						url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
						content: '内容 A'
					},
					{
						colorClass: 'uni-bg-green',
						url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
						content: '内容 B'
					},
					{
						colorClass: 'uni-bg-blue',
						url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
						content: '内容 C'
					}
				],
				dotStyle: [{
						backgroundColor: 'rgba(0, 0, 0, .3)',
						border: '1px rgba(0, 0, 0, .3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
						selectedBorder: '1px rgba(0, 0, 0, .9) solid'
					},
					{
						backgroundColor: 'rgba(255, 90, 95,0.3)',
						border: '1px rgba(255, 90, 95,0.3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
						selectedBorder: '1px rgba(255, 90, 95,0.9) solid'
					},
					{
						backgroundColor: 'rgba(83, 200, 249,0.3)',
						border: '1px rgba(83, 200, 249,0.3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
						selectedBorder: '1px rgba(83, 200, 249,0.9) solid'
					}
				],
				modeIndex: -1,
				styleIndex: -1,
				current: 0,
				mode: 'default',
				dotsStyles: {},
				swiperDotIndex: 0,
				homeList: '',
				// 基础表单数据
				baseFormData: {
					name: '',
					age: '',
					introduction: '',
					sex: 2,
					hobby: [5],
					datetimesingle: 1627529992399
				},
				// 表单数据
				alignmentFormData: {
					name: '',
					age: '',
				},
				// 单选数据源
				sexs: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}, {
					text: '保密',
					value: 2
				}],
				// 多选数据源
				hobbys: [{
					text: '跑步',
					value: 0
				}, {
					text: '游泳',
					value: 1
				}, {
					text: '绘画',
					value: 2
				}, {
					text: '足球',
					value: 3
				}, {
					text: '篮球',
					value: 4
				}, {
					text: '其他',
					value: 5
				}],
				// 分段器数据
				current: 0,
				items: ['左对齐', '顶部对齐'],
				// 校验表单数据
				valiFormData: {
					name: '',
					age: '',
					introduction: '',
				},
				// 校验规则
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					age: {
						rules: [{
							required: true,
							errorMessage: '年龄不能为空'
						}, {
							format: 'number',
							errorMessage: '年龄只能输入数字'
						}]
					}
				},
				// 自定义表单数据
				customFormData: {
					name: '',
					age: '',
					hobby: []
				},
				// 自定义表单校验规则
				customRules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					age: {
						rules: [{
							required: true,
							errorMessage: '年龄不能为空'
						}]
					},
					hobby: {
						rules: [{
								format: 'array'
							},
							{
								validateFunction: function(rule, value, data, callback) {
									if (value.length < 2) {
										callback('请至少勾选两个兴趣爱好')
									}
									return true
								}
							}
						]
					}

				},
				dynamicFormData: {
					email: '',
					domains: {}
				},
				dynamicLists: [],
				dynamicRules: {
					email: {
						rules: [{
							required: true,
							errorMessage: '域名不能为空'
						}, {
							format: 'email',
							errorMessage: '域名格式错误'
						}]
					}
				}
			}
		},
		computed: {
			// 处理表单排列切换
			alignment() {
				if (this.current === 0) return 'left'
				if (this.current === 1) return 'top'
				return 'left'
			}
		},
		onReady() {
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行
			this.$refs.customForm.setRules(this.customRules)
		},
		methods: {
			getHomeData() {

				get('/article/list/0/json').then(res => {
					console.log(res)
					this.homeList = JSON.stringify(res)
				}).catch(error => {
					this.homeList = JSON.stringify(error)
				})
			},
			change(e) {
				this.current = e.detail.current
			},
			selectStyle(index) {
				this.dotsStyles = this.dotStyle[index]
				this.styleIndex = index
			},
			selectMode(mode, index) {
				this.mode = mode
				this.modeIndex = index
				this.styleIndex = -1
				this.dotsStyles = this.dotStyle[0]
			},
			clickItem(e) {
				this.swiperDotIndex = e
			},
			onBanner(index) {
				console.log(22222, index);
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				uni.showModal({
					content: '表单数据内容：' + JSON.stringify(formdata),
					showCancel: false
				});
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			onClickItem(e) {
				console.log(e);
				this.current = e.currentIndex
			},
			add() {
				this.dynamicLists.push({
					label: '域名',
					rules: [{
						'required': true,
						errorMessage: '域名项必填'
					}],
					id: Date.now()
				})
			},
			del(id) {
				let index = this.dynamicLists.findIndex(v => v.id === id)
				this.dynamicLists.splice(index, 1)
			},
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					uni.showToast({
						title: `校验通过`
					})
				}).catch(err => {
					console.log('err', err);
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

	.uni-form-item .title {
		padding: 20rpx 0;
	}

	.example {
		padding: 15px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		margin-left: 10px;
	}

	.swiper-box {
		height: 200px;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 200px;
		color: #fff;
	}

	.swiper-item0 {
		background-color: #cee1fd;
	}

	.swiper-item1 {
		background-color: #b2cef7;
	}

	.swiper-item2 {
		background-color: #cee1fd;
	}

	.image {
		width: 750rpx;
	}

	/* #ifndef APP-NVUE */
	::v-deep .image img {
		-webkit-user-drag: none;
		-khtml-user-drag: none;
		-moz-user-drag: none;
		-o-user-drag: none;
		user-drag: none;
	}

	/* #endif */

	@media screen and (min-width: 500px) {
		.uni-swiper-dot-box {
			width: 400px;
			margin: 0 auto;
			margin-top: 8px;
		}

		.image {
			width: 100%;
		}
	}

	.uni-bg-red {
		background-color: #ff5a5f;
	}

	.uni-bg-green {
		background-color: #09bb07;
	}

	.uni-bg-blue {
		background-color: #007aff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 20rpx;
	}

	.example-body-item {

		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 15rpx;
		padding: 15rpx;
		height: 60rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		padding: 0 15rpx;
		/* #endif */
		flex: 1;
		border-color: #e5e5e5;
		border-style: solid;
		border-width: 1px;
		border-radius: 5px;
	}

	.example-body-item-text {
		font-size: 28rpx;
		color: #333;
	}

	.example-body-dots {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50px;
		background-color: #333333;
		margin-left: 10rpx;
	}

	.active {
		border-style: solid;
		border-color: #007aff;
		border-width: 1px;
	}
</style>