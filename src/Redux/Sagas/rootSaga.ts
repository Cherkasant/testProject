import { all } from 'redux-saga/effects'

import photoSagaWatcher from './photoSaga'

export function* rootSaga() {
  yield all([
    photoSagaWatcher(),
  ])
}