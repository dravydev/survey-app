import styles from './dashboard.module.scss'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

const DashboardHeaderNavItem = ({ ...props }) => {

    const router = useRouter()

    const isActive = useMemo(() => {

        const isPathMatched = props.matchers.some(matcher =>
            matcher.exact
                ? matcher.path === router.asPath
                : router.asPath.startsWith(matcher.path)
        )

        return isPathMatched ? styles.headerNavListItemActive : ''

    }, [router, props.matchers])

    return (
        <li className={cn(styles.headerNavListItem, isActive, inter)}>
            <Link href={props.href}>{props.text}</Link>
        </li>
    )
}

export default DashboardHeaderNavItem