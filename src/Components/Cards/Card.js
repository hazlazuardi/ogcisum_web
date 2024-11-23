
import React from 'react'
import styles from './Card.module.css'


/**
 * Represents a template for components that use Card style.
 * @param {Object} children - All components below the tree
 * @param {string} variant - Variant of the Card
 */
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
