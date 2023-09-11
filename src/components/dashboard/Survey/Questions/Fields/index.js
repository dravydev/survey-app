import styles from './fields.module.scss'

import FieldsText from './FieldsText'

import { useMemo } from 'react'

const Fields = ({ ...props }) => {

    const modes = useMemo(() => {

        return {
            shortText: <FieldsText text="Pole na krótką odpowiedź" />,
            longText: <FieldsText text="Pole na długą odpowiedź" />
        }

    }, [])

    return (
        <div className={styles.root}>
            {modes[props.mode]}
        </div>
    )
}

export default Fields