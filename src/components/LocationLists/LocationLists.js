import React, { useEffect, useState } from 'react'
import ToggleButton from '../Button/ToggleButton';
import styles from './LocationLists.module.css'

export default function LocationLists({ id, location, samplesToLocations }) {

    console.log('ll', samplesToLocations)

    // const isShared = (id, samplesToLocations) => {
    //     console.log('shared', samplesToLocations.filter(sample => sample.locations_id === id))
    //     return samplesToLocations.filter(sample => sample.locations_id === id)
    // }

    const [locationIDs, setLocationIDs] = useState([])

    useEffect(() => {
        setLocationIDs(samplesToLocations?.map(location => location.locations_id))
    }, [samplesToLocations])


    // console.log(locationIDs)

    return (
        <>
            {/* Container */}
            <div className={styles.container}>

                {/* Item 1 */}
                <div className={styles.item}>
                    <p>{location}</p>
                </div>

                {/* Item 2 */}
                <div className={`${styles.item} ${styles.item_action}`}>
                    {/* ToggleButtons */}
                    <ToggleButton>Not Shared</ToggleButton>
                    <ToggleButton variant={locationIDs.includes(id) && 'contained'} >Shared</ToggleButton>
                </div>
            </div>
        </>
    )
}
