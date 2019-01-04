const dates = []

const generateDates = (sortedCharacters) => {
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

const getFilteredDates = (dates, { month }) => {
    return dates.filter((date) => date.month === month )
}


export { generateDates, getFilteredDates }