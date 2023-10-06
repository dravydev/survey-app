import DashboardLoading from './DashboardLoading'
import DashboardAuthorize from './DashboardAuthorize'
import DashboardHeader from './DashboardHeader'
import DashboardMain from './DashboardMain'

import SurveysProvider from '@/providers/SurveysProvider'

import { useSession } from 'next-auth/react'

const Dashboard = ({ children }) => {
	const { status } = useSession()

	if (status == 'loading') return <DashboardLoading />

	if (status == 'unauthenticated') return <DashboardAuthorize />

	return (
		<SurveysProvider>
			<DashboardHeader />
			<DashboardMain>{children}</DashboardMain>
		</SurveysProvider>
	)
}

export default Dashboard
