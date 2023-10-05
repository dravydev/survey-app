import styles from './form.module.scss'

import Fields from './Fields'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'
import { useCallback, useRef } from 'react'

const FormItem = ({ ...props }) => {

    const itemRef = useRef()

    const handleDeleteError = useCallback(() => {

        itemRef.current.classList.remove(styles.itemError)

    }, [itemRef])

    return (
        <div
            ref={itemRef}
            data-id={props._id}
            data-mode={props.mode}
            data-required={props.isRequired}
            className={styles.item}
            onClick={handleDeleteError}
        >
            <span className={cn(styles.itemTitle, inter)}>{props.title}</span>
            <Fields
                name={props._id}
                mode={props.mode}
                fields={props.fields}
            />
        </div>
    )
}

export default FormItem