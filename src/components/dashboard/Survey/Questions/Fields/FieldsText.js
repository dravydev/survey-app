import styles from './fields.module.scss'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

const FieldsText = ({ ...props }) => {
    return (
        <div className={cn(styles.text, inter)}>
            {props.text}
        </div>
    )
}

export default FieldsText