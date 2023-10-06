import cn from '@/utils/cn'
import styles from './bookmarks.module.scss'

import inter from '@/assets/fonts/inter'

const BookmarksItem = ({ ...props }) => {
	const isActive = props.bookmark == props.value ? styles.itemActive : ''

	return (
		<div
			onClick={() => props.setBookmark(props.value)}
			className={cn(styles.item, isActive)}
		>
			{props.icon}
			<span className={inter}>{props.text}</span>
		</div>
	)
}

export default BookmarksItem
