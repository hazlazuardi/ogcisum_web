import React from 'react'
import { Link } from 'react-router-dom';
import Button from '../Button/Button'
import Card from './Card'
import styles from './Card.module.css'

export default function SampleCard(props) {

    const { id, title, createdAt, shared } = props;

    return (
        <>
            {/* Grid Container */}
            <Card>
                <div className={styles.sample_card_container}>

                    {/* Grid Item 1 */}
                    <div>
                        <h3>{title}</h3>
                        <p>{createdAt}</p>
                    </div>

                    {/* Grid Item 2 */}
                    <div className={styles.sample_card_item_action} >
                        <Link to={`share/${id}`} >
                            <Button disabled={shared}>Share</Button>
                        </Link>
                        <Button>Preview</Button>
                        <Link to={`edit/${id}`} >
                            <Button variant='contained' >Edit</Button>
                        </Link>

                    </div>
                </div>
            </Card>
        </>
    )
}
