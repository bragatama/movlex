import axios from 'axios'
const baseUrl = 'https://api.themoviedb.org/3'
export const imageUrl = 'https://image.tmdb.org/t/p/w500'
export const imageOriginalUrl = 'https://image.tmdb.org/t/p/original'
export const genreUrl = 'https://api.themoviedb.org/3/genre'
const appKey = import.meta.env.VITE_APP_TOKEN
// Header

const config = ({ ...params }) => {
    const parameter = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${appKey}`
        },
        params
    }
    return parameter
}

//TRENDING
export const fetchTrending = async (type: string, timeWindow: string, params = {}) => {
    const res = await axios.get(
        `${baseUrl}/trending/${type}/${timeWindow}?language=en-US`, config(params)
    );
    return res;
}

// Get LOGO movie or serie
export const getLogo = async (id: number, type: string, params = {}) => {
    const res = await axios.get(`${baseUrl}/${type}/${id}/images?include_image_language=en,null`, config(params))
    return res
}

// Get popular movies
export const homeList = async (list: string, type: string, params = {}) => {
    const res = await axios.get(`${baseUrl}/${type}/${list}?language=en-US`, config(params))
    return res
}

export const getGenre = async (type: string, paramms = {}) => {
    const res = await axios.get(`${genreUrl}/${type}/list?language=en`, config(paramms)
    )
    return res
}

export const getDetail = async (type: string, id: number, params = {}) => {
    const res = await axios.get(`${baseUrl}/${type}/${id}?language=en`, config(params))
    return res
}