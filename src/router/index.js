import Vue from 'vue'
import Router from 'vue-router'
import ImageList from '@/views/ImageList'
import Login from '@/views/Login'
import Register from '@/views/Register'
import UploadImages from '@/views/UploadImages'
import LabelImage from '@/views/LabelImage'
import DistributeData from '@/views/DistributeData'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'ImageList',
			component: ImageList
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/register',
			name: 'Register',
			component: Register
		},
		{
			path: '/upload',
			name: 'UploadImages',
			component: UploadImages
		},
		{
			path: '/LabelImage',
			name: 'LabelImage',
			component: LabelImage
		},
		{
			path: '/distribute',
			name: 'DistributeData',
			component: DistributeData
		}
	]
})
