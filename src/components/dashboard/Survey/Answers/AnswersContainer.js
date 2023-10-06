import styles from './answers.module.scss'

import AnswersContainerItem from './AnswersContainerItem'

import { useSurvey } from '@/hooks'

const AnswersContainer = () => {
	const { survey } = useSurvey()

	const questions = structuredClone(survey.questions)

	survey.answers.forEach((answer) => {
		answer.fields.forEach((field) => {
			const question = questions.find(
				(question) => question._id === field.questionId
			)

			question.answers
				? question.answers.push(field.value || field.values)
				: (question.answers = [field.value || field.values])
		})
	})

	return (
		<div className={styles.container}>
			{questions.map((question) => (
				<AnswersContainerItem key={question._id} {...question} />
			))}
		</div>
	)
}

export default AnswersContainer
