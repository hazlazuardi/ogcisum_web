import React from 'react'
import styles from './Header.module.css'

export default function Header() {
  return (
    <>
      {/* Grid container */}
      <div className={styles.header_container} >
        {/* Grid Item */}
        <h1 className={styles.header_item_logo}>Ogcisum</h1>
        <p className={styles.header_item_tagline} >Create & Share Samples, Listen in Mobile App!</p>
      </div>
    </>
  )
}
