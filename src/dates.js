
const generateDates = (sortedCharacters) => {
    const dates = []

    sortedCharacters.forEach((character) => {
        const birthday = character.birthday.split('/')
        const dateObj = dates.find((date) => date.month === birthday[0] && date.date === birthday[1])

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
    return dates
}

const getFilteredDates = (dates, { month, date, name }) => {
    if (month) dates = dates.filter((dateObj) => dateObj.month === month)
    if (date) dates = dates.filter((dateObj) => dateObj.date === date)
    if (name) dates = dates.filter(({ character }) => character.name === character)
    return dates
}


export { generateDates, getFilteredDates }