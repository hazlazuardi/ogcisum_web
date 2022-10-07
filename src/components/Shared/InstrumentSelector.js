import React from 'react'
import ToggleButton from '../Shared/ToggleButton'
import styles from './InstrumentSelector.module.css'

export default function InstrumentSelector(props) {

    const { sample, setSample } = props;
    const { type } = sample;
    const handleClick = (instrument) => {
        setSample({ ...sample, type: instrument })
    }

    return (
        <>
            {/* Container */}
            <div className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p className={`${styles.list_text}`} >Type</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <ToggleButton onClick={() => handleClick('piano')} variant={type === 'piano' && 'contained'}>Piano</ToggleButton>
                    <ToggleButton onClick={() => handleClick('french_horn')} variant={type === 'french_horn' && 'contained'}>French Horn</ToggleButton>
                    <ToggleButton onClick={() => handleClick('guitar')} variant={type === 'guitar' && 'contained'} >Guitar</ToggleButton>
                    <ToggleButton onClick={() => handleClick('drums')} variant={type === 'drums' && 'contained'}>Drums</ToggleButton>
                </div>
            </div>
        </>
    )
}
