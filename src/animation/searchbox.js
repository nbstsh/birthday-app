import { getFilters, setFilters } from '../filters'

const selector = {
    month: {
        trigger: '#search-month-trigger',
        target: '',
        number: '.u-trigger[name="month"]'
    },
    monthBox: {
        trigger: '#search-month-box-trigger',
        target: '#search-month-box'
    },
    character: {
        trigger: '#search-character-trigger',
        target: ''
    },
    characterBox: {
        trigger: '#search-character-box-trigger',
        target: '#search-character-box',
        inputs: '#search-character-box .search__input'
    }
}

const toggleTrigger = (id) => {
    const trigger = document.querySelector(id);
    trigger.checked = !trigger.checked;
}

const toggleMonthTrigger = () => {
    toggleTrigger(selector.month.trigger)
}

const toggleCharacterTrigger = () => {
    toggleTrigger(selector.character.trigger)
}

const toggleMonthBoxTrigger = () => {
    toggleTrigger(selector.monthBox.trigger)
}

const toggleCharacterBoxTrigger = () => {
    toggleTrigger(selector.characterBox.trigger)
}

const showBox = (id) => {
    const box = document.querySelector(id)
    box.style.display = 'block'
}

const hideBox = (id) => {
    const box = document.querySelector(id)
    box.style.display = 'none'
}

const showMonthBox = () => {
    showBox(selector.monthBox.target)
}

const hideMonthBox = () => {
    hideBox(selector.monthBox.target)
}

const showCharacterBox = () => {
    showBox(selector.characterBox.target)
}

const hideCharacterBox = () => {
    hideBox(selector.characterBox.target)
}

const moveInMonthBox = () => {
    setTimeout(() => {
        toggleMonthBoxTrigger()
        toggleMonthTrigger()
    }, 100)
    showMonthBox()
}

const moveOutMonthBox = () => {
    setTimeout(() => {
        hideMonthBox()
        toggleMonthTrigger()
    }, 200)
    toggleMonthBoxTrigger()
}

const moveInCharacterBox = () => {
    setTimeout(() => {
        toggleCharacterBoxTrigger()
        toggleCharacterTrigger()
    }, 100)
    showCharacterBox()
}

const moveOutCharacterBox = () => {
    setTimeout(() => {
        hideCharacterBox()
        toggleCharacterTrigger()
    }, 200)
    toggleCharacterBoxTrigger()
}

const setCurrentMonth = () => {
    const currentMonth = getFilters().month
    document.querySelectorAll(selector.month.number).forEach((numEl) => {
        if (numEl.value === currentMonth) numEl.click()
    })
}

const resetCharacterBox = () => {
    const inputs = document.querySelectorAll(selector.characterBox.inputs)
    inputs.forEach((input) => {
        input.value = ''
    })
    setFilters({date: '', name: ''})
}


setCurrentMonth()
hideMonthBox()
hideCharacterBox()



export { moveInMonthBox, moveOutMonthBox, moveInCharacterBox, moveOutCharacterBox, setCurrentMonth, resetCharacterBox }