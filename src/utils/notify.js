import toast from 'react-hot-toast'

import inter from '@/assets/fonts/inter'

const icons = {
	success: '✅',
	error: '❌',
	info: 'ℹ️'
}

const notify = (props) =>
	toast(props.message, {
		duration: 1000,
		position: 'top-center',
		style: {
			color: 'rgb(var(--primary))',
			fontWeight: '500',
			fontSize: '.95rem',
			backgroundColor: 'rgb(var(--background))'
		},
		className: inter,
		icon: icons[props.status]
	})

export default notify
