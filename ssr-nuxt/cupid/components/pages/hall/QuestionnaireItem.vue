
<template>
	<c-list-item @click='onClick'
		:arrow='true'>
		{{ this.title }}
		<c-list-brief v-for='(text, index) in briefList'
			:key='index'>
			{{ text }}
		</c-list-brief>
	</c-list-item>
</template>

<script>
	import dateUtil from '@/utils/date'

	export default {
		props: {
			questionnaire: {
				type: Object
			}
		},
		computed: {
			title() {
				let {
					authorName,
					createTime
				} = this.questionnaire
				let date = new Date(parseInt(createTime))
				let dateStr = dateUtil.format(date, 'yyyy-MM-dd hh-mm')
				return authorName + ' ' + dateStr
			},
			briefList() {
				let abstract = this.questionnaire.abstract
				let o = JSON.parse(abstract)
				if (!o.length) o = []
				return o
			}
		},
		methods: {
			onClick() {
				window.location.href = 'questionnaire/' + this.questionnaire.id
			}
		}
	}
</script>