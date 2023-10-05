import styles from './welcome.module.scss'

import {
    PrimaryButton
} from '@/components/ui/Button'

import {
    BiChevronRight
} from 'react-icons/bi'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'
import { useCallback } from 'react'
import { useRouter } from 'next/router'

const Welcome = () => {

    const router = useRouter()

    return (
        <div className={styles.root}>
            <h1 className={cn(styles.rootTitle, inter)}>Kreator ankiet</h1>
            <PrimaryButton onClick={() => router.push('/dashboard')}>
                <BiChevronRight />
                <span>Wypróbuj</span>
            </PrimaryButton>
        </div>
    )
}

export default Welcome