import styles from './dashboard.module.scss'

import {
    BiLogOut,
    BiMoon,
    BiSun
} from 'react-icons/bi'

import { signOut } from 'next-auth/react'

import { useTheme } from 'next-themes'

const DashboardHeaderActions = () => {

    const { theme, setTheme } = useTheme()

    return (
        <div className={styles.headerActions}>

            <button
                onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}
                className={styles.headerActionsItem}
            >
                {theme == 'dark' ? <BiMoon /> : <BiSun />}
            </button>

            <button
                onClick={() => signOut()}
                className={styles.headerActionsItem}
            >
                <BiLogOut />
            </button>

        </div>
    )
}

export default DashboardHeaderActions