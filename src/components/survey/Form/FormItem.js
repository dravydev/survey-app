import styles from './form.module.scss'

import Fields from './Fields'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'
import { useCallback } from 'react'

const FormItem = ({ ...props }) => {

    const handleDeleteError = useCallback(() => {

        props.questionRef.current.classList.remove(styles.itemError)

    }, [])

    return (
        <div
            ref={props.questionRef}
            data-id={props._id}
            data-mode={props.mode}
            data-required={props.isRequired}
            className={styles.item}
            onClick={handleDeleteError}
        >
            <span className={cn(styles.itemQuestion, inter)}>{props.title}</span>
            <Fields
                name={props._id}
                mode={props.mode}
                fields={props.fields}
            />
        </div>
    )
}

export default FormItem