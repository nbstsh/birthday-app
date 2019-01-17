
const setInputValue = (selector, inputValue) => {
    const el = document.querySelector(selector)
    el.value = inputValue
}


export { setInputValue }