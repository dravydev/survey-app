import SurveyContext from '@/contexts/SurveyContext'

import { useContext } from 'react'

const useSurvey = () => {
	const context = useContext(SurveyContext)

	return context
}

export default useSurvey
