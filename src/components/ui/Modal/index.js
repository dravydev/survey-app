import styles from './modal.module.scss'

import {
    BiX
} from 'react-icons/bi'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

import { useOutsideClick } from '@/hooks'
import { useCallback, useEffect, useRef } from 'react'

const Modal = ({ children, ...props }) => {

    const wrapperRef = useRef()

    const handleUnload = useCallback(() => {

        const wrapper = wrapperRef.current

        wrapper.classList.add(styles.rootWrapperUnload)

        wrapper.onanimationend = () => {
            wrapper.classList.remove(styles.rootWrapperUnload)
            props.setModal(false)
        }

    }, [wrapperRef])

    useOutsideClick(wrapperRef, handleUnload)

    useEffect(() => {

        document.body.classList.add('locked')

        return () => document.body.classList.remove('locked')

    }, [])

    return (
        <div className={styles.root}>
            <div
                ref={wrapperRef}
                className={styles.rootWrapper}
            >
                <div className={styles.rootHeading}>
                    <h3 className={cn(styles.rootHeadingTitle, inter)}>{props.title}</h3>
                    <button
                        onClick={handleUnload}
                        className={styles.rootHeadingClose}
                    >
                        <BiX />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal