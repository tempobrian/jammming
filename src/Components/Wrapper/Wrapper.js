import React from "react";
import styles from './Wrapper.module.css'


const Wrapper = ({ children, minWidth = '800px' }) => {
  return (
    <div className={styles.wrapper} style={{ minWidth }}>{children}</div>
  )
}

export default Wrapper;