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

import { useSurvey } from '@/hooks'
import { useCallback } from 'react'

const QuestionsOptions = () => {

    const { survey, setSurvey, selectedId, setSelectedId } = useSurvey()

    const handleAddQuestion = useCallback(() => {

        const surveyId = generateHexId(24)
        
        const selectedIndex = survey.questions.findIndex(question => question._id === selectedId)

        survey.questions.splice(selectedIndex + 1, 0, {
            _id: surveyId,
            isDescription: false,
            isRequired: true,
            mode: 'shortAnswer',
            title: 'Przykładowe pytanie'
        })

        setSurvey({ ...survey })
        setSelectedId(surveyId)

    }, [selectedId])

    const handleSave = useCallback(() => {

        console.log(survey)

    }, [])

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

            <PrimaryButton onClick={handleSave}>
                <CgCheckO />
                <span>Zapisz</span>
            </PrimaryButton>

        </div>
    )
}

export default QuestionsOptions