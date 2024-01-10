import { all, put, call, takeLatest } from 'redux-saga/effects'
import { getPhotoData, setPhotoData } from '../Reducers/photoReducer'
import { fetchImage } from '../utils/api'

function* getPhotoDataWorker() {
  const { ok, data, problem } = yield call(fetchImage)
  if (ok && data) {
    console.log(data)
    yield put(setPhotoData(data))
  } else {
    console.warn('Error while fetching photo', problem)
  }
}


export default function* photoSagaWatcher() {
  yield all([takeLatest(getPhotoData, getPhotoDataWorker)])
}