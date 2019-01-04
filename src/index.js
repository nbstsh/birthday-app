
import { getCharacters, createCharacter } from './character'
import { initializeIndexPage } from './view'
import { generateDates, getFilteredDates } from './dates'
import { sortByBirthday } from './sort'


const initialMonth = '1'
initializeIndexPage(initialMonth)


document.querySelector('#character-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const elements = e.target.elements
    const name = elements.characterName.value
    const month = elements.month.value
    const date = elements.date.value

    if (name === '' || month === '' || date === '') return 

    const birthday = `${month}/${date}`
    const characterId = e.target.dataset.characterId

    console.log(characterId)

    createCharacter({ name, birthday })
    initializeIndexPage(month)
})


document.querySelectorAll('.display__character').forEach((element) => {
    element.addEventListener('click', (e) => {
        const characterId = e.target.dataset.characterId
        const characterFormEl = document.querySelector('#character-form')
        characterFormEl.dataset.characterId = characterId

        const character = getCharacters().find((character) => character.id === characterId)
        const birthday = character.birthday.split('/')
        const month = birthday[0]
        const date = birthday[1]
        characterFormEl.children.characterName.value = character.name
        characterFormEl.children.month.value = month
        characterFormEl.children.date.value = date
    
    })
})