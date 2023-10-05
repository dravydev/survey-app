import styles from './input.module.scss'

import { useCallback, useEffect, useId, useRef } from 'react'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

const Input = ({ ...props }) => {

    const inputId = useId()
    const inputRef = useRef()

    const handleChange = useCallback(() => {

        const { parentNode, value } = inputRef.current

        value.length
            ? parentNode.classList.add(styles.rootActive)
            : parentNode.classList.remove(styles.rootActive)

        if (props.onChange) props.onChange(value)

    }, [inputRef])

    useEffect(() => {

        const { parentNode, value } = inputRef.current

        if (value.length) parentNode.classList.add(styles.rootActive)

    }, [inputRef])

    return (
        <div className={cn(styles.root, props.className ? props.className : '')}>
            <label
                htmlFor={inputId}
                className={cn(styles.rootLabel, inter)}
            >
                {props.label}
            </label>
            <input
                ref={inputRef}
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
                autoComplete={props.autoComplete}
            />
        </div>
    )
}

export default Input