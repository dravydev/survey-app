import styles from './surveys.module.scss'

import { BiCalendar, BiLinkExternal } from 'react-icons/bi'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

import { SecondaryButton } from '@/components/ui/Button'

import { useRouter } from 'next/router'

const SurveysItem = ({ ...props }) => {
	const router = useRouter()

	return (
		<div className={styles.item}>
			<h2 className={cn(styles.itemTitle, inter)}>{props.title}</h2>
			<p className={cn(styles.itemDescription, inter)}>{props.description}</p>

			<div className={styles.itemFooter}>
				<div className={styles.itemFooterDate}>
					<BiCalendar />
					<span className={inter}>
						{new Date(props.createdAt).toLocaleString()}
					</span>
				</div>

				<SecondaryButton
					onClick={() => router.push(`/dashboard/survey/${props._id}`)}
				>
					<BiLinkExternal />
					<span>Przejdź do ankiety</span>
				</SecondaryButton>
			</div>
		</div>
	)
}

export default SurveysItem
