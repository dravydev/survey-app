import styles from './fields.module.scss'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

const FieldsChoiceMode = ({ ...props }) => {
    return (
        <div className={styles.choiceMode}>
            <span className={cn(styles.choiceModeText, inter)}>{props.text}</span>
        </div>
    )
}

export default FieldsChoiceMode