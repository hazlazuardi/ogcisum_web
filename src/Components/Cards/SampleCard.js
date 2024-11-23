import React, { useMemo } from 'react'
import { Link } from 'react-router-dom';
import Button from '../Shared/Button'
import PreviewButton from '../Shared/PreviewButton';
import Card from './Card'
import styles from './Card.module.css'

/**
 * Represents a SampleCard for List of Samples
 * @param {Object} props - All props to pass
 */
export default function SampleCard(props) {

    const { id, name, datetime, sampleIDs } = props;


    const formatDateTime = (datetime) => {
        const datetimeObj = new Date(datetime);
        const time = datetimeObj.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).split(" ").join("").toLowerCase()
        const date = datetimeObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }).replace(',', '').split(" ")
        return time + ' on ' + date[1] + ' ' + date[0] + ' ' + date[2]
    }


    const readableDatetime = useMemo(() => formatDateTime(datetime), [datetime])

    const isShared = sampleIDs && sampleIDs.includes(id)
    return (
        <>
            {/* Grid Container */}
            <Card>
                <div className={styles.sample_card_container}>

                    {/* Grid Item 1 */}
                    <div>
                        <h3>{name}</h3>
                        <p className={styles.sample_card_createdAt} >{readableDatetime}</p>
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
