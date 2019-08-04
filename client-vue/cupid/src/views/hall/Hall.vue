
<template>
	<div class='p-hall'>
		<c-navbar>大厅</c-navbar>
		<div class='shared-underNavbar p-body'>
			<c-list title='问卷大厅'>
				<c-questionnaire-item v-for='questionnaire in questionnaireList'
					:key='questionnaire.id'
					:questionnaire='questionnaire'>
				</c-questionnaire-item>
			</c-list>
		</div>
	</div>
</template>

<script>
	import model from 'model'
	import CQuestionnaireItem from './QuestionnaireItem.vue'
	export default {
		components: {
			'c-questionnaire-item': CQuestionnaireItem
		},
		data() {
			return {
				questionnaireList: []
			}
		},
		async created() {
			let url = 'http://localhost:3000/questionnaire/get_list'
			let res = await fetch(url)
			let data = await res.json()
			if (!data || !data.length) return 
			this.questionnaireList = data.map(o => model.questionnaire.init(o))
		}

	}
</script>