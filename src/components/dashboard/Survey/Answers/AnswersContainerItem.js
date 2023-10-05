import styles from './answers.module.scss'

import Fields from './Fields'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

const AnswersContainerItem = ({ ...props }) => {
    return (
        <div className={styles.containerItem}>
            <span className={cn(styles.containerItemTitle, inter)}>{props.title}</span>
            <Fields fields={props.answers} mode={props.mode} />
        </div>
    )
}

export default AnswersContainerItem