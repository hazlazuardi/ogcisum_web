import React from 'react'
import styles from './TextField.module.css'

export default function TextField(props) {
    const { sampleName, setSample } = props

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setSample((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <form className={styles.text_field_container}>
                <label htmlFor='sampleName' />
                <input
                    type='text' id='name' name='name'
                    className={styles.text_field}
                    value={sampleName}
                    onChange={handleChange} />
            </form>
        </>
    )
}
