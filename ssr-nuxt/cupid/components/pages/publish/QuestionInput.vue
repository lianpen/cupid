<template>
	<c-list-inputItem :value='question.title'
		@onChange='onChangeQuestion'>
		问题 {{ index + 1 }}
	</c-list-inputItem>
</template>

<script>
	export default {
		props: {
			question: {
				type: Object
			},
			index: {
				type: Number
			}
		},
		methods: {
			onChangeQuestion(value) {
				this.question.title = value
			}
		}
	}
</script>