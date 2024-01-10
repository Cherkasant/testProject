import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type photoReducerState = {
  previousID: string,
  photoData: any
};
const initialState: photoReducerState = {
  previousID: '',
  photoData: null,
}

const photoSlice = createSlice({
  name: 'photoReducer',
  initialState,
  reducers: {
    setPreviousId: (state, action: PayloadAction<string>) => {
      state.previousID = action.payload
    },
    getPhotoData: (state, action: PayloadAction<undefined>) => {
      () => undefined
    },
    setPhotoData: (state, action: PayloadAction<any>) => {
      state.photoData = action.payload
    },
  },
})
export const { getPhotoData, setPreviousId, setPhotoData } = photoSlice.actions
const photoReducer = photoSlice.reducer

export default photoReducer