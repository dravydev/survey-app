import styles from './tooltip.module.scss'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

import { useMemo, useState } from 'react'

const Tooltip = ({ children, ...props }) => {
	const [tooltipVisible, setTooltipVisible] = useState(false)

	const directions = useMemo(() => {
		return {
			top: styles.rootTooltipTop,
			bottom: styles.rootTooltipBottom,
			left: styles.rootTooltipLeft,
			right: styles.rootTooltipRight
		}
	}, [])

	return (
		<div
			className={styles.root}
			onMouseEnter={() => setTooltipVisible(true)}
			onMouseLeave={() => setTooltipVisible(false)}
		>
			{children}
			{tooltipVisible && (
				<div
					className={cn(
						styles.rootTooltip,
						directions[props.direction ?? 'bottom'],
						inter
					)}
				>
					{props.text}
				</div>
			)}
		</div>
	)
}

export default Tooltip
