import React from 'react'
import ToggleButton from '../Button/ToggleButton';
import styles from './LocationLists.module.css'

export default function LocationLists(props) {

    const { location, isShared } = props;

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
                    <ToggleButton>Shared</ToggleButton>
                </div>
            </div>
        </>
    )
}
