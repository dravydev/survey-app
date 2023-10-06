import SurveysContext from '@/contexts/SurveysContext'

import { useContext } from 'react'

const useSurveys = () => {
	const context = useContext(SurveysContext)

	return context
}

export default useSurveys
