import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import PreviewButton from '../components/Button/PreviewButton'
import Card from '../components/Cards/Card'
import styles from '../components/Cards/Card.module.css'
import LocationLists from '../components/LocationLists/LocationLists'
import { fetchLocations, fetchSample, fetchSharedLocations } from '../helpers/apiCalls'

export default function Share({ toneObject, toneTransport, tonePart }) {

    const { sampleId } = useParams()

    // Fetch sample data from API
    const [sample, setSample] = useState([]);
    useEffect(() => {
        fetchSample(setSample, sampleId);
    }, [sampleId]);

    if (sample.recording_data) {
        console.log(JSON.parse(sample.recording_data))
    }

    const [sharedLocations, setSharedLocations] = useState([])
    useEffect(() => {
        fetchSharedLocations(setSharedLocations, sampleId)
    }, [sharedLocations?.length, sampleId]);

    const [locations, setLocations] = useState();
    useEffect(() => {
        fetchLocations(setLocations);
    }, []);

    // console.log(sample && JSON.parse(sample.recording_data))

    const [isLoaded, setIsLoaded] = useState(false)
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
                                <PreviewButton type={sample.type} toneObject={toneObject} toneTransport={toneTransport} tonePart={tonePart} recording_data={sample?.recording_data && JSON.parse(sample.recording_data)} />


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
                    <LocationLists key={location.id} locationID={location.id} sampleID={sampleId} locationName={location.location} sharedLocations={sharedLocations} setSharedLocations={setSharedLocations} isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
                ))}
            </div>
        </>
    )
}
