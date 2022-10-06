import React from 'react'
import Button from '../Button/Button'
import PreviewButton from '../Button/PreviewButton'
import TextField from '../TextField/TextField'
import Card from './Card'
import styles from './Card.module.css'

const API_HOST = process.env.REACT_APP_HOST;
const API_KEY = process.env.REACT_APP_API_KEY;
const CREATE_URL = (sampleName, sampleType) => `${API_HOST}?apiKey=${API_KEY}&mode=create&endpoint=samples&sampleType=${sampleType}&sampleName=${sampleName}`

export default function SampleTextField(props) {
    const { sample, recordingData } = props

    const handleSubmit = async () => {
        await fetch(CREATE_URL(sample.sampleName, sample.sampleType), { method: 'POST', body: JSON.stringify(recordingData) })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(e => console.log(e))
    }


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
                        <Button variant='contained' onClick={handleSubmit} >Save</Button>
                    </div>
                </div>
            </Card>
        </>
    )
}
