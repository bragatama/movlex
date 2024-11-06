import axios from 'axios'
const baseUrl = 'https://api.themoviedb.org/3'
export const imageUrl = 'https://image.tmdb.org/t/p/w500'
export const imageOriginalUrl = 'https://image.tmdb.org/t/p/original'
export const movieUrl = 'https://api.themoviedb.org/3/movie'
export const serieURL = 'https://api.themoviedb.org/3/tv'
// const apiKey = import.meta.env.VITE_API_KEY
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
export const fetchTrendingCarousel = async (timeWindow = 'day', params = {}) => {
    const res = await axios.get(
        `${baseUrl}/trending/all/${timeWindow}?language=en-US`, config(params)
    );
    return res;
}

// Get LOGO movie or serie
export const getLogo = async (id: number, type: string, params = {}) => {
    if (type === 'movie') {
        const movieRes = await axios.get(
            `${movieUrl}/${id}/images?include_image_language=en,null`, config(params)
        )
        return movieRes
    } else {
        const seriesRes = await axios.get(
            `${serieURL}/${id}/images?include_image_language=en,null`, config(params)
        )
        return seriesRes
    }
}

// Get popular movies
export const homeList = async (list: string, params = {}) => {
    const movieRes = await axios.get(
        `${movieUrl}/${list}?language=en-US`, config(params)
    )
    return movieRes
}