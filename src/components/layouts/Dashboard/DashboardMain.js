import styles from './dashboard.module.scss'

const DashboardMain = ({ children }) => {
    return (
        <main className={styles.main}>
            <div className={styles.mainWrapper}>
                {children}
            </div>
        </main>
    )
}

export default DashboardMain