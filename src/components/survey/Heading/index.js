import styles from './heading.module.scss'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

import { useSurvey } from '@/hooks'

const Heading = () => {
	const { survey } = useSurvey()

	return (
		<header className={styles.root}>
			<h1 className={cn(styles.rootTitle, inter)}>{survey.title}</h1>
			<p className={cn(styles.rootDescription, inter)}>{survey.description}</p>
		</header>
	)
}

export default Heading
