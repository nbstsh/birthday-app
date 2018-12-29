let characters = []

const getCharacters = () => characters

const saveCharacters = () => {
    localStorage.setItem('characters', JSON.stringify(characters))
}

const loadCharacters = () => {
    const jsonData = localStorage.getItem('characters')
    
    try {
        characters = jsonData ? JSON.parse(jsonData) : []
    } catch (e) {
        characters = []
    }
}

const resetCharacters = () => {
    characters = []
    saveCharacters()
}

loadCharacters()

export { saveCharacters, loadCharacters, getCharacters }