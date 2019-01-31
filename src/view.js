import { getCharacters, getFilteredCharacters } from './character'
import { initDates, getFilteredDates } from './dates'
import { sortByBirthday } from './sort'
import { getFilters } from './filters'

 const classNames = {
    display: {
        container: 'display',
        header: 'display__header',
        body: 'display__body',
        dateBox: 'display__date-box',
        date: 'display__date',
        nameList: 'display__name-list',
        nameItem: 'display__name-item'
    }
}

const idNames = {
    display: {
        container: 'display',
        body: 'display-body',
        footer: 'display-footer'
    },
    characterForm: {
        form: 'character-form',
        name: 'character-form-name',
        month: 'character-form-month',
        date: 'character-form-date',
        submit: 'character-form-submit'
    }
}


const generateDateBoxDOM = (date, characters) => {
    const dateBoxEl = document.createElement('div')
    dateBoxEl.classList.add(classNames.display.dateBox)
    dateBoxEl.innerHTML = ''

    // create date element
    const dateEl = document.createElement('div')
    dateEl.textContent = `${date}日`
    dateEl.classList.add(classNames.display.date)
    dateBoxEl.appendChild(dateEl)

    // create character name element
    const nameListEl = document.createElement('ul')
    nameListEl.classList.add(classNames.display.nameList)
    characters.forEach((character) => {
        nameListEl.appendChild(generateNameItemDOM(character))
    })
    dateBoxEl.append(nameListEl)

    return dateBoxEl
}

const generateNameItemDOM = ({ id, name }) => {
    const nameItem = document.createElement('li')
    nameItem.textContent = name
    nameItem.classList.add(classNames.display.nameItem)
    nameItem.dataset.characterId = id
    return nameItem
}


const generateHeaderDOM = (month) => {
    const headerEl = document.createElement('h2')
    headerEl.classList.add(classNames.display.header)
    headerEl.textContent = `${month}月` 
    return headerEl
}

const initializeHeaderDOM = (month) => {
    const headerMonthEl = document.querySelector('#header-month')
    headerMonthEl.textContent = `${month}月` 
}


const generateBodyDOM = (filteredDates) => {
    const bodyEl = document.createElement('div')
    bodyEl.classList.add(classNames.display.body)
    bodyEl.id = idNames.display.body

    filteredDates.forEach(({date, characters}) => {
        bodyEl.appendChild(generateDateBoxDOM(date, characters))
    })

    return bodyEl
}
 

const renderDisplay = (month, filteredDates) => {
    const displayEl = document.querySelector('#display')

    initializeHeaderDOM(month)

    let bodyEl = document.getElementById(idNames.display.body)
    if (bodyEl) bodyEl.remove()
    
    bodyEl = generateBodyDOM(filteredDates)
    // displayEl.appendChild(bodyEl)
    displayEl.insertBefore(bodyEl, document.getElementById(idNames.display.footer))
}


const initializeIndexPage = () => {
    const filters = getFilters()

    const filteredCharacters = getFilteredCharacters(filters)
    initDates(sortByBirthday(filteredCharacters), true)
    const filteredDates = getFilteredDates(filters)
    
    renderDisplay(filters.month, filteredDates)
}


 export { renderDisplay, initializeIndexPage }