import styles from './survey.module.scss'

import SurveyLoading from './SurveyLoading'

import { useSurvey } from '@/hooks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const SurveyWrapper = ({ children }) => {
	const router = useRouter()
	const { survey } = useSurvey()

	useEffect(() => {
		if (!survey) return

		if (!Object.keys(survey).length) router.push('/')

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [survey])

	if (!survey || !Object.keys(survey).length) return <SurveyLoading />

	return <div className={styles.wrapper}>{children}</div>
}

export default SurveyWrapper
