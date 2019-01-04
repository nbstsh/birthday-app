
/*
div.display
	h2.display__header
	div.display__body
		div.display__date-box
			div.display__date
			div.display__character 
  
 */

 const classNames = {
    display: {
        container: 'display',
        header: 'display__header',
        body: 'display__body',
        dateBox: 'display__date-box',
        date: 'display__date',
        character: 'display__character'
    }
}


const generateDateBoxDOM = (date, names) => {
    const dateBoxEl = document.createElement('div')
    dateBoxEl.classList.add(classNames.display.dateBox)

    // create date element
    const dateEl = document.createElement('div')
    dateEl.textContent = `${date}日`
    dateEl.classList.add(classNames.display.date)
    dateBoxEl.appendChild(dateEl)

    // create character name element
    names.forEach((name) => {
        dateBoxEl.appendChild(generateCharacterEl(name))
    })

    return dateBoxEl
}

const generateCharacterEl = (name) => {
    const characterEl = document.createElement('div')
    characterEl.textContent = name
    characterEl.classList.add(classNames.display.character)
    return characterEl
}


const generateHeaderDOM = (month) => {
    const headerEl = document.createElement('h2')
    headerEl.classList.add(classNames.display.header)
    headerEl.textContent = `${month}月` 
    return headerEl
}


const generateBodyDOM = (filteredDates) => {
    const bodyEl = document.createElement('div')
    bodyEl.classList.add(classNames.display.body)

    filteredDates.forEach(({date, characters}) => {
        const names = characters.map((character) => character.name)
        bodyEl.appendChild(generateDateBoxDOM(date, names))
    })

    return bodyEl
}
 

const renderDisplay = (month, filteredDates) => {
    const displayEl = document.querySelector('#display')

    const headerEl = generateHeaderDOM(month)
    displayEl.appendChild(headerEl)

    const bodyEl = generateBodyDOM(filteredDates)
    displayEl.appendChild(bodyEl)
}

 export { generateDateBoxDOM, generateHeaderDOM, generateBodyDOM, renderDisplay}