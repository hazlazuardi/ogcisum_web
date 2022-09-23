import React from 'react'
import styles from './Button.module.css'

export default function ToggleButton({ children, variant, onClick }) {

    const buttonVariant = (type) => {
        if (type === 'contained') return styles.contained
        else return styles.toggle_button

    }

    return (
        <button type="button" className={`${buttonVariant(variant)}`} onClick={onClick}>{children}</button>
    )
}
