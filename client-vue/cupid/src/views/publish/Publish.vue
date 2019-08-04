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
					<c-list-inputItem v-for='(question, index) in questionList'
						:key='index'
						v-model='question.title'>
						问题 {{ index + 1 }}
					</c-list-inputItem>
				</template>
			</c-list>
		</div>
		<div class='p-submit'>
			<cube-button @click='onSubmit'>
				提交
			</cube-button>
		</div>
		{{ global.author }}
		<div v-for='number in testAry'
			@click="onTestAry">
			{{ number }}
		</div>	
	</div>
</template>

<script>

	import model from '@/model/index'
	import Vue from 'vue'

	export default {
		data() {
			return {
				questionnaire: model.questionnaire.init(),
				questionList: model.questionnaire.getQuestionListForPublish(),
				testAry: [1, 2, 3]
			}
		},
		computed: {
			submitParams() {
				return {
					questionList: this.questionList.map(question => question.title)
				}
			}
		},
		methods: {
			onTestAry() {
				Vue.set(this.testAry, 0, 100)
			},
			onAddQuestion() {
				this.questionList.push(model.question.init())
			},
			async onSubmit() {
				let url = 'http://localhost:3000/questionnaire/insert'
				let res = await fetch(url, {
				    method: 'POST',
				    headers: {
				    	'content-type': 'application/json'
				    },
				    body: JSON.stringify(this.submitParams)
				})
				let text = await res.text()
				console.log(text)
			}
		}
	}
</script>