import React from 'react'
import { Link } from 'react-router-dom';
import Button from '../Shared/Button'
import PreviewButton from '../Shared/PreviewButton';
import Card from './Card'
import styles from './Card.module.css'

export default function SampleCard(props) {

    const { id, name, datetime, sampleIDs } = props;
    // console.log(id)
    // console.log(sampleIDs)
    // console.log(sampleIDs.includes(id))

    const readableDateTime = new Date(datetime)
    console.log(readableDateTime.getDay())

    const isShared = sampleIDs && sampleIDs.includes(id)
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
                            <Button variant={isShared && 'in_progress'}>{isShared ? 'Shared' : 'Share'}</Button>
                        </Link>
                        <PreviewButton {...props}>Preview</PreviewButton>
                        <Link to={`edit/${id}`} >
                            <Button variant='contained' >Edit</Button>
                        </Link>

                    </div>
                </div>
            </Card>
        </>
    )
}
