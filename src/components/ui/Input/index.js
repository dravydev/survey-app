import styles from './input.module.scss'

import { useCallback, useId } from 'react'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

const Input = ({ ...props }) => {

    const inputId = useId()

    const handleChange = useCallback(event => {

        const { parentNode, value } = event.target

        value.length
            ? parentNode.classList.add(styles.rootActive)
            : parentNode.classList.remove(styles.rootActive)

    }, [])

    return (
        <div className={cn(styles.root, props.className ? props.className : '')}>
            <label
                htmlFor={inputId}
                className={cn(styles.rootLabel, inter)}
            >
                {props.label}
            </label>
            <input
                id={inputId}
                name={props.name}
                defaultValue={props.defaultValue}
                minLength={props.minLength}
                min={props.min}
                maxLength={props.maxLength}
                max={props.max}
                type={props.type ?? 'text'}
                readOnly={props.readOnly}
                required={props.required}
                onChange={handleChange}
                className={cn(styles.rootInput, inter)}
            />
        </div>
    )
}

export default Input