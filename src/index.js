
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
    createCharacter({ name, birthday })
    initializeIndexPage(month)
})
