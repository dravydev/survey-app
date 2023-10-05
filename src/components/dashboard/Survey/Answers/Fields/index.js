import cn from '@/utils/cn'
import styles from './fields.module.scss'

import FieldsGroup from './FieldsGroup'
import FieldsChart from './FieldsChart'

import inter from '@/assets/fonts/inter'

import { useMemo } from 'react'

const Fields = ({ ...props }) => {

    const modes = useMemo(() => {
        return {
            shortAnswer: FieldsGroup,
            longAnswer: FieldsGroup,
            singleChoice: FieldsChart,
            multipleChoice: FieldsChart
        }
    }, [])

    const Mode = modes[props.mode]

    return (
        <div className={styles.root}>
            {props.fields ? <Mode fields={props.fields} mode={props.mode} /> : <p className={cn(styles.rootEmpty, inter)}>Brak odpowiedzi</p>}
        </div>
    )
}

export default Fields