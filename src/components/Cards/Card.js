
import React from 'react'
import styles from './Card.module.css'

export default function Card({ children, variant }) {

    const cardVariant = (type) => {
        if (type === 'translucent') return styles.translucent
        else return styles.card
    }


    return (
        <>
            <div className={`${cardVariant(variant)}`}>
                {children}
            </div>
        </>

    )
}
