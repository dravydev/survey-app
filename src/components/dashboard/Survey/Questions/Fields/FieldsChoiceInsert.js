import styles from './fields.module.scss'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

const FieldsChoiceInsert = ({ ...props }) => {
    return (
        <div className={cn(styles.choiceInsert, inter)}>

            <button
                type="button"
                className={styles.choiceInsertButton}
            >
                Dodaj opcję
            </button>

            <span className={styles.choiceInsertText}>lub</span>

            <button
                type="button"
                className={styles.choiceInsertButton}
            >
                Dodaj opcję &ldquo;Inne&rdquo;
            </button>

        </div>
    )
}

export default FieldsChoiceInsert