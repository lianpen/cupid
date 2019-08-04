<template>
	<div class="p-stage">
		<c-navbar v-bind:backable='false'>
			工作台
		</c-navbar>
		<cube-slide v-bind:data="imgList" />
		<c-grid v-bind:data="gridData"
			v-bind:onClick="onClickGrid" />
	</div>
</template>

<script>
	import slide_img1 from '@/assets/img/1.jpg'
	import slide_img2 from '@/assets/img/2.jpg'
	import slide_img3 from '@/assets/img/3.jpg'

	export default {
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
				location.href = '/#' + o.value
			}
		}
	}
</script>

<style lang="less">
	.p-stage {
		img {
			width: 100%;
		}
	}
</style>