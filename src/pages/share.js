import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import PreviewButton from '../Components/Button/PreviewButton'
import Card from '../Components/Cards/Card'
import styles from '../Components/Cards/Card.module.css'
import LocationLists from '../Components/Share/LocationLists'
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

                {sample && (
                    <Card>
                        <div className={styles.sample_card_container}>

                            <div className={styles.sample_card_item_text}>
                                <h3>{sample.name}</h3>
                                <p>{sample.datetime}</p>
                            </div>

                            <div className={styles.sample_card_item_action} >
                                <PreviewButton type={sample.type} toneObject={toneObject} toneTransport={toneTransport} tonePart={tonePart} recording_data={sample?.recording_data && JSON.parse(sample.recording_data)} />

                            </div>
                        </div>

                    </Card>
                )}
                {!locations ? (<p>Loading...</p>) : locations?.map(location => (
                    <LocationLists key={location.id} locationID={location.id} sampleID={sampleId} locationName={location.location} sharedLocations={sharedLocations} setSharedLocations={setSharedLocations} isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
                ))}
            </div>
        </>
    )
}
