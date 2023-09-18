const generateHexId = n => [...Array(n)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')

export default generateHexId