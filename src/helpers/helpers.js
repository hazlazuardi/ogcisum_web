// Function to cache data from API to Local Storage
// Attach timestamp to know when the data is stored into Local Storage
export const addTimestamp = (data) => {
    const currentDate = new Date();
    const result = {
        ...data,
        'timestamp': Math.floor(currentDate / 1000)
    }
    console.log('addTimestamp: ', result)
    return result
}

// Function to read from localstorage
export const readCache = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

// Function to validate cache
export const isValidCache = (data) => {
    const dataTimestamp = data.timestamp;
    const currentDateTime = Math.floor(new Date().getTime() / 1000);
    console.log(`curr: ${currentDateTime}, data: ${dataTimestamp}, ${currentDateTime - dataTimestamp}`)
    return currentDateTime - dataTimestamp < 30
}
