
import { getCharacters, createCharacter, updateCharacters } from './character'
import { initializeIndexPage, setCharacterForm, resetCharacterForm } from './view'
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
    const id = e.target.dataset.characterId

    if (id) {
        updateCharacters({ id, name, birthday })
    } else {
        createCharacter({ name, birthday })
    }
    
    resetCharacterForm()
    initializeIndexPage(month)
})

// set edit form value
document.querySelectorAll('.display__character').forEach((element) => {
    element.addEventListener('click', (e) => {
        const characterId = e.target.dataset.characterId
        const characterFormEl = document.querySelector('#character-form')
        characterFormEl.dataset.characterId = characterId

        const character = getCharacters().find((character) => character.id === characterId)
        const birthday = character.birthday.split('/')
        const month = birthday[0]
        const date = birthday[1]
    
        setCharacterForm(character.name, month, date, 'edit')
    })
})


// filter month
document.querySelector('#filter-month').addEventListener('input', (e) => {
    initializeIndexPage(e.target.value)
})