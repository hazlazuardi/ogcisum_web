import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import Button from '../components/Button/Button'
import Card from '../components/Cards/Card'
import styles from '../components/Cards/Card.module.css'


const SharedLocationList = (props) => {
    const {location, isShared} = props;

    return (
        <></>
    )
}


export default function Share() {

    const { sampleId } = useParams()

    // Fetch sample data from API
    const [sample, setSample] = useState({
        title: 'C.R.E.A.M',
        createdAt: '7:40 on 25 August 2022',
        location: {
            1: true,
            2: true,
            3: false,
            4: true,
            5: false
        }
    });
    const { title, createdAt } = sample;

    return (
        <>
            <div className='body'>
                <h1>Share This Sample: {sampleId}</h1>

                {/* Card */}
                <Card>
                    <div className={styles.sample_card_container}>

                        {/* Grid Item 1 */}
                        <div className={styles.sample_card_item_text}>
                            <h3>{title}</h3>
                            <p>{createdAt}</p>
                        </div>

                        {/* Grid Item 2 */}
                        <div className={styles.sample_card_item_action} >
                            <Button>Preview</Button>


                        </div>
                    </div>

                </Card>
                {/* Sample Name */}
                {/* Sample CreatedAt */}
                {/* Button for Preview Sample */}

                {/* List of Locations */}
                {/* ToggleButton for Shared or Not Shared Sample */}
            </div>
        </>
    )
}
