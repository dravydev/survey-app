import styles from './select.module.scss'

import { useCallback } from 'react'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

const SelectOptionsItem = ({ ...props }) => {

    const handleOption = useCallback(() => {
        props.setOption({
            value: props.value,
            text: props.text
        })

        props.handleClose()

        if (props.setStatus) props.setStatus(props.value)

    }, [props.status, props.value])

    return (
        <div
            onClick={handleOption}
            className={cn(styles.optionsItem, inter)}
        >
            {props.text}
        </div>
    )
}

export default SelectOptionsItem