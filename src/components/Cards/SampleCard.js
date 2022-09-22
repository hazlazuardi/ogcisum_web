import React from 'react'
import Button from '../Button/Button'
import Card from './Card'
import styles from './Card.module.css'

export default function SampleCard(props) {

    const { title, createdAt, shared } = props;

    return (
        <>
            {/* Grid Container */}
            <Card>
                <div className={styles.sample_card_container}>

                    {/* Grid Item 1 */}
                    <div className={styles.sample_card_item_text}>
                        <h3>{title}</h3>
                        <p>{createdAt}</p>
                    </div>

                    {/* Grid Item 2 */}
                    <div className={styles.sample_card_item_action} >
                        <Button disabled={shared}>Share</Button>
                        <Button>Preview</Button>
                        <Button variant='contained' >Edit</Button>


                    </div>
                </div>
            </Card>
        </>
    )
}
