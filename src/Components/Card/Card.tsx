import React, { FC } from 'react'

import styles from './Card.module.css'
import { CardType } from '../../Types/CardType/CardType'

type CardProps = {
  card?: CardType
}

const Card: FC<CardProps> = ({ card }) => {
  return <div className={styles.container}>
    <div className={styles.text}>
      From: {card?.user}</div>
    <div className={styles.text}>Date: {card?.date}</div>
    <div className={styles.text}>Size: {card?.width}x{card?.height} </div>
    <div className={styles.text}>Downloads: {card?.download}</div>
    <div className={styles.text}>GroupArr: {card?.info}</div>
  </div>
}


export default Card