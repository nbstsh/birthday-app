import { saveCharacters, loadCharacters, getCharacters, createCharacter } from './character'
import { createMemo, updateMemo, removeMemo } from './memos'
import { generateDates, getFilteredDates } from './dates'
import { sortByBirthday } from './sort'
import { generateDateBoxDOM, generateHeaderDOM, generateBodyDOM, renderDisplay} from './view'
import { format } from 'util';


const charas = getCharacters()
console.log(charas)


const seed = () => {
    const createSampleCharacter = (birthday, name) => {
        const newCharacter = { birthday, name}
        createCharacter(newCharacter)
    }
    
    for(let i = 0; i < 29; i++) {
        const month = 10
        const birthday = `${month}/${i + 1}`
        const name = `Mr.Decenber${i + 1}`
        createSampleCharacter(birthday, name)
    }    
}

// seed()



const sortedChars = sortByBirthday(charas)
console.log(sortedChars)


const dates = generateDates(sortedChars)
console.log(dates)


const month =  '10'

const filteredDates = getFilteredDates(dates, { month })
console.log(filteredDates)


renderDisplay(month, filteredDates)


console.log('========== rendering test ===========')


// const dateBoxEl = generateDateBoxDOM('11月', ['sample name', 'ahahahahha'])
// console.log(dateBoxEl)

// const displayHeader = generateHeaderDOM('sample month')
// console.log(displayHeader)

// const bodyEl = generateBodyDOM(filteredDates)
// console.log(bodyEl)




let html = '';
for (let i = 1; i <= 31; i++) {
    html += `
<option value="${i}">${i}日</option>`
}

console.log(html)





window.addEventListener('dblclick', (e) => {
    const characters = getCharacters()
    console.log(characters)

    const dates = generateDates(sortByBirthday(characters))

    const month = '1'
    const filteredDates = getFilteredDates(dates, { month })

    renderDisplay(month, filteredDates)
})