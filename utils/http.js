import config from '../config.js'


const get = (url = '', data = {}) => {
	return new Promise((resolve, reject) => {
		_request(url, resolve, reject, data, 'GET')
	})
}

const post = (url = '', data = {}) => {
	return new Promise((resolve, reject) => {
		_request(url, resolve, reject, data, 'POST')
	})
}

const _request = (url, resolve, reject, data = {}, method = 'GET') => {
	uni.showLoading({
		title: '加载中...',
		mask: true
	})
	uni.request({
		url: `${config.baseUrl}${url}`,
		method: method,
		data: data,
		header: {
			'content-type': 'application/json',
			'Cookie': uni.getStorageSync('cookie')
		},
		success: (res) => {
			console.log('响应数据：' + JSON.stringify(res.data))
			uni.hideLoading()
			resolve(res.data)
		},
		fail: (err) => {
			console.log('异常数据：' + JSON.stringify(err))
			uni.hideLoading()
			reject(err)
		}
	})
}

export {
	get,
	post
}