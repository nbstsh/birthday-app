
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
    const birthday = `${elements.month.value}/${elements.date.value}`

    createCharacter({ name, birthday })    
})
