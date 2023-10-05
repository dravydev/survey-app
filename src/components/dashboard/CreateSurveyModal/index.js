import styles from './createSurveyModal.module.scss'

import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import { PrimaryButton } from '@/components/ui/Button'

import { createSurvey } from '@/actions/surveys'

import { useSurveys } from '@/hooks'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

const CreateSurveyModal = ({ ...props }) => {

    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const { surveys, setSurveys } = useSurveys()

    const handleForm = useCallback(async event => {

        event.preventDefault()

        if (loading) return

        setLoading(true)

        const formData = new FormData(event.target)

        const { error, data } = await createSurvey(formData)

        if (error) {
            
            setLoading(false)

            return
        }

        if (surveys) setSurveys([
            ...surveys,
            data.survey
        ])

        router.push(`/dashboard/survey/${data.survey._id}`)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    return (
        <Modal
            title="Tworzenie ankiety"
            loading={loading}
            setModal={props.setModal}
        >

            <form
                autoComplete="off"
                onSubmit={handleForm}
                className={styles.root}
            >

                <Input
                    label="Tytuł ankiety"
                    name="title"
                    type="text"
                    minLength={3}
                    maxLength={32}
                    required
                />

                <Input
                    label="Opis ankiety"
                    name="description"
                    type="text"
                    minLength={3}
                    maxLength={256}
                    required
                />

                <PrimaryButton loading={loading}>
                    <span>Utwórz ankietę</span>
                </PrimaryButton>

            </form>

        </Modal>
    )
}

export default CreateSurveyModal