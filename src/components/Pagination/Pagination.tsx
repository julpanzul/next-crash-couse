import React from 'react'
import styles from './Pagination.module.css'

type PropTypes = {
  count: number
  onChange(number: number): void
}

const Pagination = (props: PropTypes) => {
  const {count, onChange} = props
  const totalPage = Array.from(Array(count).keys())

  const handleSetPagination = (num: number) => {
    onChange(num)
  }
  return (
    <ul className={styles.pagination}>
      {totalPage.map((number, i) => (
        <li key={i} onClick={() => handleSetPagination(number)}>
          <a>{number}</a>
        </li> 
      ))}
    </ul>
  )
}

export default Pagination