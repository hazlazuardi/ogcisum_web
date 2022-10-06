import React, { useEffect, useState } from 'react'
import { fetchSamplesToLocations } from '../../helpers/apiCalls';
import ToggleButton from '../Button/ToggleButton';
import styles from './LocationLists.module.css'



const API_HOST = process.env.REACT_APP_HOST;
const API_KEY = process.env.REACT_APP_API_KEY;
const SHARE_URL = (sampleID, locationID) => `${API_HOST}?apiKey=${API_KEY}&mode=create&endpoint=samples_to_locations&sampleID=${sampleID}&locationID=${locationID}`
const DELETE_URL = (relID) => `${API_HOST}?apiKey=${API_KEY}&mode=delete&endpoint=samples_to_locations&id=${relID}`

export default function LocationLists({ locationID, sampleID, locationName, samplesToLocations, setSamplesToLocations }) {

    const [locationIDs, setLocationIDs] = useState([])
    useEffect(() => {
        setLocationIDs(samplesToLocations?.map(location => location.locations_id))
    }, [locationID, samplesToLocations])

    const [relID, setRelID] = useState();
    useEffect(() => {
        setRelID(samplesToLocations?.filter(rel => rel.locations_id === locationID).map(rel => rel.id)[0])
    }, [locationID, samplesToLocations])

    // console.log('relID', relID)
    // console.log(samplesToLocations.length)

    const handleShare = async (samID, locID, relID) => {
        if (!locationIDs?.includes(locID)) {
            await fetch(SHARE_URL(samID, locID), {
                method: 'POST'
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    localStorage.clear()
                    fetchSamplesToLocations(setSamplesToLocations, sampleID)
                    console.log('locIDs & locID & relID', `${locationIDs} - ${locID} - ${relID}`)
                })
                .catch(e => console.log(e))

        }
        else {
            return;
        }
    }

    const handleNotShare = async (relID, locID) => {
        if (locationIDs?.includes(locID)) {
            await fetch(DELETE_URL(relID), {
                method: 'POST'
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    localStorage.clear()
                    fetchSamplesToLocations(setSamplesToLocations, sampleID)
                    console.log('locIDs & locID & relID', `${locationIDs} - ${locID} - ${relID}`)
                })
                .catch(e => console.log(e))
        }
        else {
            return;
        }

    }

    // console.log(locationIDs)
    // console.log(locationIDs)

    return (
        <>
            {/* Container */}
            <div className={styles.container}>

                {/* Item 1 */}
                <div className={styles.item}>
                    <p>{locationName}</p>
                    <p>{relID}</p>

                </div>

                {/* Item 2 */}
                <div className={`${styles.item} ${styles.item_action}`}>
                    {/* ToggleButtons */}
                    <ToggleButton variant={!locationIDs?.includes(locationID) && 'contained'} onClick={() => handleNotShare(relID, locationID)} >Not Shared</ToggleButton>
                    <ToggleButton variant={locationIDs?.includes(locationID) && 'contained'} onClick={() => handleShare(sampleID, locationID, relID)} >Shared</ToggleButton>
                </div>
            </div>
        </>
    )
}
