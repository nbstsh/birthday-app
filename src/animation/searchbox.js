

const toggleTrigger = (id) => {
    const trigger = document.querySelector(id);
    trigger.checked = !trigger.checked;
}

const toggleMonthTrigger = () => {
    toggleTrigger('#search-month-trigger')
}

const toggleCharacterTrigger = () => {
    toggleTrigger('#search-character-trigger')
}


export { toggleMonthTrigger, toggleCharacterTrigger }