export const capitalizeWord = (word: string) => word.charAt(0).toUpperCase() + word.slice(1)

export const generateRandomId = () => Date.now().toString(32)