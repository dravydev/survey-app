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
import generateHexId from '@/utils/generateHexId'
import inter from '@/assets/fonts/inter'

import { updateSurveyQuestions } from '@/actions/surveys'

import { useSurvey } from '@/hooks'
import { useCallback, useEffect, useState } from 'react'

const QuestionsOptions = () => {

    const [saved, setSaved] = useState(false)
    const [mount, setMount] = useState(false)
    const { survey, setSurvey, selectedId, setSelectedId } = useSurvey()

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

    }, [selectedId])

    const handleSave = useCallback(async () => {

        const { error, data } = await updateSurveyQuestions(
            { surveyId: survey._id },
            {
                questions: survey.questions.map(question => {
                    return {
                        title: question.title,
                        mode: question.mode,
                        isRequired: question.isRequired,
                        fields: question.fields.map(field => ({
                            type: field.type,
                            text: field.text
                        }))
                    }
                })
            }
        )

        console.log(error, data)

        setSaved(false)

    }, [survey])

    useEffect(() => {

        if (!mount) {
            setMount(true)
            return
        }

        setSaved(true)

    }, [survey])

    return (
        <div className={styles.options}>

            <h2 className={cn(styles.optionsTitle, inter)}>{survey.title}</h2>

            <SecondaryButton onClick={handleAddQuestion}>
                <CgMathPlus />
                <span>Pytanie</span>
            </SecondaryButton>

            <SecondaryButton>
                <CgEye />
                <span>Odwiedź</span>
            </SecondaryButton>

            <SecondaryButton>
                <CgShare />
                <span>Udostępnij</span>
            </SecondaryButton>

            <PrimaryButton
                onClick={handleSave}
                disabled={!saved}
            >
                <CgCheckO />
                <span>Zapisz</span>
            </PrimaryButton>

        </div>
    )
}

export default QuestionsOptions