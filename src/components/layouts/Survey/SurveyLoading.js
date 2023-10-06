import styles from './survey.module.scss'

import { BiLoaderAlt } from 'react-icons/bi'

const SurveyLoading = () => {
	return (
		<div className={styles.loading}>
			<BiLoaderAlt />
		</div>
	)
}

export default SurveyLoading
