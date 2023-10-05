import styles from './form.module.scss'

import { PrimaryButton } from '@/components/ui/Button'

import FormItem from './FormItem'
import FormInfo from './FormInfo'

import notify from '@/utils/notify'
import { completeSurvey } from '@/actions/surveys'

import {
    BiCheckCircle,
    BiErrorCircle
} from 'react-icons/bi'

import { useSurvey } from '@/hooks'
import { useReCaptcha } from 'next-recaptcha-v3'
import { useCallback, useState } from 'react'

const getCompletedSurveys = () => {

    const surveys = localStorage.getItem('surveys')

    return surveys ? JSON.parse(surveys) : []
}

const saveSurvey = (surveys, surveyId) => {

    surveys.push(surveyId)

    localStorage.setItem('surveys', JSON.stringify(surveys))

}


const showError = questionId => {

    const question = document.querySelector(`[data-id="${questionId}"]`)

    question.classList.add(styles.itemError)

}

const Form = () => {

    const { survey } = useSurvey()
    const { executeRecaptcha } = useReCaptcha()

    const completedSurveys = getCompletedSurveys()

    const [loading, setLoading] = useState(false)
    const [completed, setCompleted] = useState(completedSurveys.includes(survey._id))

    const handleForm = useCallback(async event => {

        event.preventDefault()

        try {

            if (loading) return

            setLoading(true)

            const answers = []

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

                    if (field.value.length) answers.push({
                        _id: id,
                        mode: mode,
                        value: field.value
                    })

                }

            })

            const { error, data } = await completeSurvey(
                { surveyId: survey._id },
                {
                    recaptchaToken: await executeRecaptcha(),
                    answers: answers
                }
            )

            if (error) {

                notify({
                    message: error.message,
                    status: 'error'
                })

                if (error.reason === 'AlreadyCompletedError') {

                    saveSurvey(completedSurveys, survey._id)

                    setCompleted(true)

                }

                return
            }

            console.log(data)

            saveSurvey(completedSurveys, survey._id)

            setCompleted(true)

        } finally {
            setLoading(false)
        }

    }, [])

    if (!survey.questions.length) return <FormInfo
        icon={<BiErrorCircle />}
        text="Ankieta jest tymczasowo niedostępna."
    />

    if (completed) return <FormInfo
        icon={<BiCheckCircle />}
        text="Twoje odpowiedzi zostały zapisane."
    />

    return (
        <form
            autoComplete="off"
            onSubmit={handleForm}
            className={styles.root}
        >
            {survey.questions.map(question => <FormItem
                key={question._id}
                {...question}
            />)}
            <PrimaryButton disabled={completed} loading={loading}>
                <span>Zakończ ankietę</span>
            </PrimaryButton>
        </form>
    )
}

export default Form