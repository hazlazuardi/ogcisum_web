
const CACHE_AGE = 0;

// Function to cache data from API to Local Storage
// Attach timestamp to know when the data is stored into Local Storage
export const addTimestamp = (data) => {
    const currentDate = new Date();
    const result = {
        ...data,
        'timestamp': Math.floor(currentDate / 1000)
    }
    
    return result
}

// Function to read from localstorage
export const readCache = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

// Function to validate cache
export const isValidCache = (data) => {
    if (data) {
        const dataTimestamp = data.timestamp;
        const currentDateTime = Math.floor(new Date().getTime() / 1000);
        
        return currentDateTime - dataTimestamp < CACHE_AGE
    }
    
    throw new Error('No data to validate');
}
