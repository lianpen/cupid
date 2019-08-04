
<template>
	<div class='p-hall'>
		<c-navbar>大厅</c-navbar>
		<div class='shared-underNavbar p-body'>
			<c-list title='问卷大厅'>
				<c-questionnaire-item v-for='questionnaire in questionnaireList'
					:key='questionnaire'
					:questionnaire='questionnaire'>
				</c-questionnaire-item>
			</c-list>
		</div>
	</div>
</template>

<script>
	import model from 'model'
	import CQuestionnaireItem from '~/components/pages/hall/QuestionnaireItem.vue'
	import utils from '~/utils/baseUtils'

	export default {
		components: {
			'c-questionnaire-item': CQuestionnaireItem
		},
		data() {
			return {
				questionnaireList: []
			}
		},
		async asyncData({param}) {
			let res = await utils.request('questionnaire/get_list')
			if (!res) return null
			let list = res.data
			return {
				questionnaireList: list.map(o => new model.Questionnaire(o))
			}
		}
	}
</script>