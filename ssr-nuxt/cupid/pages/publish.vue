<template>
	<div class='p-publish'>
		<c-navbar
			v-bind:onClickRight='onAddQuestion'>
			发布问卷
			<template v-slot:right>
				<c-svg name='ellipsis' size='30' />
			</template>
		</c-navbar>
		<div class='shared-underNavbar p-body'>
			<c-list>
				<template>
					<c-question-input-item v-for='(question, index) in questionList'
						:key='index'
						:question='question'
						:index='index' />
				</template>
			</c-list>
		</div>
		<div class='p-submit'>
			<el-button @click='onSubmit'>
				提交
			</el-button>
		</div>
	</div>
</template>

<script>

	import CQuestionInput from '~/components/pages/publish/QuestionInput.vue'

	import model from '~/model/index'

	export default {
		components: {
			'c-question-input-item': CQuestionInput
		},
		data() {
			return {
				questionnaire: null
			}
		},
		computed: {
			questionList() {
				return this.questionnaire ? this.questionnaire.questionList : []
			},
			submitParams() {
				let questionList = this.questionnaire.questionList.map(question => {
					return {
						title: question.title
					}
				})
				return {
					questionList: questionList
				}
			}
		},
		created() {
			this.questionnaire = new model.Questionnaire()
			this.questionnaire.initializeForPublish()
		},
		methods: {
			onAddQuestion() {
				this.questionnaire.addQuestion()
			},
			async onSubmit() {
				let res = await this.request('questionnaire/insert', {
				    method: 'POST',
				    headers: {
				    	'content-type': 'application/json'
				    },
				    body: JSON.stringify(this.submitParams)
				})
				if (!res) return
				let text = await res.text()
				console.log(text)
			}
		}
	}
</script>

<style lang='stylus'>
	.p-submit
		text-align: center
		margin-top: 40px
		button
			width: 70%
</style>