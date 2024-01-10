import React, { FC } from 'react'
import styles from './LabelList.module.css'

type LabelListProps = {
  tags?: Array<{ type: string, title: string }>
}

const LabelList: FC<LabelListProps> = ({ tags }) => {
  return <div className={styles.container}>
    {tags?.map(tag => {
      return (<div key={tag.title} className={styles.label}>
        {tag.title}
      </div>)
    })}
  </div>
}

export default LabelList