import styles from './textarea.module.scss'

import { useCallback, useEffect, useId, useRef } from 'react'

import TextareaAutosize from 'react-textarea-autosize'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

const Textarea = ({ ...props }) => {

    const textareaId = useId()
    const textareaRef = useRef()

    const handleChange = useCallback(() => {

        const { parentNode, value } = textareaRef.current

        value.length
            ? parentNode.classList.add(styles.rootActive)
            : parentNode.classList.remove(styles.rootActive)

        if (props.onChange) props.onChange(value)

    }, [textareaRef])

    useEffect(() => {

        const { parentNode, value } = textareaRef.current

        if (value.length) parentNode.classList.add(styles.rootActive)

    }, [textareaRef])

    return (
        <div className={cn(styles.root, props.className ? props.className : '')}>
            <label
                htmlFor={textareaId}
                className={cn(styles.rootLabel, inter)}
            >
                {props.label}
            </label>
            <TextareaAutosize
                ref={textareaRef}
                id={textareaId}
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
                spellCheck={false}
                className={cn(styles.rootTextarea, inter)}
            />
        </div>
    )
}

export default Textarea