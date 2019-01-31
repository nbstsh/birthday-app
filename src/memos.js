import uuidv4 from 'uuidv4'
import { getCharacters, saveCharacters } from './character'

const createMemo = (characterId, text) => {
    const character = getCharacters().find((character) => character.id === characterId)
    if (!character) return 

    const id = uuidv4()
    character.memos.push({
        id,
        text
    })
    saveCharacters()
}

const updateMemo = (characterId, { id, text }) => {
    const character = getCharacters().find((character) => character.id === characterId)
    if (!character) return 

    const memo = character.memos.find((memo) => memo.id === id)
    if (!memo) return 

    if (typeof text === 'string')
        memo.text = text

    saveCharacters()
}

const removeMemo = (characterId, memoId) => {
    const character = getCharacters().find((character) => character.id === characterId)
    if (!character) return 

    const index = character.memos.findIndex((memo) => memo.id === memoId)

    if (index > -1) {
        character.memos.splice(index, 1)
        saveCharacters()
    }
}

const findMemos = (characterId) => {
    return getCharacters().find((character) => character.id === characterId).memos
}

export { createMemo, updateMemo, removeMemo, findMemos }
