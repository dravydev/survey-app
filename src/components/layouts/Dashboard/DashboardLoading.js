import styles from './dashboard.module.scss'

import { BiLoaderAlt } from 'react-icons/bi'

const DashboardLoading = () => {
	return (
		<div className={styles.loading}>
			<BiLoaderAlt />
		</div>
	)
}

export default DashboardLoading
