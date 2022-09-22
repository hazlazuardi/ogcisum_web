import React from 'react'
import styles from './Button.module.css'

export default function Button(props) {

    const { children, variant, disabled } = props;

    const buttonVariant = variant => {
        if (variant === 'contained') return styles.contained

    }

    return (
        <button type="button" className={`${styles.button} ${buttonVariant(variant)}`} disabled={disabled}>{children}</button>
    )
}
