import Dashboard from '@/components/layouts/Dashboard'

import Heading from '@/components/dashboard/Heading'

import { PrimaryButton } from '@/components/ui/Button'

import {
    BiPlus
} from 'react-icons/bi'

import { Fragment } from 'react'

const DashboardHome = () => {
    return (
        <Fragment>

            <Heading title="Twoje ankiety">
                <PrimaryButton>
                    <BiPlus />
                    <span>Utwórz ankietę</span>
                </PrimaryButton>
            </Heading>

        </Fragment>
    )
}

DashboardHome.Layout = Dashboard
export default DashboardHome