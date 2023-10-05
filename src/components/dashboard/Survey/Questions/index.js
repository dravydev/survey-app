import styles from './questions.module.scss'

import QuestionsOptions from './QuestionsOptions'
import QuestionsContainer from './QuestionsContainer'

const Questions = () => {
    return (
        <div className={styles.root}>
            <QuestionsOptions />
            <QuestionsContainer />
        </div>
    )
}

export default Questions