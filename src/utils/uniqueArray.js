const uniqueArray = (array, key) => [
	...new Map(array.map((item) => [item[key], item])).values()
]

export default uniqueArray
