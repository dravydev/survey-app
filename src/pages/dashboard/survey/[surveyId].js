import Dashboard from '@/components/layouts/Dashboard'

import Heading from '@/components/dashboard/Heading'

import Survey from '@/components/dashboard/Survey'

import SurveyProvider from '@/providers/SurveyProvider'
import { Fragment } from 'react'
import Head from 'next/head'

const DashboardSurvey = () => {
    return (
        <Fragment>

            <Head>
                <title>Kreator ankiety</title>
            </Head>

            <SurveyProvider>

                <Heading title="Ankieta" />

                <Survey />

            </SurveyProvider>

        </Fragment>
    )
}

DashboardSurvey.Layout = Dashboard
export default DashboardSurvey