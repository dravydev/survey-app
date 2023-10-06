import SurveyLoading from '@/components/layouts/Survey/SurveyLoading'
import styles from './surveys.module.scss'

import SurveysItem from './SurveysItem'

import { useSurveys } from '@/hooks'
import Loader from '@/components/ui/Loader'

const Surveys = () => {
	const { surveys } = useSurveys()

	if (!surveys) return <Loader />

	return (
		<div className={styles.root}>
			{surveys?.map((survey) => (
				<SurveysItem key={survey._id} {...survey} />
			))}
		</div>
	)
}

export default Surveys
