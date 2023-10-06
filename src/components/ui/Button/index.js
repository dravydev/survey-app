import styles from './button.module.scss'

import { BiLoaderAlt } from 'react-icons/bi'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'
import { useEffect, useRef } from 'react'

const PrimaryButton = ({ children, ...props }) => {
	const buttonRef = useRef()
	const isLoading = props.loading ? styles.primaryLoading : ''

	useEffect(() => {
		buttonRef.current.style.minWidth = buttonRef.current.offsetWidth + 'px'
	}, [buttonRef])

	return (
		<button
			ref={buttonRef}
			onClick={props.onClick}
			type={props.type}
			onLoad={() => console.log('bracie')}
			disabled={props.disabled || props.loading}
			className={cn(styles.root, styles.primary, isLoading, inter)}
		>
			{props.loading ? <BiLoaderAlt /> : children}
		</button>
	)
}

const SecondaryButton = ({ children, ...props }) => {
	return (
		<button
			onClick={props.onClick}
			type={props.type}
			disabled={props.disabled}
			className={cn(styles.root, styles.secondary, inter)}
		>
			{children}
		</button>
	)
}

export { PrimaryButton, SecondaryButton }
