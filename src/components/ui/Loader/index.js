import styles from './loader.module.scss'

import { BiLoaderAlt } from 'react-icons/bi'

const Loader = () => {
	return (
		<div className={styles.root}>
			<BiLoaderAlt />
		</div>
	)
}

export default Loader
