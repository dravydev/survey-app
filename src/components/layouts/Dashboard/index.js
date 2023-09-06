import DashboardLoading from './DashboardLoading'
import DashboardAuthorize from './DashboardAuthorize'
import DashboardHeader from './DashboardHeader'
import DashboardMain from './DashboardMain'

import { useSession } from 'next-auth/react'
import { Fragment } from 'react'

const Dashboard = ({ children }) => {

    const { status } = useSession()

    if (status == 'loading') return <DashboardLoading />

    if (status == 'unauthenticated') return <DashboardAuthorize />

    return (
        <Fragment>
            <DashboardHeader />
            <DashboardMain>
                {children}
            </DashboardMain>
        </Fragment>
    )
}

export default Dashboard