import styles from './select.module.scss'

import SelectOptions from './SelectOptions'

import { useId, useState } from 'react'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

const Select = ({ ...props }) => {

    const selectId = useId()

    const [option, setOption] = useState(props.options.at(props.index || 0))
    const [options, setOptions] = useState(false)

    const isActive = options ? styles.rootActive : ''

    return (
        <div
            onClick={() => setOptions(true)}
            className={cn(styles.root, isActive, props.className ? props.className : '')}
        >
            <label
                htmlFor={selectId}
                className={cn(styles.rootLabel, inter)}
            >
                {props.label}
            </label>
            <input
                id={selectId}
                className={cn(styles.rootInput, inter)}
                value={option.text}
                readOnly
            />
            <input
                type="hidden"
                name={props.name}
                value={option.value}
            />
            {options && <SelectOptions
                setOptions={setOptions}
                setOption={setOption}
                options={props.options}
                onSelect={props.onSelect}
            />}
        </div>
    )
}

export default Select