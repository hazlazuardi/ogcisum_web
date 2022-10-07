import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header({ children }) {
  const currentUrl = useLocation();
  const isChildPage = currentUrl.pathname !== '/'


  return (
    <>
      {/* Grid container */}
      <div className={styles.header_background} >
        <div className={styles.header_container} >
          {/* Grid Item */}
          <div className={styles.header_logo_container}>
            {isChildPage && (
              <Link to={'/'}>
                <button className={styles.header_back_button}>←</button>
              </Link>
            )}
            <Link to={'/'} className={styles.header_link}>
              <h1 className={styles.header_logo}>Ogcisum</h1>
            </Link>
          </ div>
          <p className={styles.header_tagline} >Create & Share Samples, Listen in Mobile App!</p>
        </div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
      <div className={styles.footer}></div>
    </>
  )
}
