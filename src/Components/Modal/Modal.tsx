import React, { ChangeEvent, FC, useState } from 'react'
import styles from './Modal.module.css'
import classNames from 'classnames'
import { useDebouncedCallback } from 'use-debounce'
import Button from '../Button'
import { ButtonTypes } from '../Button/Button'
import { useUpdateTagsPhotoMutation } from '../../Redux/RTK/photoAPI'
import { CardType } from '../../Types/CardType/CardType'

type ModalProps = {
  modal: boolean
  data?: CardType
}

const Modal: FC<ModalProps> = ({ modal, data }) => {
  const [updateTag] = useUpdateTagsPhotoMutation()
  const [title, setTitle] = useState('')

  const onChangeHandlerDebouncedTitle = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value), 300)
  return <div className={classNames(styles.wrap, { [styles.activeModal]: modal })}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
    <div className={styles.text}>Enter tag:</div>
    <input type={'text'} className={styles.input} placeholder={'Enter title tag...'}
           onChange={(e) => onChangeHandlerDebouncedTitle(e)} defaultValue={title} />
    <Button btnType={ButtonTypes.AddButton} btnClassName={styles.btn}
            onClick={() => updateTag({ id: data?.id.toString(), tag: title })}>Add</Button>
  </div>
}


export default Modal