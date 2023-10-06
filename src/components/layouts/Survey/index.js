import SurveyProvider from '@/providers/SurveyProvider'

import Theme from '@/components/Theme'

import SurveyWrapper from './SurveyWrapper'

import Head from 'next/head'
import { Fragment } from 'react'

const Survey = ({ children }) => {
	return (
		<Fragment>
			<Head>
				<title>Ankieta</title>
			</Head>

			<SurveyProvider>
				<SurveyWrapper>{children}</SurveyWrapper>
			</SurveyProvider>

			<Theme />
		</Fragment>
	)
}

export default Survey
