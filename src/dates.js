let dates = []


const getDates = () => dates


const initDates = (sortedCharacters, isSingle) => {
    dates = []
    let dateObj = null

    sortedCharacters.forEach((character) => {
        const birthday = character.birthday.split('/')
        const needsToPushSameCharacter = dateObj && !isSingle

        if (needsToPushSameCharacter) {
            dateObj.characters.push(character)
        } else {
            dateObj = {
                month: birthday[0],
                date: birthday[1],
                characters: [character]
            }
            dates.push(dateObj)
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