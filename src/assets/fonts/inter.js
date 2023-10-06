import { Inter } from 'next/font/google'

const inter = Inter({
	subsets: ['latin', 'latin-ext'],
	weight: ['400', '500', '600', '700'],
	preload: true,
	display: 'fallback'
})

export default inter.className
