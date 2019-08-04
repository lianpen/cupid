<template>
	<div class="p-stage">
		<c-navbar v-bind:backable='false'>
			工作台
		</c-navbar>
		<el-carousel height='240px'>
			<el-carousel-item v-for='item in imgList' :key='item.image'>
				<img :src='item.image' />
			</el-carousel-item>
		</el-carousel>
		<c-grid v-bind:data="gridData"
			v-bind:onClick="onClickGrid" />
	</div>
</template>

<script>
	import slide_img1 from '~/assets/img/1.jpg'
	import slide_img2 from '~/assets/img/2.jpg'
	import slide_img3 from '~/assets/img/3.jpg'
	import CNavbar from '~/components/common/navbar/Navbar.vue'
	import CGrid from '~/components/common/grid/Grid.vue'

	export default {
		components: {
			'c-navbar': CNavbar,
			'c-grid': CGrid
		},
		data() {
			let gridData = [{
				title: '发布',
				value: '/publish',
				img: 'grid_integral'
			}, {
				title: '大厅',
				value: '/hall',
				img: 'grid_top'
			}]
			return {
				imgList: [{
					image: slide_img1
				}, {
					image: slide_img2
				}, {
					image: slide_img3
				}],
				gridData: gridData
			}
		},
		methods: {
			onClickGrid(o) {
				location.href = o.value
			}
		}
	}
</script>

<style lang="stylus">
.p-stage 
	margin-top: 45px
	img 
		width: 100%
</style>