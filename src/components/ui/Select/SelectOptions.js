import styles from './select.module.scss'

import SelectOptionsItem from './SelectOptionsItem'

import { useOutsideClick } from '@/hooks'
import { useCallback, useRef } from 'react'

const SelectOptions = ({ ...props }) => {

    const optionsRef = useRef()

    const handleClose = useCallback(() => {

        const options = optionsRef.current

        if (!options) return

        options.classList.add(styles.optionsUnload)

        options.onanimationend = () => {
            options.classList.remove(styles.optionsUnload)
            props.setOptions(false)
        }
    }, [])

    useOutsideClick(optionsRef, handleClose)

    return (
        <div
            ref={optionsRef}
            className={styles.options}
        >
            {props.options.map(option => <SelectOptionsItem
                key={option.value}
                setOption={props.setOption}
                handleClose={handleClose}
                status={props.status}
                setStatus={props.setStatus}
                {...option}
            />
            )}
        </div>
    )
}

export default SelectOptions