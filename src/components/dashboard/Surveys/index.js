import styles from './surveys.module.scss'

import SurveysItem from './SurveysItem'

import { useSurveys } from '@/hooks'

const Surveys = () => {

    const { surveys } = useSurveys()

    return (
        <div className={styles.root}>
            {surveys?.map(survey => <SurveysItem key={survey._id} {...survey} />)}
        </div>
    )
}

export default Surveys