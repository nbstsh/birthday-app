
import { getCharacters, createCharacter, updateCharacters } from './character'
import { initializeIndexPage, setCharacterForm, resetCharacterForm } from './view'
import { generateDates, getFilteredDates } from './dates'
import { sortByBirthday } from './sort'
import { getFilters, setFilters } from './filters'
import { moveInMonthBox, moveOutMonthBox, moveInCharacterBox, moveOutCharacterBox, setCurrentMonth } from './animation/searchbox'


initializeIndexPage()


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
    
    setFilters({ month })
    resetCharacterForm()
    initializeIndexPage()
})

// set edit form value
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('display__character')) {
        const characterId = e.target.dataset.characterId
        const characterFormEl = document.querySelector('#character-form')
        characterFormEl.dataset.characterId = characterId

        const character = getCharacters().find((character) => character.id === characterId)
        const birthday = character.birthday.split('/')
        const month = birthday[0]
        const date = birthday[1]
    
        setCharacterForm(character.name, month, date, 'edit')
    }
})


document.addEventListener('click', (e) => {
    if (e.target.id === 'sample') {
        alert('cliked!')
    }
})
    

// filter month
document.querySelector('#filter-month').addEventListener('input', (e) => {
    setFilters({ month: e.target.value})
    initializeIndexPage()
})


document.querySelector('#filter-date').addEventListener('input', (e) => {
    setFilters({ date: e.target.value })
    initializeIndexPage()
})


document.querySelector('#filter-name').addEventListener('input', (e) => {
    setFilters({ name: e.target.value })
    initializeIndexPage()
})

// to previous month
document.querySelector('#previous-month').addEventListener('click', (e) => {
    const currentMonth = getFilters().month
    const previousMonth = currentMonth === '1' ? '12' : Number(currentMonth) - 1 + ''
    setFilters({ month: previousMonth })
    initializeIndexPage()

    // set search month box number
    setCurrentMonth()
})

// to next month
document.querySelector('#next-month').addEventListener('click', (e) => {
    const currentMonth = getFilters().month
    const nextMonth = currentMonth === '12' ? '1' : Number(currentMonth) + 1 + ''
    setFilters({ month: nextMonth })
    initializeIndexPage()

    // set search month box number
    setCurrentMonth()
})

//show/hide search-month-box
document.querySelector('#show-search-month').addEventListener('click', (e) => {
    if (e.target.checked) {
        moveInMonthBox()
        setCurrentMonth()
    } else {
        moveOutMonthBox()
    }
    
})

//show/hide search-character-box
document.querySelector('#show-search-character').addEventListener('click', (e) => {
    if (e.target.checked) {
        moveInCharacterBox()
    } else {
        moveOutCharacterBox()
    }
})

document.querySelectorAll('.u-trigger[name="month"]').forEach((numEl) => {
    numEl.addEventListener('click', (e) => {
        setFilters({ month: e.target.value })
        initializeIndexPage()
    })
})