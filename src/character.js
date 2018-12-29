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

const createCharacter = ({ birthday, name, memos }) => {
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

loadCharacters()

export { saveCharacters, loadCharacters, getCharacters }


