import { RootState } from '../store'


export default {
  getPhoto: (state: RootState) => state.photoReducer.previousID,
}