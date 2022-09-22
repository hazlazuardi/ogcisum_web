import React from 'react'
import { Link, useLocation, useMatch } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
  const currentUrl = useLocation();
  const isChildPage = currentUrl.pathname !== '/'

  const handleBack = (e) => {
    e.preventDefault();
  }


  return (
    <>
      {/* Grid container */}
      <div className={styles.header_container} >
        {/* Grid Item */}
        <div className={styles.header_logo_container}>
          {isChildPage && (
            <Link to={'/'}>
              <button className={styles.header_back_button}>←</button>
            </Link>
          )}
          <h1 className={styles.header_logo}>Ogcisum</h1>
        </ div>
        <p className={styles.header_tagline} >Create & Share Samples, Listen in Mobile App!</p>
      </div>
    </>
  )
}
