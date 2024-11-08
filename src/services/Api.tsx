import axios from "axios";
const baseUrl = "https://api.themoviedb.org/3";
export const imageUrl = "https://image.tmdb.org/t/p/w500";
export const imageOriginalUrl = "https://image.tmdb.org/t/p/original";
export const genreUrl = "https://api.themoviedb.org/3/genre";
const appKey = import.meta.env.VITE_APP_TOKEN;
// Header

const config = ({ ...params }) => {
    const parameter = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${appKey}`,
        },
        params,
    };
    return parameter;
};

//TRENDING
export const fetchTrending = async (
    type: string,
    timeWindow: string,
    params = {}
) => {
    const res = await axios.get(
        `${baseUrl}/trending/${type}/${timeWindow}?language=en-US`,
        config(params)
    );
    return res?.data;
};

// Get LOGO movie or serie
export const getLogo = async (id: number, type: string, params = {}) => {
    const res = await axios.get(
        `${baseUrl}/${type}/${id}/images?include_image_language=en,null`,
        config(params)
    );
    return res?.data.logos[0];
};

// Get popular movies
export const homeList = async (list: string, type: string, params = {}) => {
    const res = await axios.get(
        `${baseUrl}/${type}/${list}?language=en-US`,
        config(params)
    );
    return res?.data;
};

export const getDetail = async (
    type: string | undefined,
    id: number | string | undefined,
    params = {}
) => {
    const res = await axios.get(
        `${baseUrl}/${type}/${id}?language=en-US`,
        config(params)
    );
    return res?.data;
};

export const getCertification = async (
    type: string | undefined,
    id: number | string | undefined,
    params = {}
) => {
    if (type === "movie") {
        const res = await axios.get(
            `${baseUrl}/${type}/${id}/release_dates`,
            config(params)
        );
        return res?.data?.results;
    }
    const res = await axios.get(
        `${baseUrl}/${type}/${id}/content_ratings`,
        config(params)
    );
    return res?.data?.results;
};

export const getCredit = async (
    type: string | undefined,
    id: number | string | undefined,
    params = {}
) => {
    const res = await axios.get(
        `${baseUrl}/${type}/${id}/credits?language=en-US`,
        config(params)
    );
    return res?.data;
};
