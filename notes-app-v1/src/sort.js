// Sort Values: A-Z
const sortValuesAZ = (valueA, valueB) => {
    if (valueA < valueB) {
        return -1
    } else if (valueA > valueB) {
        return 1
    } else {
        return 0
    }
}

// Sort Values: Z-A
const sortValuesZA = (valueA, valueB) => {
    if (valueA > valueB) {
        return -1
    } else if (valueA < valueB) {
        return 1
    } else {
        return 0
    }
}

export { sortValuesAZ, sortValuesZA }