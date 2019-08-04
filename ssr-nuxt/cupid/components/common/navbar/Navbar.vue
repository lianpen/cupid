
<template>
	<div class="c-navbar">
		<div class="c-navbar-left" 
			v-on:click='onClickLeftFinal'>
			<span class='c-navbar-left-icon' v-if='backable'>
				<c-svg name='back' size='30' />
			</span>
		</div>
		<div class="c-navbar-title">
			<slot></slot> 
		</div>
		<div class="c-navbar-right"
			v-on:click='onClickRight'>
			<slot name='right'></slot>
		</div>
	</div>
</template>

<script>
	import utils from '@/utils/baseUtils'
	export default {
		props: {
			backable: {
				type: Boolean,
				default: true
			},
			onClickLeft: {
				type: Function
			},
			onClickRight: {
				type: Function,
				default: utils.noop
			}
		},
		methods: {
			onClickLeftFinal() {
				if (this.onClickLeft) {
					this.conClickLeft()
				} else {
					window.history.go(-1)
				}
			}
		}
	}
</script>

<style type="less">
	.c-navbar {
		display: flex;
		align-items: center;
		height: 45px;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		right: 0;
		background: #4a7ec0;
		color: #fff;
	}
	.c-navbar-title {
		justify-content: center;
		font-size: 18px;
		white-space: nowrap;
	}
	.c-navbar-left, .c-navbar-title, .c-navbar-right {
		flex: 1;
		height: 100%;
		display: flex;
		align-items: center;
	}
	.c-navbar-left {
		padding-left: 15px;
		font-size: 16px;
	}
	.c-navbar-left-icon {
		margin-right: 5px;
		display: inherit;
	}
	.c-navbar-right {
		justify-content: flex-end;
		font-size: 16px;
		margin-right: 15px;
	}
</style>