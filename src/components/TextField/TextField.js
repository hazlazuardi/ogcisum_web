import React from 'react'
import styles from './TextField.module.css'

export default function TextField(props) {
    const { name, setSample } = props

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setSample((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    console.log(name)

    return (
        <>
            <form className={styles.text_field_container}>
                <label htmlFor='name' />
                <input
                    type='text' id='name' name='name'
                    className={styles.text_field}
                    value={name}
                    onChange={handleChange} />
            </form>
        </>
    )
}
