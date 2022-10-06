import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Button from '../Button/Button'
import PreviewButton from '../Button/PreviewButton';
import Card from './Card'
import styles from './Card.module.css'

export default function SampleCard({ id, name, datetime, recording_data, toneObject, toneTransport, tonePart }) {




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
                            <Button variant='shared'>Share</Button>
                        </Link>
                        <PreviewButton toneObject={toneObject} toneTransport={toneTransport} tonePart={tonePart} recording_data={JSON.parse(recording_data)}>Preview</PreviewButton>
                        <Link to={`edit/${id}`} >
                            <Button variant='contained' >Edit</Button>
                        </Link>

                    </div>
                </div>
            </Card>
        </>
    )
}
