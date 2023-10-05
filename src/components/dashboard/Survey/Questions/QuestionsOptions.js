import styles from './questions.module.scss'

import {
    PrimaryButton,
    SecondaryButton
} from '@/components/ui/Button'

import {
    CgEye,
    CgShare,
    CgCheckO,
    CgMathPlus
} from 'react-icons/cg'

import cn from '@/utils/cn'
import notify from '@/utils/notify'
import generateHexId from '@/utils/generateHexId'
import inter from '@/assets/fonts/inter'

import { updateSurveyQuestions } from '@/actions/surveys'

import { useSurvey } from '@/hooks'
import { useCallback, useState } from 'react'

const QuestionsOptions = () => {

    const {
        survey, setSurvey,
        selectedId, setSelectedId,
        synchronization, setSynchronization
    } = useSurvey()

    const [loading, setLoading] = useState(false)

    const handleSave = useCallback(async event => {

        event.preventDefault()

        try {

            if (loading) return

            setLoading(true)

            for (const question of survey.questions) {

                if (question.title.length < 3 || question.title.length > 64) {

                    notify({
                        message: 'Popraw tytuł wybranego pytania',
                        status: 'info'
                    })

                    setSelectedId(question._id)

                    return
                }

                if (question.fields) for (const field of question.fields) {

                    if (!field.text.length) {
                        notify({
                            message: 'Popraw opcje wybranego pytania',
                            status: 'info'
                        })

                        setSelectedId(question._id)

                        return
                    }
                }

            }

            const { error } = await updateSurveyQuestions(
                { surveyId: survey._id },
                {
                    questions: survey.questions.map(question => {
                        return {
                            _id: question._id,
                            title: question.title,
                            mode: question.mode,
                            isRequired: question.isRequired,
                            fields: question.fields.map(field => ({
                                text: field.text
                            }))
                        }
                    })
                }
            )

            if (error) {

                notify({
                    message: error.message,
                    status: 'error'
                })

                return
            }

            notify({
                message: 'Pomyślnie zapisano zmiany',
                status: 'success'
            })

            setSynchronization(true)

        } finally {
            setLoading(false)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [survey, loading])

    const handleAddQuestion = useCallback(() => {

        const surveyId = generateHexId(24)

        const selectedIndex = survey.questions.findIndex(question => question._id === selectedId)

        survey.questions.splice(selectedIndex + 1, 0, {
            _id: surveyId,
            isRequired: true,
            title: 'Nowe pytanie',
            fields: [],
            mode: 'shortAnswer'
        })

        setSurvey({ ...survey })
        setSelectedId(surveyId)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [survey, selectedId])

    const handleVisit = useCallback(() => {
        window.open(`/survey/${survey._id}`)
    }, [survey._id])

    const handleShare = useCallback(() => {

        navigator.clipboard?.writeText('https://survey-app-sigma.vercel.app/survey/' + survey._id)

        notify({
            message: 'Skopiowno do schowka',
            status: 'info'
        })
        
    }, [survey._id])

    return (
        <div className={styles.options}>

            <h2 className={cn(styles.optionsTitle, inter)}>{survey.title}</h2>

            <SecondaryButton
                onClick={handleAddQuestion}
                disabled={survey.questions.length >= 30}
                type="button"
            >
                <CgMathPlus />
                <span>Pytanie</span>
            </SecondaryButton>

            <SecondaryButton
                onClick={handleVisit}
                type="button"
            >
                <CgEye />
                <span>Odwiedź</span>
            </SecondaryButton>

            <SecondaryButton
                onClick={handleShare}
                type="button"
            >
                <CgShare />
                <span>Udostępnij</span>
            </SecondaryButton>

            <PrimaryButton
                onClick={handleSave}
                loading={loading}
                disabled={synchronization}
                type="button"
            >
                <CgCheckO />
                <span>Zapisz</span>
            </PrimaryButton>

        </div>
    )
}

export default QuestionsOptions