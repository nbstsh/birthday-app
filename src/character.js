let characters = []

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

const getCharacters = () => characters


loadCharacters()

export { saveCharacters, loadCharacters, getCharacters }