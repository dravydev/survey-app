import styles from './dashboard.module.scss'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

import { BiLogoGithub } from 'react-icons/bi'

import { PrimaryButton } from '@/components/ui/Button'

import { signIn } from 'next-auth/react'

const DashboardAuthorize = () => {
	return (
		<div className={styles.authorize}>
			<h1 className={cn(styles.authorizeTitle, inter)}>Zaloguj się</h1>
			<p className={cn(styles.authorizeDescription, inter)}>
				Aby uzyskać dostęp do aplikacji, zaloguj się.
			</p>

			<PrimaryButton onClick={() => signIn('github')}>
				<BiLogoGithub />
				<span>Kontynuuj z GitHub</span>
			</PrimaryButton>
		</div>
	)
}

export default DashboardAuthorize
