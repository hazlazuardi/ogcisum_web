import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import PreviewButton from '../Components/Shared/PreviewButton'
import Card from '../Components/Cards/Card'
import styles from '../Components/Cards/Card.module.css'
import LocationLists from '../Components/Share/LocationLists'
import { fetchLocations, fetchSample, fetchSharedLocations } from '../helpers/apiCalls'

export default function Share(props) {

    const { sampleId } = useParams()

    // Fetch sample data from API
    const [sample, setSample] = useState();
    useEffect(() => {
        fetchSample(setSample, sampleId);
    }, [sampleId]);

    const [sharedLocations, setSharedLocations] = useState([])
    useEffect(() => {
        fetchSharedLocations(setSharedLocations, sampleId)
    }, [sharedLocations?.length, sampleId]);

    const [locations, setLocations] = useState();
    useEffect(() => {
        fetchLocations(setLocations);
    }, []);

    // console.log(sample && JSON.parse(sample.recording_data))
    console.log(sample)

    const [isLoaded, setIsLoaded] = useState(false)
    return (
        <>
            <div className='body'>
                <h1>Share This Sample:</h1>

                {sample && (
                    <Card>
                        <div className={styles.sample_card_container}>

                            <div className={styles.sample_card_item_text}>
                                <h3>{sample.name}</h3>
                                <p>{sample.datetime}</p>
                            </div>

                            <div className={styles.sample_card_item_action} >
                                <PreviewButton {...props} {...sample}>Preview</PreviewButton>
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
