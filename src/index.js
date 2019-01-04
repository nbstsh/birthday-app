
import { getCharacters, createCharacter } from './character'
import { renderDisplay } from './view'
import { generateDates, getFilteredDates } from './dates'
import { sortByBirthday } from './sort'


document.querySelector('#character-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const elements = e.target.elements
    const name = elements.characterName.value
    const birthday = `${elements.month.value}/${elements.date.value}`

    createCharacter({ name, birthday })    
})
