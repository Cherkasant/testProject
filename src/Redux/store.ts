import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import photoReducer from './Reducers/photoReducer'
import { api } from './RTK/photoAPI'
import { setupListeners } from '@reduxjs/toolkit/query'
import { rootSaga } from './Sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: { photoReducer, [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(sagaMiddleware),
})
sagaMiddleware.run(rootSaga)
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;