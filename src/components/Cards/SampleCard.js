import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Button from '../Shared/Button'
import PreviewButton from '../Shared/PreviewButton';
import Card from './Card'
import styles from './Card.module.css'

export default function SampleCard(props) {

    const { id, name, datetime, recording_data, sampleIDs } = props;
    // console.log(id)
    // console.log(sampleIDs)
    // console.log(sampleIDs.includes(id))


    useEffect(() => {
        // console.log(JSON.parse(recording_data))
    }, [])
    return (
        <>
            {/* Grid Container */}
            <Card>
                <div className={styles.sample_card_container}>

                    {/* Grid Item 1 */}
                    <div>
                        <h3>{name}</h3>
                        <p className={styles.sample_card_createdAt} >{datetime}</p>
                    </div>

                    {/* Grid Item 2 */}
                    <div className={styles.sample_card_item_action} >
                        <Link to={`share/${id}`} >
                            <Button variant={sampleIDs && sampleIDs.includes(id) && 'in_progress'}>{sampleIDs && sampleIDs.includes(id) ? 'Shared' : 'Share'}</Button>
                        </Link>
                        <PreviewButton {...props} recordingData={JSON.parse(recording_data)}>Preview</PreviewButton>
                        <Link to={`edit/${id}`} >
                            <Button variant='contained' >Edit</Button>
                        </Link>

                    </div>
                </div>
            </Card>
        </>
    )
}
