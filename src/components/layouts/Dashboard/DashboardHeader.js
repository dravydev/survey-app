import styles from './dashboard.module.scss'

import DashboardHeaderLogo from './DashboardHeaderLogo'
import DashboardHeaderUser from './DashboardHeaderUser'
import DashboardHeaderActions from './DashboardHeaderActions'

const DashboardHeader = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerWrapper}>
                <DashboardHeaderLogo />
                <DashboardHeaderUser />
                <DashboardHeaderActions />
            </div>
        </header>
    )
}

export default DashboardHeader