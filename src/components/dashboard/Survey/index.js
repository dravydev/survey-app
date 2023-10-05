import styles from './survey.module.scss'

import Bookmarks from './Bookmarks'

import Questions from './Questions'
import Answers from './Answers'

import { useSurvey } from '@/hooks'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState, useRef } from 'react'

const Survey = () => {

    const mountRef = useRef(false)
    const router = useRouter()
    const [bookmark, setBookmark] = useState('questions')
    const { survey, setSynchronization } = useSurvey()

    const bookmarks = useMemo(() => {
        return {
            questions: <Questions />,
            answers: <Answers />
        }
    }, [])

    useEffect(() => {

        if (!survey) return

        if (!Object.keys(survey).length) router.push('/dashboard')

    }, [survey])

    useEffect(() => {

        if (!survey) return

        mountRef.current
            ? setSynchronization(false)
            : mountRef.current = true

    }, [survey, mountRef])

    if (!survey || !Object.keys(survey).length) return <h1>czekaj</h1>

    return (
        <div className={styles.root}>
            <Bookmarks
                bookmark={bookmark}
                setBookmark={setBookmark}
            />
            <div className={styles.rootBookmark}>
                {bookmarks[bookmark]}
            </div>
        </div>
    )
}

export default Survey