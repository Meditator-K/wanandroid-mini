let BASE_URL = ''
if(process.env.NODE_ENV === 'development'){
	BASE_URL = 'https://www.wanandroid.com'
} else{
	BASE_URL = 'https://www.wanandroid.com'
}
const config = {
	baseUrl : BASE_URL
}

export default config