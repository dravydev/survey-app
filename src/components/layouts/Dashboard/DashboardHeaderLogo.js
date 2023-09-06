import styles from './dashboard.module.scss'

import logo from '@/assets/images/logo.png'

import Image from 'next/image'

const DashboardHeaderLogo = () => {
    return (
        <div className={styles.headerLogo}>
            <Image
                src={logo}
                width={100}
                height={100}
                alt="logo"
            />
        </div>
    )
}

export default DashboardHeaderLogo