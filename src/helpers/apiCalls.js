import { addTimestamp } from "./helpers";
import { isValidCache } from '../helpers/helpers'
import { READ_LOCATIONS_URL, READ_SAMPLES_TO_LOCATIONS_URL, READ_SAMPLES_URL } from "./constants";



export const fetchData = async (url) => {
    return fetch(url)
        .then(res => res.json())
        .then(res => {
            const dataWithTimestamp = addTimestamp(res)
            
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
            
            return dataWithTimestamp;
        })
        .catch(error => {
            // TODO: Error Handling
            console.log(error)
            throw Error("No data")
        });
}

export const fetchSamples = async (setSamples) => {
    const localStorageData = localStorage.getItem('samples');
    if (localStorageData && isValidCache(localStorageData)) {
        console.log(localStorageData)
        setSamples(JSON.parse(localStorageData).samples)
    } else {
        const data = await fetchData(READ_SAMPLES_URL(999, 'asc'))
        setSamples(data.samples)
        localStorage.setItem("samples", JSON.stringify(data))
        
    }
}



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

export const fetchSharedLocations = async (setSharedLocations, sampleId) => {
    // const localStorageData = JSON.parse(localStorage.getItem('samples_to_locations'));
    // if (localStorageData && isValidCache(localStorageData)) {
    //     const filteredLocalData = localStorageData?.samples_to_locations?.filter(sample => sample.samples_id === `${sampleId}`);
    //     setSharedLocations(filteredLocalData);
    //     
    // } else {
    //     await fetchData(READ_SAMPLES_TO_LOCATIONS_URL(9999, 'asc'))
    //         .then(res => {
    //             const filteredData = res?.samples_to_locations?.filter(sample => sample.samples_id === `${sampleId}`)
    //             setSharedLocations(filteredData);
    //             localStorage.setItem("samples_to_locations", JSON.stringify(res))
    //         })
    //         .catch(e => {
    //             console.log(e)
    //         })
    //     
    // }
    await fetchData(READ_SAMPLES_TO_LOCATIONS_URL(9999, 'asc'))
        .then(res => {
            const filteredData = res.samples_to_locations?.filter(sample => sample.samples_id === `${sampleId}`)
            setSharedLocations(filteredData);
            localStorage.setItem("sharedLocations", JSON.stringify(res))
            console.log('fetched', filteredData)
        })
        .catch(e => {
            console.log(e)
        })
    

}

export const fetchLocations = async (setLocations) => {
    const localStorageData = JSON.parse(localStorage.getItem('locations'));
    if (localStorageData && isValidCache(localStorageData)) {
        setLocations(localStorageData.locations);
        
    } else {
        const data = await fetchData(READ_LOCATIONS_URL(9999, 'asc'))
        setLocations(data.locations);
        localStorage.setItem("locations", JSON.stringify(data))
        
    }
}

export const fetchSamplesToLocations = async (setSamplesToLocations) => {
    await fetchData(READ_SAMPLES_TO_LOCATIONS_URL(9999, 'asc'))
        .then(res => {
            setSamplesToLocations(res?.samples_to_locations);
            localStorage.setItem("samples_to_locations", JSON.stringify(res))
            console.log('fetched')
        })
        .catch(e => {
            console.log(e)
        })
}

