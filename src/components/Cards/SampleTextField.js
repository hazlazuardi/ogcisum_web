import React from 'react'
import Button from '../Button/Button'
import PreviewButton from '../Button/PreviewButton'
import TextField from '../TextField/TextField'
import Card from './Card'
import styles from './Card.module.css'


export default function SampleTextField(props) {
    const { sample, recordingData, onSubmit } = props



    return (
        <>

            {/* Input Sample Name */}
            <Card>
                <div className={styles.sample_text_field_container}>
                    <div className={styles.text_field}>
                        <TextField {...props} />
                    </div>
                    <div className={styles.sample_card_item_action}>
                        <PreviewButton {...props} />
                        <Button variant='contained' onClick={onSubmit} >Save</Button>
                    </div>
                </div>
            </Card>
        </>
    )
}
