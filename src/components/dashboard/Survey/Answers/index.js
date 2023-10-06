import styles from './answers.module.scss'

import AnswersOptions from './AnswersOptions'
import AnswersContainer from './AnswersContainer'

const Answers = () => {
	return (
		<div className={styles.root}>
			<AnswersOptions />
			<AnswersContainer />
		</div>
	)
}

export default Answers
