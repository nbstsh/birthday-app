import { setInputValue } from './utilities/form'


const selector = {
    monthInput: '#character-form-month',
    dateInput: '#character-form-date',
    monthNumber: '.date-form__month-number',
    dateNumber: '.date-form__date-number',
    monthText: '#selected-month-text',
    dateText: '#selected-date-text'
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

const initMonthText = (number) => {
    initDisplayText(selector.monthText, `${number}月`)
}

const initDateText = (number) => {
    initDisplayText(selector.dateText, `${number}日`)
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

