import styles from './fields.module.scss'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

const FieldsGroupItem = ({ text }) => {
	return <div className={cn(styles.groupItem, inter)}>{text}</div>
}

export default FieldsGroupItem
