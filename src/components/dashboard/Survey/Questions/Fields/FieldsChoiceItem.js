import styles from './fields.module.scss'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

const FieldsChoiceItem = ({ ...props }) => {
    return (
        <div className={styles.choiceItem}>
            <div className={cn(
                styles.choiceItemBullet,
                styles['choiceItemBullet' + (props.mode === 'singleChoice' ? 'Circle' : 'Square')]
            )} />
            <input
                name="x"
                defaultValue="test"
                className={cn(styles.choiceItemInput, inter)}
            />
        </div>
    )
}

export default FieldsChoiceItem