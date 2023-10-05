import styles from './answers.module.scss'

import { PrimaryButton } from '@/components/ui/Button'

import {
    BiRefresh
} from 'react-icons/bi'

import { refreshSurveyAnswers } from '@/actions/surveys'

import { useCallback, useState } from 'react'

import { useSurvey } from '@/hooks'
import notify from '@/utils/notify'

const AnswersOptions = () => {

    const { survey, setSurvey } = useSurvey()
    const [loading, setLoading] = useState(false)

    const handleRefresh = useCallback(async () => {

        try {

            if (loading) return

            setLoading(true)

            const { error, data } = await refreshSurveyAnswers({ surveyId: survey._id })

            if (error) {

                notify({
                    message: 'Wystąpił błąd podczas odświeżania',
                    status: 'error'
                })

                return
            }

            if (survey.answers.length === data.answers.length) {

                notify({
                    message: 'Brak nowych odpowiedzi',
                    status: 'info'
                })

                return
            }

            survey.answers = data.answers

            setSurvey({ ...survey })

            notify({
                message: 'Pomyślnie odświeżono odpowiedzi',
                status: 'success'
            })

        } finally {
            setLoading(false)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, survey])

    return (
        <div className={styles.options}>
            <PrimaryButton
                onClick={handleRefresh}
                loading={loading}
                type="button"
            >
                <BiRefresh />
                <span>Odśwież</span>
            </PrimaryButton>
        </div>
    )
}

export default AnswersOptions