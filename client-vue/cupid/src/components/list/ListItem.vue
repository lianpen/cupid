
<template>
	<div class="c-list-item c-list-item-middle"
		@click='onClick'>
		<div class="c-list-line c-list-line-multiple">
			<div class="c-list-content">
				<slot></slot>
			</div>
			<div class="c-list-arrow c-list-arrow-horizontal" 
				v-if='arrow'
				aria-hidden="true"></div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			arrow: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>