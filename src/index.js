
import { getCharacters, createCharacter, updateCharacters } from './character'
import { initializeIndexPage, setCharacterForm, resetCharacterForm } from './view'
import { generateDates, getFilteredDates } from './dates'
import { sortByBirthday } from './sort'
import { getFilters, setFilters } from './filters'
import { moveInMonthBox, moveOutMonthBox, moveInCharacterBox, moveOutCharacterBox, setCurrentMonth, resetCharacterBox } from './animation/searchbox'

import './character-form'
import './character-detail'

initializeIndexPage()


// filter month
// document.querySelector('#filter-month').addEventListener('input', (e) => {
//     setFilters({ month: e.target.value})
//     initializeIndexPage()
// })

// filter date
document.querySelector('#filter-date').addEventListener('input', (e) => {
    setFilters({ date: e.target.value })
    initializeIndexPage()
})

// filter name
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
    resetCharacterBox()
    if (e.target.checked) {
        moveInCharacterBox()
    } else {
        moveOutCharacterBox()
    }
    initializeIndexPage()
})

// search-month-box : month number clicked event
document.querySelectorAll('.search__box .u-trigger[name="month"]').forEach((numEl) => {
    numEl.addEventListener('click', (e) => {
        setFilters({ month: e.target.value })
        initializeIndexPage()
    })
})

// open modal
document.querySelectorAll('.open-modal').forEach((triggerEl) => {
    triggerEl.addEventListener('click', (e) => {
        const targetSelector = triggerEl.dataset.target
        if (!targetSelector) return 

        const modalEl = document.querySelector(targetSelector)
        if (!modalEl) return

        modalEl.dataset.status = 'open'
    })
})

// close modal
document.querySelectorAll('.close-modal').forEach((triggerEl) => {
    triggerEl.addEventListener('click', (e) => {
        const targetSelector = triggerEl.dataset.target
        if (!targetSelector) return 

        const modalEl = document.querySelector(targetSelector)
        if (!modalEl) return

        modalEl.dataset.status = 'close'
    })
})
