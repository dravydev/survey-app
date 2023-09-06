import styles from './dashboard.module.scss'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

import Image from 'next/image'
import { useSession } from 'next-auth/react'

const DashboardHeaderUser = () => {

    const { data } = useSession()

    return (
        <div className={styles.headerUser}>
            <div className={styles.headerUserImage}>
                <Image
                    width={100}
                    height={100}
                    alt={data.user.name}
                    src={data.user.image}
                />
            </div>
            <span className={cn(styles.headerUserName, inter)}>{data.user.name}</span>
        </div>
    )
}

export default DashboardHeaderUser