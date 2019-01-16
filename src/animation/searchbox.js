import { getFilters } from '../filters'

const idNames = {
    month: {
        trigger: '#search-month-trigger',
        target: ''
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
        target: '#search-character-box'
    }
}

const toggleTrigger = (id) => {
    const trigger = document.querySelector(id);
    trigger.checked = !trigger.checked;
}

const toggleMonthTrigger = () => {
    toggleTrigger(idNames.month.trigger)
}

const toggleCharacterTrigger = () => {
    toggleTrigger(idNames.character.trigger)
}

const toggleMonthBoxTrigger = () => {
    toggleTrigger(idNames.monthBox.trigger)
}

const toggleCharacterBoxTrigger = () => {
    toggleTrigger(idNames.characterBox.trigger)
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
    showBox(idNames.monthBox.target)
}

const hideMonthBox = () => {
    hideBox(idNames.monthBox.target)
}

const showCharacterBox = () => {
    showBox(idNames.characterBox.target)
}

const hideCharacterBox = () => {
    hideBox(idNames.characterBox.target)
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
    document.querySelectorAll('.u-trigger[name="month"]').forEach((numEl) => {
        if (numEl.value === currentMonth) numEl.click()
    })
}

const addMarginTop = () => {
    const displayBodyEl = document.querySelector('#displayBody')

    if (displayBodyEl) {
        console.log(displayBodyEl.style)
    } 
}

setCurrentMonth()
hideMonthBox()
hideCharacterBox()



export { moveInMonthBox, moveOutMonthBox, moveInCharacterBox, moveOutCharacterBox, setCurrentMonth }