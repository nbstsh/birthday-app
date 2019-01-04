
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


 const generateDateBoxDOM = (date, name) => {
    const dateBoxEl = document.createElement('div')
    dateBoxEl.classList.add(classNames.display.dateBox)

    const dateEl = document.createElement('div')
    dateEl.textContent = date
    dateEl.classList.add(classNames.display.date)
    dateBoxEl.appendChild(dateEl)

    const characterEl = document.createElement('div')
    characterEl.textContent = name
    characterEl.classList.add(classNames.display.character)
    dateBoxEl.appendChild(characterEl)

    return dateBoxEl
 }

 export { generateDateBoxDOM }