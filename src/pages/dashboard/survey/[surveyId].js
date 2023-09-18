import Dashboard from '@/components/layouts/Dashboard'

import Heading from '@/components/dashboard/Heading'

import Survey from '@/components/dashboard/Survey'

import SurveyProvider from '@/providers/SurveyProvider'

const DashboardSurvey = () => {
    return (
        <SurveyProvider>

            <Heading title="Ankieta" />

            <Survey />

        </SurveyProvider>
    )
}

DashboardSurvey.Layout = Dashboard
export default DashboardSurvey