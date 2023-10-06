import Welcome from '@/components/home/Welcome'

import Head from 'next/head'
import { Fragment } from 'react'

const Home = () => {
	return (
		<Fragment>
			<Head>
				<title>Kreator ankiet</title>
			</Head>

			<Welcome />
		</Fragment>
	)
}

export default Home
