import styles from './dashboard.module.scss'

import { BiCog, BiGrid, BiGridAlt } from 'react-icons/bi'

import DashboardHeaderNavItem from './DashboardHeaderNavItem'

const DashboardHeaderNav = () => {
	return (
		<nav className={styles.headerNav}>
			<ul className={styles.headerNavList}>
				<DashboardHeaderNavItem
					href="/dashboard"
					icon={<BiGridAlt />}
					text="Ankiety"
					matchers={[
						{
							path: '/dashboard',
							exact: true
						},
						{
							path: '/dashboard/survey'
						}
					]}
				/>
				{/* <DashboardHeaderNavItem
                    href="/dashboard/settings"
                    icon={<BiCog />}
                    text="Ustawienia"
                    matchers={[
                        {
                            path: '/dashboard/settings'
                        }
                    ]}
                /> */}
			</ul>
		</nav>
	)
}

export default DashboardHeaderNav
