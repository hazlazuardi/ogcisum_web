import React from 'react'
import Button from '../Button/Button'
import TextField from '../TextField/TextField'
import Card from './Card'
import styles from './Card.module.css'

export default function SampleTextField(props) {
    return (
        <>
            <Card>
                <div className={styles.sample_text_field_container}>
                    <div className={styles.text_field}>
                        <TextField {...props} />
                    </div>
                    <div className={styles.sample_card_item_action}>
                        <Button>Preview</Button>
                        <Button variant='contained'>Save</Button>
                    </div>
                </div>
            </Card>
        </>
    )
}
