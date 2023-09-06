import styles from './button.module.scss'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

const PrimaryButton = ({ children, ...props }) => {
    return (
        <button
            onClick={props.onClick}
            className={cn(styles.root, inter)}
        >
            {children}
        </button>
    )
}

export {
    PrimaryButton
}