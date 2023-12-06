import React from "react";
import styles from './Input.module.css'


const Input = ({ ...rest }) => {
  return (
    <input className={styles.input} {...rest} />
  )
}

export default Input;