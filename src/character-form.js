import { createCharacter, updateCharacters, getCharacters } from './character'
import { initializeIndexPage } from './view'
import { setFilters } from './filters'
import { setInputValue } from './utilities/form'


const selector = {
    form: '#character-form',
    formHeader: '#chracter-form-header',
    nameInput: '#character-form-name',
    monthInput: '#character-form-month',
    dateInput: '#character-form-date',
    monthNumber: '.date-form__month-number',
    dateNumber: '.date-form__date-number',
    monthText: '#selected-month-text',
    dateText: '#selected-date-text',
    submitButton: '#character-form-submit',
    formBackground: '#character-form-background',
    editButton: '#character-edit',
    detailBackground: '#character-detail-background',
    detailModal: '#detail-modal',
    formModal: '#character-modal',
    formModalOpen: '#character-form-open'
    
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
const setCharacterForm = (name, month, date, buttonText = 'create', headerText = 'Create New Character') => {
    document.querySelector(selector.nameInput).value = name
    document.querySelector(selector.monthInput).value = month
    document.querySelector(selector.dateInput).value = date
    document.querySelector(selector.submitButton).textContent = buttonText
    document.querySelector(selector.formHeader).textContent = headerText
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

const resetCharacterFormModal = () => {
    resetCharacterForm()
    resetDateForm()
}

const closeCharacterForm = () => {
    document.querySelector(selector.formBackground).click()
}

const openCharacterForm = () => {
    document.querySelector(selector.formModal).dataset.status = 'open'
}

const closeCharacterDetail = () => {
    document.querySelector(selector.detailBackground).click()
}

const findMonthNumEl = (month) => {
    return document.querySelector(`${selector.monthNumber}[data-value="${month}"]`)
}

const findDateNumEl = (month) => {
    return document.querySelector(`${selector.dateNumber}[data-value="${month}"]`)
}

const initCharacterId = (id) => {
    document.querySelector(selector.form).dataset.id = id
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
    const numEl = findMonthNumEl(e.tarfet.value)
    renderMonthNumber(numEl)
    initMonthText(e.target.value)
})

// date-form date-input event
document.querySelector(selector.dateInput).addEventListener('input', (e) => {
    const numEl = findDateNumEl(e.targetEl.value)
    renderDateNumber(numEl)
    initDateText(e.target.value)
})

// create character
document.querySelector(selector.form).addEventListener('submit', (e) => {
    e.preventDefault()
    const elements = e.target.elements
    const name = elements.characterName.value
    const month = elements.month.value
    const date = elements.date.value

    if (name === '' || month === '' || date === '') return 

    const birthday = `${month}/${date}`
    const id = e.target.dataset.id

    if (id) {
        updateCharacters({ id, name, birthday })
    } else {
        createCharacter({ name, birthday })
    }
    
    setFilters({ month })
    resetCharacterFormModal()
    initializeIndexPage()
    closeCharacterForm()
})


// open edit form 
document.querySelector(selector.editButton).addEventListener('click', (e) => {
    // get id and close detail modal
    const id = document.querySelector(selector.detailModal).dataset.id
    closeCharacterDetail();
    
    // set character from
    const character = getCharacters().find((character) => character.id === id)
    const birthday = character.birthday.split('/')
    const month = birthday[0]
    const date = birthday[1]
    const buttonText = 'edit'
    const headerText = 'Edit Character Information'
    setCharacterForm(character.name, month, date, buttonText, headerText)
    renderMonthNumber(findMonthNumEl(month))
    initMonthText(month)
    renderDateNumber(findDateNumEl(date))
    initDateText(date)
    initCharacterId(id)

    openCharacterForm()
})

// reset modal value when modal is opened
document.querySelector(selector.formModalOpen).addEventListener('click', (e) => {
    resetCharacterFormModal()
})