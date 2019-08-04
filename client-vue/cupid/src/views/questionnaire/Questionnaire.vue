<template>
	<div class='p-questionnaire' v-if='questionnaire'>
		<c-navbar>
			问卷详情
		</c-navbar>
		<div class='p-naire shared-underNavbar' @click='onClickNaire'>
			<h3>
				{{ questionnaire.authorName }} 发起的问卷
			</h3>
			<p>
				发起时间: {{ dateStr }}
			</p>
		</div>
		<div class='p-body'>
			<c-list>
				<c-list-item v-for='(question, index) in questionnaire.questionList'
					:key='question.id'
					@click='onClickQuestion(question)'>
		        	问题{{ index + 1 }}：
		        	{{ question.title }}
				</c-list-item>
			</c-list>
		</div>
	</div>
</template>

<script>
	import model from 'model'
	import dateUtil from '@/utils/date'
	import action from './action'

	export default {
		data() {
			return {
				// questionnaire: null
			}
		},
		async created() {
			/*
			let id = this.$route.params.id
			if (!id) return
			let url = 'http://localhost:3000/questionnaire/get_questionnaire?id=' + id
			let res = await fetch(url)
			let data = await res.json()
			if (!data) return
			*/
			let data = {"id":8,"author_id":13,"create_time":"1553237948086","abstract":"[\"今天你穿了什么颜色的内裤?\",\"what color pants are you wearing today?\",\"오늘 뭐 공부 해요?\"]","title":"","author_name":"丁薛祥","questionList":[{"id":5,"type":"","title":"今天你穿了什么颜色的内裤?","questionnaire_id":8,"author_id":13,"create_time":"1553237948097","index_in_questionnaire":0,"is_abstracted":1,"author_name":"丁薛祥"},{"id":6,"type":"","title":"what color pants are you wearing today?","questionnaire_id":8,"author_id":13,"create_time":"1553237948097","index_in_questionnaire":1,"is_abstracted":1,"author_name":"丁薛祥"},{"id":7,"type":"","title":"오늘 뭐 공부 해요?","questionnaire_id":8,"author_id":13,"create_time":"1553237948097","index_in_questionnaire":2,"is_abstracted":1,"author_name":"丁薛祥"},{"id":8,"type":"","title":"西方世界的劫难","questionnaire_id":8,"author_id":13,"create_time":"1553237948097","index_in_questionnaire":3,"is_abstracted":0,"author_name":"丁薛祥"}]}
			let questionnaire = new model.Questionnaire(data)
			let questionListData = data.questionList || []
			questionnaire.questionList = questionListData.map(o => new model.Question(o))
			this.$store.commit(action.initQuestionnaire, questionnaire)
		},
		computed: {
			dateStr() {
				let createTime = this.questionnaire.createTime
				let date = new Date(parseInt(createTime))
				let dateStr = dateUtil.format(date, 'yyyy-MM-dd hh-mm')
				return dateStr
			},
			questionnaire() {
				return this.$store.state.views.questionnaire.questionnaire
			}
		},
		methods: {
			onClickNaire() {
				this.questionnaire.authorName = 'bbb'
			},
			onClickQuestion(question) {
				question.title += '.'
			}
		}
	}
</script>

<style lang='stylus'>
.p-questionnaire 
	.p-naire 
		padding: 15px
		h3 
			line-height: 2
		p 
			line-height: 2
			font-size: 12px
	.p-body 
		padding-top: 10px
</style>