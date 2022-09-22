import React from 'react'
import styles from './Button.module.css'

export default function ToggleButton(props) {

    const { children, variant } = props;
    const buttonVariant = variant => {
        if (variant === 'contained') return styles.contained

    }

    return (
        <button type="button" className={`${styles.toggle_button} ${buttonVariant(variant)}`}>{children}</button>
    )
}
