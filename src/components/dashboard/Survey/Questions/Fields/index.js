import styles from './fields.module.scss'

import FieldsChoice from './FieldsChoice'

import { useMemo } from 'react'

const Fields = ({ ...props }) => {

    const modes = useMemo(() => {
        return {
            shortAnswer: 'Pole krótkiej odpowiedzi',
            longAnswer: 'Pole długiej odpowiedzi',
            singleChoice: 'Pole jednokrotnego wyboru',
            multipleChoice: 'Pole wielokrotnego wyboru'
        }
    }, [])

    return (
        <div className={styles.root}>
            <FieldsChoice
                mode={props.mode}
                text={modes[props.mode]}
                fields={props.fields}
            />
        </div>
    )
}

export default Fields