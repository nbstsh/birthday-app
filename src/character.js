import uuidv4 from 'uuidv4'
import moment from 'moment'

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

const createCharacter = ({ birthday, name, memos = [] }) => {
    const id = uuidv4()
    characters.push({
        id,
        birthday,
        name,
        memos,
        createdAt: moment().valueOf(),
        updatedAt: moment().valueOf()
    })
    saveCharacters()

    return id
}

const updateCharacters = ({ id, birthday, name }) => {
    const character = characters.find((character) => character.id === id)
    if (!character) return 

    if (typeof birthday === 'string')
        character.birthday = birthday

    if (typeof name === 'string')
        character.name = name
    
    saveCharacters()
}

const removeCharacter = (id) => {
    const index = characters.findIndex((character) => character.id === id)
    
    if (index > -1) {
        characters.splice(index, 1)
        saveCharacters()
    }
}

const getFilteredCharacters = ({ name }) => {
    return characters.filter((character) => character.name.includes(name))
}


loadCharacters()

export { saveCharacters, loadCharacters, getCharacters, createCharacter, updateCharacters, removeCharacter, getFilteredCharacters }
