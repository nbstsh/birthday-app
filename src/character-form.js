import { createCharacter, updateCharacters } from './character'
import { initializeIndexPage } from './view'
import { setFilters } from './filters'
import { setInputValue } from './utilities/form'


const selector = {
    nameInput: '#character-form-name',
    monthInput: '#character-form-month',
    dateInput: '#character-form-date',
    monthNumber: '.date-form__month-number',
    dateNumber: '.date-form__date-number',
    monthText: '#selected-month-text',
    dateText: '#selected-date-text',
    submitButton: '#character-form-submit',
    background: '#character-form-background'
}


// remove a class and add the class to target element
const moveClass = (targetEl, targetSelector, addedClassName) => {
    const clickedEl = document.querySelector(`${targetSelector}.${addedClassName}`)
    if (clickedEl){
        clickedEl.classList.remove(addedClassName)
    }

    targetEl.classList.add(addedClassName)
}

// render month number of date-form
const renderMonthNumber = (numEl) => {
    moveClass(numEl, selector.monthNumber, 'clicked')
    setInputValue(selector.monthInput, numEl.textContent)
}

// render date number of date-form
const renderDateNumber = (numEl) => {
    moveClass(numEl, selector.dateNumber, 'clicked')
    setInputValue(selector.dateInput, numEl.textContent)
}

const initDisplayText = (selector, text) => {
    document.querySelector(selector).textContent = text
}

// init month number in date form
const initMonthText = (number) => {
    initDisplayText(selector.monthText, `${number}月`)
}

// init date number in date form
const initDateText = (number) => {
    initDisplayText(selector.dateText, `${number}日`)
}

// set character form by given data
const setCharacterForm = (name, month, date, buttonText = 'create') => {
    document.querySelector(selector.nameInput).value = name
    document.querySelector(selector.monthInput).value = month
    document.querySelector(selector.dateInput).value = date
    document.querySelector(selector.submitButton).textContent = buttonText
}

// reset character form to default data
const resetCharacterForm = () => { setCharacterForm('', 1, 1) }

// set month and date of date form 
const setDateFormText = (monthNum, dateNum) => {
    initMonthText(monthNum)
    initDateText(dateNum)
}

// reset character form to default data
const resetDateForm = () => { 
    setDateFormText('1', '1')
    renderMonthNumber(document.querySelector(selector.monthNumber))
    renderDateNumber(document.querySelector(selector.dateNumber))
}

const closeCharacterForm = () => {
    document.querySelector(selector.background).click()
}

// date-form month number clicked event
document.querySelectorAll(selector.monthNumber).forEach((numEl) => {
    numEl.addEventListener('click', (e) => {
        renderMonthNumber(numEl)
        initMonthText(e.target.dataset.value)
    })
})

// date-form date number clicked event
document.querySelectorAll(selector.dateNumber).forEach((numEl) => {
    numEl.addEventListener('click', (e) => {
        renderDateNumber(numEl)
        initDateText(e.target.dataset.value)
    })
})

// date-form month-input event
document.querySelector(selector.monthInput).addEventListener('input', (e) => {
    const numEl = document.querySelector(`${selector.monthNumber}[data-value="${e.target.value}"]`)
    renderMonthNumber(numEl)
    initMonthText(e.target.value)
})

// date-form date-input event
document.querySelector(selector.dateInput).addEventListener('input', (e) => {
    const numEl = document.querySelector(`${selector.dateNumber}[data-value="${e.target.value}"]`)
    renderDateNumber(numEl)
    initDateText(e.target.value)
})


// create character
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
    resetDateForm()
    initializeIndexPage()
    closeCharacterForm()
})
