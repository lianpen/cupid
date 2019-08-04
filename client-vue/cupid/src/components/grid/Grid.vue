
<template>
	<div class='c-grid'>
		<div class='c-grid-line' 
			v-for='(lineData, index) in linesData'
			v-bind:key='index'>
			<div class='c-grid-item' 
				v-for='(itemData,index) in lineData' 
				v-bind:key='index'
				v-on:click='onClick(itemData)'>
				<div class='c-grid-content' v-if='itemData'>
					<div class='c-grid-inner'>
						<div class="c-grid-img">
							<c-svg v-bind:name="itemData.img" size="40"></c-svg>
						</div>
						<div class='c-grid-text'> 
							{{ itemData.title }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	let noop = () => {}

	let vue = {
		data() {
			return {
				foo: 1
			}
		},
		props: {
			data: {
				type: Array,
				default: []
			},
			onClick: {
				type: Function,
				default: noop
			},
			columnNum: {
				type: Number,
				default: 4
			},
			hasLine: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			linesData() {
				let lineNumber = parseInt(this.data.length / this.columnNum) + 1
				let result = []
				for (let i = 0; i < lineNumber; i += 1) {
					let lineData = []
					for (let j = 0; j < this.columnNum; j += 1) {
						let index = i * this.columnNum + j
						if (index <= this.data.length - 1) {
							lineData.push(this.data[index])
						} else {
							lineData.push(null)
						}
					}
					result.push(lineData)
				}
				return result
			}
		}
	}
	export default vue
</script>

<style>
	.c-grid {
		position: relative;
	}
	.c-grid-line {
		display: flex;
		overflow: hidden;
		text-align: left;
		align-items: stretch;
		background: #fff;
		position: relative;
	}
	.c-grid-item {
		position: relative;
		margin-left: 0;
		flex: 1;
		min-width: 10px;
		text-align: center;
	}
	.c-grid-content {

	}
	.c-grid-inner {
	}
	.c-grid-img {
		max-width: 100%;
		margin: 20px 0 10px;
		color: #ff5e00;
	}
	.c-grid-text {
		margin-top: 9px;
		font-size: 12px;
		color: #000;
		text-align: center;
	}
	.c-grid-item-empty {

	}
</style>