import styles from './form.module.scss'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

const FormInfo = ({ ...props }) => {
    return (
        <div className={styles.info}>

            <div className={styles.infoIcon}>
                {props.icon}
            </div>

            <span className={cn(styles.infoTitle, inter)}>{props.text}</span>

        </div>
    )
}

export default FormInfo