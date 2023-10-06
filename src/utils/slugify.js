const chars = [
	['ą', 'a'],
	['ć', 'c'],
	['ę', 'e'],
	['ł', 'l'],
	['ń', 'n'],
	['ó', 'o'],
	['ś', 's'],
	['ź', 'z'],
	['ż', 'z']
]

const slugify = (text) => {
	for (const char of chars) {
		const [from, to] = char
		text = text.replaceAll(from, to)
	}

	text = text
		.replaceAll('_', '')
		.replace(/[^\w\s]/g, '')
		.trim()
		.replaceAll(' ', '-')
		.toLowerCase()

	return text
}

export default slugify
