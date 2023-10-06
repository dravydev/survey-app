import styles from './theme.module.scss'

import { BiMoon, BiSun } from 'react-icons/bi'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const Theme = () => {
	const { theme, setTheme } = useTheme()
	const [mount, setMount] = useState(false)

	useEffect(() => {
		if (!mount) setMount(true)
	}, [mount])

	if (mount)
		return (
			<div
				onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				className={styles.root}
			>
				{theme === 'dark' ? <BiMoon /> : <BiSun />}
			</div>
		)
}

export default Theme
