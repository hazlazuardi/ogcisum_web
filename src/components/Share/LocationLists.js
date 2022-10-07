import React, { useEffect, useState } from 'react'
import { fetchSharedLocations } from '../../helpers/apiCalls';
import { UNSHARE_URL, SHARE_URL } from '../../helpers/constants';
import ToggleButton from '../Shared/ToggleButton';
import styles from './LocationLists.module.css'

export default function LocationLists({ locationID, sampleID, locationName, sharedLocations, setSharedLocations, isLoaded, setIsLoaded }) {

    const [locationIDs, setLocationIDs] = useState([])
    useEffect(() => {
        setLocationIDs(sharedLocations?.map(location => location.locations_id))
    }, [locationID, sharedLocations])

    const [relID, setRelID] = useState();
    useEffect(() => {
        setRelID(sharedLocations?.filter(rel => rel.locations_id === locationID).map(rel => rel.id)[0])
    }, [locationID, sharedLocations])

    
    
    

    const [isShared, setIsShared] = useState(locationIDs?.includes(locationID))
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
            await fetch(UNSHARE_URL(relID), {
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
