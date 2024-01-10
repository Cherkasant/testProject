import axios from 'axios'

const API_URL = 'https://api.unsplash.com/photos/random'

export const fetchImage = async () => {
  return await axios.get(`${API_URL}?client_id=${process.env.REACT_APP_API_KEY
  }`)
}



