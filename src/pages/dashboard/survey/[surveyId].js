import Dashboard from '@/components/layouts/Dashboard'

import Heading from '@/components/dashboard/Heading'

import Survey from '@/components/dashboard/Survey'

import { Fragment } from 'react'

const DashboardSurvey = () => {
    return (
        <Fragment>

            <Heading title="Ankieta" />

            <Survey />

        </Fragment>
    )
}

DashboardSurvey.Layout = Dashboard
export default DashboardSurvey