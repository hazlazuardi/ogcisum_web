import React from 'react'
import styles from './Button.module.css'

export default function Button({ children, variant, disabled, onClick }) {

    const buttonVariant = variant => {
        if (variant === 'contained') return styles.contained
        if (variant === 'shared') return styles.shared
    }

    return (
        <button type="button" className={`${styles.button} ${buttonVariant(variant)}`} onClick={onClick}>{children}</button>
    )
}
