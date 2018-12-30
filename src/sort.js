import moment from 'moment'

const sortByBirthday = (characters) => {
    return characters.sort((a, b) => {
        const dateA = a.birthday.split('/')
        const timestampA = moment().set('month', dateA[0]).set('date', dateA[1]).valueOf()
        const dateB = b.birthday.split('/')
        const timestampB = moment().set('month', dateB[0]).set('date', dateB[1]).valueOf()

        if (timestampA < timestampB) return -1
        if (timestampA > timestampB) return 1
        return 0
    })
}

export { sortByBirthday }