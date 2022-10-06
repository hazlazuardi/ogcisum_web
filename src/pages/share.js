import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import Button from '../components/Button/Button'
import Card from '../components/Cards/Card'
import styles from '../components/Cards/Card.module.css'
import LocationLists from '../components/LocationLists/LocationLists'
import { fetchLocations, fetchSamples, fetchSamplesToLocations } from '../helpers/apiCalls'

export default function Share() {

    const { sampleId } = useParams()

    // Fetch sample data from API
    const [sample, setSample] = useState([]);
    useEffect(() => {
        fetchSamples(setSample, sampleId);
    }, [sampleId]);


    const [samplesToLocations, setSamplesToLocations] = useState([])
    useEffect(() => {
        fetchSamplesToLocations(setSamplesToLocations, sampleId)
    }, [samplesToLocations.length, sampleId]);

    const [locations, setLocations] = useState();
    useEffect(() => {
        fetchLocations(setLocations);
    }, []);

    // console.log(locations)

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
                    <LocationLists key={location.id} locationID={location.id} sampleID={sampleId} locationName={location.location} samplesToLocations={samplesToLocations} setSamplesToLocations={setSamplesToLocations} />
                ))}
            </div>
        </>
    )
}
