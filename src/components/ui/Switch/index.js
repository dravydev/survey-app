import styles from './switch.module.scss'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

import { useState } from 'react'

const Switch = ({ ...props }) => {

    const [status, setStatus] = useState(props.status)

    const handleSwitch = () => {
        setStatus(!status)
        if (props.onSwitch) props.onSwitch(!status)
    }

    const isActive = status ? styles.rootActive : ''

    return (
        <div
            onClick={handleSwitch}
            className={cn(styles.root, isActive)}
        >
            <label className={cn(styles.rootLabel, inter)}>
                {props.label}
            </label>
            <div className={styles.rootStatus} />
            <input
                value={status ? 'on' : 'off'}
                type="hidden"
                name={props.name}
            />
        </div>
    )
}

export default Switch