import React from 'react'
import styles from './ToggleButton.module.css'

export default function ToggleButton({ children, variant, onClick }) {

    const buttonVariant = (type) => {
        if (type === 'contained') return styles.contained
        else return styles.default
    }

    const buttonType = (children) => {
        if (children) return styles.toggle_button
        else return styles.toggle_bar
    }

    return (
        <button type="button" className={`${buttonType(children)}  ${buttonVariant(variant)}`} onClick={onClick}>{children}</button>
    )
}
