import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import Button from '../components/Button/Button'
import Card from '../components/Cards/Card'
import styles from '../components/Cards/Card.module.css'
import LocationLists from '../components/LocationLists/LocationLists'
import { fetchData } from '../helpers/apiCalls'
import { isValidCache } from '../helpers/helpers'

const SharedLocationList = ({ location, isShared }) => {

    return (
        <></>
    )
}

const API_HOST = process.env.REACT_APP_HOST;
const API_KEY = process.env.REACT_APP_API_KEY;
const READ_SAMPLES_URL = (limit, order) => `${API_HOST}?apiKey=${API_KEY}&mode=read&endpoint=samples&limit=${limit}&order=${order}`
const READ_SAMPLES_TO_LOCATIONS_URL = (limit, order) => `${API_HOST}?apiKey=${API_KEY}&mode=read&endpoint=samples_to_locations&limit=${limit}&order=${order}`
const READ_LOCATIONS_URL = (limit, order) => `${API_HOST}?apiKey=${API_KEY}&mode=read&endpoint=locations&limit=${limit}&order=${order}`
export default function Share() {

    const { sampleId } = useParams()

    // Fetch sample data from API
    const [sample, setSample] = useState();
    // Put all of the functions inside useEffect because we use it once
    useEffect(() => {
        const fetchSamples = async () => {
            const localStorageData = JSON.parse(localStorage.getItem('samples'));
            if (isValidCache(localStorageData)) {
                setSample(localStorageData.samples.filter(sample => sample.id === `${sampleId}`)[0])
                console.log('from storage')
            } else {
                const data = await fetchData(READ_SAMPLES_URL(9999, 'asc'))
                setSample(localStorageData.samples.filter(sample => sample.id === `${sampleId}`)[0])
                localStorage.setItem("samples", JSON.stringify(data))
                console.log('from api')
            }
        }
        fetchSamples();
    }, [sampleId]);


    const [samplesToLocations, setSamplesToLocations] = useState()
    useEffect(() => {
        const fetchSamplesToLocations = async () => {
            const localStorageData = JSON.parse(localStorage.getItem('samples_to_locations'));
            if (localStorageData && isValidCache(localStorageData)) {
                const filteredLocalData = localStorageData?.samples_to_locations?.filter(sample => sample.samples_id === `${sampleId}`);
                setSamplesToLocations(filteredLocalData);
                console.log('from storage')
            } else {
                const data = await fetchData(READ_SAMPLES_TO_LOCATIONS_URL(9999, 'asc'))
                const filteredData = data?.samples_to_locations?.filter(sample => sample.samples_id === `${sampleId}`)
                setSamplesToLocations(filteredData);
                localStorage.setItem("samples_to_locations", JSON.stringify(data))
                console.log('from api loc')
            }
        }
        fetchSamplesToLocations()
    }, [sampleId]);

    const [locations, setLocations] = useState();
    useEffect(() => {
        const fetchLocations = async () => {
            const localStorageData = JSON.parse(localStorage.getItem('locations'));
            if (localStorageData && isValidCache(localStorageData)) {
                setLocations(localStorageData.locations);
                console.log('from storage')
            } else {
                const data = await fetchData(READ_LOCATIONS_URL(9999, 'asc'))
                setLocations(data.locations);
                localStorage.setItem("locations", JSON.stringify(data))
                console.log('from api loc')
            }
        }
        fetchLocations();
    }, []);

    console.log(locations)

    return (
        <>
            <div className='body'>
                <h1>Share This Sample: {sampleId}</h1>

                {/* Card */}
                {sample && (
                    <Card>
                        <div className={styles.sample_card_container}>

                            {/* Grid Item 1 */}
                            <div className={styles.sample_card_item_text}>
                                <h3>{sample.name}</h3>
                                <p>{sample.datetime}</p>
                            </div>

                            {/* Grid Item 2 */}
                            <div className={styles.sample_card_item_action} >
                                <Button>Preview</Button>


                            </div>
                        </div>

                    </Card>
                )}
                {/* Sample Name */}
                {/* Sample CreatedAt */}
                {/* Button for Preview Sample */}

                {/* List of Locations */}
                {/* ToggleButton for Shared or Not Shared Sample */}
                {!locations ? (<p>Loading...</p>) : locations?.map(location => (
                    <LocationLists key={location.id} location={location.location} />
                ))}
            </div>
        </>
    )
}
