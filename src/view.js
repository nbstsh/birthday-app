import { getCharacters } from './character'
import { generateDates, getFilteredDates } from './dates'
import { sortByBirthday } from './sort'

 const classNames = {
    display: {
        container: 'display',
        header: 'display__header',
        body: 'display__body',
        dateBox: 'display__date-box',
        date: 'display__date',
        character: 'display__character'
    }
}


const generateDateBoxDOM = (date, characters) => {
    const dateBoxEl = document.createElement('div')
    dateBoxEl.classList.add(classNames.display.dateBox)

    // create date element
    const dateEl = document.createElement('div')
    dateEl.textContent = `${date}日`
    dateEl.classList.add(classNames.display.date)
    dateBoxEl.appendChild(dateEl)

    // create character name element
    characters.forEach((character) => {
        dateBoxEl.appendChild(generateCharacterEl(character))
    })

    return dateBoxEl
}

const generateCharacterEl = ({ id, name }) => {
    const characterEl = document.createElement('div')
    characterEl.textContent = name
    characterEl.classList.add(classNames.display.character)
    characterEl.dataset.characterId = id
    return characterEl
}


const generateHeaderDOM = (month) => {
    const headerEl = document.createElement('h2')
    headerEl.classList.add(classNames.display.header)
    headerEl.textContent = `${month}月` 
    return headerEl
}


const generateBodyDOM = (filteredDates) => {
    const bodyEl = document.createElement('div')
    bodyEl.classList.add(classNames.display.body)

    filteredDates.forEach(({date, characters}) => {
        bodyEl.appendChild(generateDateBoxDOM(date, characters))
    })

    return bodyEl
}
 

const renderDisplay = (month, filteredDates) => {
    const displayEl = document.querySelector('#display')

    const headerEl = generateHeaderDOM(month)
    displayEl.appendChild(headerEl)

    const bodyEl = generateBodyDOM(filteredDates)
    displayEl.appendChild(bodyEl)
}


const initializeIndexPage = (month) => {
    const characters = getCharacters()
    console.log(characters)

    const dates = generateDates(sortByBirthday(characters))
    const filteredDates = getFilteredDates(dates, { month })

    renderDisplay(month, filteredDates)
}

 export { generateDateBoxDOM, generateHeaderDOM, generateBodyDOM, renderDisplay, initializeIndexPage}