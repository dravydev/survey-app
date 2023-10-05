import cn from '@/utils/cn'
import styles from './fields.module.scss'

import FieldsGroup from './FieldsGroup'
import FieldsPieChart from './FieldsPieChart'

import inter from '@/assets/fonts/inter'

import { useMemo } from 'react'

const Fields = ({ ...props }) => {

    const modes = useMemo(() => {
        return {
            shortAnswer: FieldsGroup,
            longAnswer: FieldsGroup,
            singleChoice: FieldsPieChart,
            multipleChoice: FieldsGroup
        }
    }, [])

    const Mode = modes[props.mode]

    return (
        <div className={styles.root}>
            {props.fields ? <Mode fields={props.fields} /> : <p className={cn(styles.rootEmpty, inter)}>Brak odpowiedzi</p>}
        </div>
    )
}

export default Fields