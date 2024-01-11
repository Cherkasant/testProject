import React, { useState } from 'react'

import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import { IoSave, IoAddCircleOutline } from 'react-icons/io5'
import { AiOutlineDelete } from 'react-icons/ai'
import { saveAs } from 'file-saver'
import styles from './Home.module.css'
import Card from '../../Components/Card'
import { useDispatch, useSelector } from 'react-redux'
import { setPreviousId } from '../../Redux/Reducers/photoReducer'
import photoSelector from '../../Redux/Selectors/photoSelector'
import {
  useDeleteLikePhotoMutation,
  useGetPhotoDataQuery,
  useGetPreviousPhotoQuery,
  useLogInQuery,
} from '../../Redux/RTK/photoAPI'
import LabelList from '../../Components/LabelList'
import Button from '../../Components/Button'
import { ButtonTypes } from '../../Components/Button/Button'
import Modal from '../../Components/Modal'
import classNames from 'classnames'

const Home = () => {
  const [clicked, setClicked] = useState(false)
  const [previous, setPrevious] = useState(false)
  const [active, setActiveModal] = useState(false)

  const dispatch = useDispatch()

  const previousID = useSelector(photoSelector.getPhoto)

  const { data, isLoading, refetch, isError } = useGetPhotoDataQuery()
  const { data: PreviousPhoto, isError: ErrorPrevious } = useGetPreviousPhotoQuery(previousID, { skip: previous })
  const { data: code } = useLogInQuery()
  const [deleteLike] = useDeleteLikePhotoMutation()

  const onDownloadClick = () => {
    setClicked(!clicked)
  }
  const DownloadImage = (url: string, filename: string) => {
    if (clicked) {
      saveAs(url, filename)
      setClicked(!clicked)
    }
    dispatch(setPreviousId(data.card.id))
    setPrevious(false)
    refetch()
  }

  const onPreviousButtonClick = () => {
    setPrevious(true)
  }
  const onUpdateButtonClick = () => {
    setActiveModal(true)
  }
  const onScreenClick = () => {
    setActiveModal(false)
  }

  return <div className={styles.container}>
    <div className={styles.contentBlock}>
      {isLoading && <div>Loading.....</div>}
      {isError && <div>Parsing error...(Rate Limit Exceeded.
        Demo apps are limited to 50 requests per hour)</div>}
      {data && <img src={!previous ? data.url : PreviousPhoto.url} alt={'ssss'} className={styles.image} />}
    </div>
    <div className={styles.infoBlock}>
      <LabelList tags={!previous ? data?.tags : PreviousPhoto.tags} />
      <div>
        <Card card={!previous ? data?.card : PreviousPhoto.card} />
      </div>
    </div>
    <div className={styles.buttonsBlock}>
      <Button btnType={ButtonTypes.AddButton} onClick={onUpdateButtonClick}
      ><IoAddCircleOutline /></Button>
      <Button btnType={ButtonTypes.NextButton} onClick={onPreviousButtonClick} disabled={ErrorPrevious}><SlArrowLeft /></Button>
      <Button btnType={ButtonTypes.SaveButton} clicked={clicked}
              onClick={onDownloadClick}><IoSave /></Button>
      <Button btnType={ButtonTypes.DeleteButton} onClick={() => deleteLike(data.card.id)}><AiOutlineDelete /></Button>
      <Button btnType={ButtonTypes.NextButton}
              onClick={() => DownloadImage(data.url, data.id)} disabled={isError}><SlArrowRight /></Button>
    </div>
    <div
      className={classNames(styles.wrapModal, {
        [styles.showModal]: active,
      })}
      onClick={onScreenClick}>
      <Modal modal={active} data={data?.card} />
    </div>
  </div>
}

export default Home