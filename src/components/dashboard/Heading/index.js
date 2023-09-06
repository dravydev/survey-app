import styles from './heading.module.scss'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

const Heading = ({ children, ...props }) => {
    return (
        <div className={styles.root}>
            <h1 className={cn(styles.rootTitle, inter)}>{props.title}</h1>
            {children}
        </div>
    )
}

export default Heading