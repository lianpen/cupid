
<template>
	<div class="c-list-item c-input-item c-list-item-middle">
		<div class="c-list-line">
			<div class="c-input-label c-input-label-5">
				<slot></slot>
			</div>
			<div class="c-input-control">
				<input type="text" 
					v-bind:value='value | trim'
					v-on:input='$emit("input", $event.target.value)' />
			</div>
		</div>
	</div>
</template>


<script>
	export default {
		props: {
			value: {
				type: String,
				default: ''
			}
		}
	}
</script>

