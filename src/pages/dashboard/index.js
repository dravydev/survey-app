import Dashboard from '@/components/layouts/Dashboard'

import { useSession, signIn } from 'next-auth/react'
import { useEffect } from 'react'

const DashboardHome = () => {

    const { data, status } = useSession()

    useEffect(() => {
        console.log(data)
    }, [status])

    return (
        <>
            <button onClick={() => signIn('github')}>Zaloguj</button>
        </>
    )
}

DashboardHome.Layout = Dashboard
export default DashboardHome