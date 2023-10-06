import styles from './selector.module.scss'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

const Selector = ({ ...props }) => {
	if (!['radio', 'checkbox'].includes(props.type))
		throw new Error('radio/checkbox')

	return (
		<label className={styles.root}>
			<input
				type={props.type}
				className={styles.rootInput}
				name={props.name}
				value={props.value}
			/>
			<span className={styles.rootCheckmark} />
			<span className={cn(styles.rootText, inter)}>{props.text}</span>
		</label>
	)
}

export default Selector
