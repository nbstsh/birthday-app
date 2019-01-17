import { setInputValue } from './utilities/form'


const selector = {
    monthInput: '#character-form-month',
    dateInput: '#character-form-date',
    monthNumber: '.date-form__month-number',
    dateNumber: '.date-form__date-number'
}


// add event to take class from existing element and add class to new element
const addMoveClassEvent = (el, targetSelector, addedClassName, callback) => {
    el.addEventListener('click', (e) => {
        const clickedEl = document.querySelector(`${targetSelector}.${addedClassName}`)
        if (clickedEl){
            clickedEl.classList.remove(addedClassName)
        }

        e.target.classList.add(addedClassName)
        callback()
    })
}

// remove a class and add the class to target element
const moveClass = (targetEl, targetSelector, addedClassName) => {
    const clickedEl = document.querySelector(`${targetSelector}.${addedClassName}`)
    if (clickedEl){
        clickedEl.classList.remove(addedClassName)
    }

    targetEl.classList.add(addedClassName)
}

const renderMonthNumber = (numEl) => {
    moveClass(numEl, selector.monthNumber, 'clicked')
    setInputValue(selector.monthInput, numEl.textContent)
}

const renderDateNumber = (numEl) => {
    moveClass(numEl, selector.dateNumber, 'clicked')
    setInputValue(selector.dateInput, numEl.textContent)
}


// date-form month number clicked event
document.querySelectorAll(selector.monthNumber).forEach((numEl) => {
    numEl.addEventListener('click', (e) => {
        renderMonthNumber(numEl)
    })
})

// date-form date number clicked event
document.querySelectorAll(selector.dateNumber).forEach((numEl) => {
    numEl.addEventListener('click', (e) => {
        renderDateNumber(numEl)
    })
})

// date-form month-input event
document.querySelector(selector.monthInput).addEventListener('input', (e) => {
    const numEl = document.querySelector(`${selector.monthNumber}[data-value="${e.target.value}"]`)
    renderMonthNumber(numEl)
})

// date-form date-input event
document.querySelector(selector.dateInput).addEventListener('input', (e) => {
    const numEl = document.querySelector(`${selector.dateNumber}[data-value="${e.target.value}"]`)
    renderDateNumber(numEl)
})

