import React, { useEffect, useState } from 'react'
import { fetchSharedLocations } from '../../helpers/apiCalls';
import ToggleButton from '../Button/ToggleButton';
import styles from './LocationLists.module.css'



const API_HOST = process.env.REACT_APP_HOST;
const API_KEY = process.env.REACT_APP_API_KEY;
const SHARE_URL = (sampleID, locationID) => `${API_HOST}?apiKey=${API_KEY}&mode=create&endpoint=samples_to_locations&sampleID=${sampleID}&locationID=${locationID}`
const DELETE_URL = (relID) => `${API_HOST}?apiKey=${API_KEY}&mode=delete&endpoint=samples_to_locations&id=${relID}`

export default function LocationLists({ locationID, sampleID, locationName, sharedLocations, setSharedLocations, isLoaded, setIsLoaded }) {

    const [locationIDs, setLocationIDs] = useState([])
    useEffect(() => {
        setLocationIDs(sharedLocations?.map(location => location.locations_id))
    }, [locationID, sharedLocations])

    const [relID, setRelID] = useState();
    useEffect(() => {
        setRelID(sharedLocations?.filter(rel => rel.locations_id === locationID).map(rel => rel.id)[0])
    }, [locationID, sharedLocations])

    // console.log(locationIDs)
    // console.log('relID', relID)
    // console.log(sharedLocations.length)

    const [isShared, setIsShared] = useState(locationIDs.includes(locationID))
    useEffect(() => {
        if (locationIDs && locationID && !isLoaded) {
            setIsShared(locationIDs.includes(locationID))
            console.log('still running')
        }
    }, [isLoaded, locationID, locationIDs])

    const [isLoadingSharing, setIsLoadingSharing] = useState(false)
    const handleShare = async (samID, locID, relID) => {

        if (!isShared && !isLoadingNotSharing && !isLoadingSharing) {
            console.log('click share')
            setIsLoadingSharing(true)
            await fetch(SHARE_URL(samID, locID), {
                method: 'POST'
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        console.log(res)
                        localStorage.clear()
                        fetchSharedLocations(setSharedLocations, sampleID)
                        setIsLoaded(true)
                        setIsLoadingSharing(false)
                        setIsShared(true)
                    }
                })
                .catch(e => console.log(e))

        }
        else {
            console.log('cannot click share')
            return;
        }
    }

    const [isLoadingNotSharing, setIsLoadingNotSharing] = useState(false)
    const handleNotShare = async (relID, locID) => {
        if (isShared) {
            console.log('click unshare')
            setIsLoadingNotSharing(true)
            await fetch(DELETE_URL(relID), {
                method: 'POST'
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        console.log(res)
                        localStorage.clear()
                        fetchSharedLocations(setSharedLocations, sampleID)
                        setIsLoaded(true)
                        setIsLoadingNotSharing(false)
                        setIsShared(false)
                    }
                })
                .catch(e => console.log(e))
        }
        else {
            console.log('cannot click unshare')
            return;
        }

    }

    // console.log(locationIDs)
    // console.log(sharedLocations)
    // console.log(locationID)
    // console.log(locationIDs.includes(locationID))
    // console.log(`locID: ${locationID} is Shared: ${isShared}`)
    return (
        <>
            {/* Container */}
            <div className={styles.container}>

                {/* Item 1 */}
                <div className={styles.item}>
                    <p>{locationName}</p>
                </div>

                {/* Item 2 */}
                <div className={`${styles.item} ${styles.item_action}`}>
                    {/* ToggleButtons */}
                    <ToggleButton variant={!isShared && 'contained'} onClick={() => handleNotShare(relID, locationID)} >{isLoadingNotSharing ? "Not Sharing..." : "Not Shared"}</ToggleButton>
                    <ToggleButton variant={isShared && 'contained'} onClick={() => handleShare(sampleID, locationID, relID)} >{isLoadingSharing ? "Sharing..." : "Shared"}</ToggleButton>
                </div>
            </div>
        </>
    )
}
