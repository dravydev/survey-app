import styles from './dashboard.module.scss'

import DashboardHeaderLogo from './DashboardHeaderLogo'
import DashboardHeaderNav from './DashboardHeaderNav'
import DashboardHeaderUser from './DashboardHeaderUser'
import DashboardHeaderActions from './DashboardHeaderActions'

const DashboardHeader = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerWrapper}>
                <DashboardHeaderLogo />
                <DashboardHeaderNav />
                <DashboardHeaderUser />
                <DashboardHeaderActions />
            </div>
        </header>
    )
}

export default DashboardHeader