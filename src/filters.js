const filters = {
    month: '1',
    date: '1',
    name: ''
}


const setFilters = ({ month, date, name }) => {
    if ( typeof month === 'string' && Number(month) >= 1 && Number(month) <= 12) {
        filters.month = month
    }

    if (typeof date === 'string' && Number(date) >= 1 && Number(date) <= 31) {
        filters.date = date
    }

    if (typeof name === 'string') {
        filters.name =name
    }
}


const getFilters = () => filters



export { setFilters, getFilters }

