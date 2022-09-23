import React from 'react'
import ToggleButton from '../Button/ToggleButton'
import styles from './SampleToneCreator.module.css'

export default function SampleToneCreator() {
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
                    <ToggleButton>Piano</ToggleButton>
                    <ToggleButton>French Horn</ToggleButton>
                    <ToggleButton>Guitar</ToggleButton>
                    <ToggleButton>Drums</ToggleButton>
                </div>
            </div>

            
            {/* Container */}
            <div className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p>B</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
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
            </div>




        </>
    )
}
