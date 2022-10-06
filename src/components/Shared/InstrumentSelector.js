import React from 'react'
import ToggleButton from '../Button/ToggleButton'
import styles from './InstrumentSelector.module.css'

export default function InstrumentSelector(props) {

    const { sample, setSample } = props;
    const { sampleType } = sample;
    const handleClick = (instrument) => {
        setSample({ ...sample, sampleType: instrument })
    }

    return (
        <>
            {/* Container */}
            <div className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p>Type</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <ToggleButton onClick={() => handleClick('piano')} variant={sampleType === 'piano' && 'contained'}>Piano</ToggleButton>
                    <ToggleButton onClick={() => handleClick('french_horn')} variant={sampleType === 'french_horn' && 'contained'}>French Horn</ToggleButton>
                    <ToggleButton onClick={() => handleClick('guitar')} variant={sampleType === 'guitar' && 'contained'} >Guitar</ToggleButton>
                    <ToggleButton onClick={() => handleClick('drums')} variant={sampleType === 'drums' && 'contained'}>Drums</ToggleButton>
                </div>
            </div>


            {/* Container */}
            {/* <div className={styles.type_container}> */}

            {/* Item 1 */}
            {/* <div className={styles.type_item_text}>
                    <p>B</p>
                </div> */}

            {/* Item 2 */}
            {/* <div className={styles.type_item_action}>
                    <ToggleButton>  </ToggleButton>
                    <ToggleButton>  </ToggleButton>
                    <ToggleButton>  </ToggleButton>
                    <ToggleButton>  </ToggleButton>
                    <ToggleButton>  </ToggleButton>
                    <ToggleButton>  </ToggleButton>
                    <ToggleButton>  </ToggleButton>
                    <ToggleButton>  </ToggleButton>
                    <ToggleButton>  </ToggleButton>
                    <ToggleButton>  </ToggleButton>
                    <ToggleButton>  </ToggleButton>
                    <ToggleButton>  </ToggleButton>
                    <ToggleButton>  </ToggleButton>
                    <ToggleButton>  </ToggleButton>
                    <ToggleButton>  </ToggleButton>
                    <ToggleButton>  </ToggleButton>
                </div>
            </div> */}




        </>
    )
}
