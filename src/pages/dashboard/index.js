import Dashboard from '@/components/layouts/Dashboard'

import Heading from '@/components/dashboard/Heading'

import Surveys from '@/components/dashboard/Surveys'
import CreateSurveyModal from '@/components/dashboard/CreateSurveyModal'

import { PrimaryButton } from '@/components/ui/Button'

import {
    BiPlus
} from 'react-icons/bi'

import { Fragment, useState } from 'react'

const DashboardHome = () => {

    const [modal, setModal] = useState(false)

    return (
        <Fragment>

            {modal && <CreateSurveyModal setModal={setModal} />}

            <Heading title="Ankiety">
                <PrimaryButton onClick={() => setModal(true)}>
                    <BiPlus />
                    <span>Utwórz ankietę</span>
                </PrimaryButton>
            </Heading>

            <Surveys />

        </Fragment>
    )
}

DashboardHome.Layout = Dashboard
export default DashboardHome