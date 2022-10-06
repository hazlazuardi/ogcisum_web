import { addTimestamp } from "./helpers";
import { isValidCache } from '../helpers/helpers'



export const fetchData = async (url) => {
    return fetch(url)
        .then(res => res.json())
        .then(res => {
            const dataWithTimestamp = addTimestamp(res)
            // console.log('fetchData', dataWithTimestamp)
            return dataWithTimestamp;
        })
        .catch(error => {
            // TODO: Error Handling
            console.log(error)
            throw Error("No data")
        });
}

export const postData = async (url, body) => {
    return fetch(url, {
        method: 'POST',
        body: body
    })
        .then(res => res.json())
        .then(res => {
            const dataWithTimestamp = addTimestamp(res)
            // console.log('fetchData', dataWithTimestamp)
            return dataWithTimestamp;
        })
        .catch(error => {
            // TODO: Error Handling
            console.log(error)
            throw Error("No data")
        });
}

const API_HOST = process.env.REACT_APP_HOST;
const API_KEY = process.env.REACT_APP_API_KEY;
const READ_SAMPLES_URL = (limit, order) => `${API_HOST}?apiKey=${API_KEY}&mode=read&endpoint=samples&limit=${limit}&order=${order}`
const READ_SAMPLES_TO_LOCATIONS_URL = (limit, order) => `${API_HOST}?apiKey=${API_KEY}&mode=read&endpoint=samples_to_locations&limit=${limit}&order=${order}`
const READ_LOCATIONS_URL = (limit, order) => `${API_HOST}?apiKey=${API_KEY}&mode=read&endpoint=locations&limit=${limit}&order=${order}`
const DELETE_SAMPLES_TO_LOCATIONS_URL = (id) => `${API_HOST}?apiKey=${API_KEY}&mode=delete&endpoint=samples_to_locations&id=${id}`

export const fetchSample = async (setSample, sampleId) => {
    const localStorageData = JSON.parse(localStorage.getItem('samples'));
    if (localStorageData && isValidCache(localStorageData)) {
        setSample(localStorageData.samples.filter(sample => sample.id === `${sampleId}`)[0])
        console.log('from storage')
    } else {
        await fetchData(READ_SAMPLES_URL(9999, 'asc'))
            .then(res => {
                setSample(res.samples?.filter(sample => sample.id === `${sampleId}`)[0])
                localStorage.setItem("samples", JSON.stringify(res))
                console.log('from api')
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export const fetchSamplesToLocations = async (setSamplesToLocations, sampleId) => {
    // const localStorageData = JSON.parse(localStorage.getItem('samples_to_locations'));
    // if (localStorageData && isValidCache(localStorageData)) {
    //     const filteredLocalData = localStorageData?.samples_to_locations?.filter(sample => sample.samples_id === `${sampleId}`);
    //     setSamplesToLocations(filteredLocalData);
    //     // console.log('from storage', filteredLocalData)
    // } else {
    //     await fetchData(READ_SAMPLES_TO_LOCATIONS_URL(9999, 'asc'))
    //         .then(res => {
    //             const filteredData = res?.samples_to_locations?.filter(sample => sample.samples_id === `${sampleId}`)
    //             setSamplesToLocations(filteredData);
    //             localStorage.setItem("samples_to_locations", JSON.stringify(res))
    //         })
    //         .catch(e => {
    //             console.log(e)
    //         })
    //     // console.log('from api loc', filteredData)
    // }
    await fetchData(READ_SAMPLES_TO_LOCATIONS_URL(9999, 'asc'))
        .then(res => {
            const filteredData = res?.samples_to_locations?.filter(sample => sample.samples_id === `${sampleId}`)
            setSamplesToLocations(filteredData);
            localStorage.setItem("samples_to_locations", JSON.stringify(res))
            console.log('fetched')
        })
        .catch(e => {
            console.log(e)
        })
    // console.log('from api loc', filteredData)

}

export const fetchLocations = async (setLocations) => {
    const localStorageData = JSON.parse(localStorage.getItem('locations'));
    if (localStorageData && isValidCache(localStorageData)) {
        setLocations(localStorageData.locations);
        // console.log('from storage')
    } else {
        const data = await fetchData(READ_LOCATIONS_URL(9999, 'asc'))
        setLocations(data.locations);
        localStorage.setItem("locations", JSON.stringify(data))
        // console.log('from api loc')
    }
}

export const deleteSamplesToLocations = async () => {

}


