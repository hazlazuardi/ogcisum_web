import React from 'react'
import Button from '../Shared/Button'
import PreviewButton from '../Shared/PreviewButton'
import TextField from '../TextField/TextField'
import Card from './Card'
import styles from './Card.module.css'


export default function SampleTextField(props) {
    const { onSubmit } = props

    console.log(props)



    return (
        <>
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
