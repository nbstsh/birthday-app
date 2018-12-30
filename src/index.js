import { saveCharacters, loadCharacters, getCharacters, createCharacter } from './character'
import { createMemo, updateMemo, removeMemo } from './memos'
import { generateDates } from './dates'
import { sortByBirthday } from './sort'

const charas = getCharacters()
console.log(charas)

// charas.push(
//     {
//         birthday: '12/11',
//         name: 'sample',
//         memos: ['memo1', 'memo2'],
//         createAt: Date.now(),
//         updatedAt: Date.now()
//     }
// )
// saveCharacters()


// createMemo('c4607e31-55e5-406b-ae62-23e705b40bc9', 'hgoehogehogehoge')
// updateMemo('c4607e31-55e5-406b-ae62-23e705b40bc9', {
//     id: '746a8363-5d13-4621-9ecc-66b76b3ce49d',
//     text: 'edited'
// })

// removeMemo('c4607e31-55e5-406b-ae62-23e705b40bc9', '746a8363-5d13-4621-9ecc-66b76b3ce49d')

const sortedChars = sortByBirthday(charas)
console.log(sortedChars)


const dates = generateDates(sortedChars)
console.log(dates)
