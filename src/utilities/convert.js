
// date = 'mm/dd'
const toJapaneseCalender = (date) => {
    const dates = date.split('/')
    return `${dates[0]}月 ${dates[1]}日`
}

const replaceWithBraek = (text) => text.replace(/(?:\r\n|\r|\n)/g, '<br>')

export { toJapaneseCalender, replaceWithBraek }