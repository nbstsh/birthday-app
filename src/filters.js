const filters = {
    month: '1',
    date: '',
    name: ''
}


const setFilters = ({ month, date, name }) => {
    const isValidMonth = typeof month === 'string' && Number(month) >= 1 && Number(month) <= 12
    const isValideDate = typeof date === 'string' && Number(date) >= 1 && Number(date) <= 31

    if (isValidMonth) {
        filters.month = month
    }

    if (isValideDate || date === '') {
        filters.date = date
    }

    if (typeof name === 'string') {
        filters.name =name
    }
}


const getFilters = () => filters



export { setFilters, getFilters }

