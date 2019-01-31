let dates = []


const getDates = () => dates


const initDates = (sortedCharacters, isSingle) => {
    dates = []

    sortedCharacters.forEach((character) => {
        const birthday = character.birthday.split('/')
        const dateObj = isSingle ? null : dates.find((date) => date.month === birthday[0] && date.date === birthday[1])

        if (dateObj) {
            dateObj.characters.push(character)
        } else {
            dates.push({
                month: birthday[0],
                date: birthday[1],
                characters: [character]
            })
        }
    })
}


const generateDates = (sortedCharacters) => {
    initDates(sortedCharacters)
    return dates
}


const getFilteredDates = ({ month, date }) => {
    if (month) dates = dates.filter((dateObj) => dateObj.month === month)
    if (date) dates = dates.filter((dateObj) => dateObj.date === date)
    return dates
}


export { generateDates, getFilteredDates, initDates, getDates }