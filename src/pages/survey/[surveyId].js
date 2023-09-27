import Survey from '@/components/layouts/Survey'

import Heading from '@/components/survey/Heading'
import Form from '@/components/survey/Form'

import { ReCaptchaProvider } from 'next-recaptcha-v3'

import Head from 'next/head'
import { useSurvey } from '@/hooks'

const SurveyHome = () => {

    const { survey } = useSurvey()

    return (
        <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA}>
            
            <Head>
                <title>Ankieta - {survey.title}</title>
            </Head>

            <Heading />

            <Form />

        </ReCaptchaProvider>
    )
}

SurveyHome.Layout = Survey
export default SurveyHome