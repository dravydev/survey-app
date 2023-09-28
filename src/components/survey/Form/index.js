import styles from './form.module.scss'

import { PrimaryButton } from '@/components/ui/Button'

import FormItem from './FormItem'

import { completeSurvey } from '@/actions/surveys'

import { useSurvey } from '@/hooks'
import { useReCaptcha } from 'next-recaptcha-v3'
import { useCallback } from 'react'

const Questions = () => {

    const { survey } = useSurvey()
    const { executeRecaptcha } = useReCaptcha()

    const handleForm = useCallback(async event => {

        event.preventDefault()

        const answers = []

        const showError = questionId => {

            const question = document.querySelector(`[data-id="${questionId}"]`)

            question.classList.add(styles.itemError)

        }

        const questions = document.querySelectorAll(`.${styles.item}`)

        questions.forEach(question => {

            const { id, mode, required } = question.dataset

            if (mode.endsWith('Choice')) {

                const fields = question.querySelectorAll('input')

                const fieldsChecked = Array.from(fields)
                    .filter(field => field.checked)
                    .map(field => field.value)

                if (!fieldsChecked.length && required === 'true') {
                    showError(id)
                    return
                }

                if (fieldsChecked.length) answers.push({
                    _id: id,
                    mode: mode,
                    values: fieldsChecked
                })

            } else {

                const field = question.querySelector(mode.startsWith('short') ? 'input' : 'textarea')

                if (!field.value.length && required === 'true') {
                    showError(id)
                    return
                }

                if (field.value.length) answers.push ({
                    _id: id,
                    mode: mode,
                    value: field.value
                })

            }
            
        })

        console.log(answers)

        const { error, data } = await completeSurvey(
            { surveyId: survey._id },
            {
                recaptchaToken: await executeRecaptcha(),
                answers: answers
            }
        )

        console.log(error, data)

    }, [])

    return (
        <form
            autoComplete="off"
            onSubmit={handleForm}
            className={styles.root}
        >
            {survey.questions.map((question, index) => <FormItem
                key={question._id}
                {...question}
            />)}
            <PrimaryButton>
                <span>Zakończ ankietę</span>
            </PrimaryButton>
        </form>
    )
}

export default Questions