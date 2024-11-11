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
    page = 1,
    params = {}
) => {
    const res = await axios.get(
        `${baseUrl}/trending/${type}/${timeWindow}?language=en-US?&page=${page}`,
        config(params)
    );
    return res;
};

// Discover movie or Series
export const getDiscover = async (
    type: string,
    page = 1,
    sortBy:string,
    adult = false,
    params = {}
) => {
    const res = await axios.get(
        `${baseUrl}/discover/${type}?language=en-US&page=${page}&sort_by=${sortBy}&include_adult=${adult}&vote_count.gte=${
            type === "movie" ? 200 : 100
        }`,
        config(params)
    );
    return res;
};

// Get LOGO movie or serie
export const getLogo = async (id: number, type: string, params = {}) => {
    const res = await axios.get(
        `${baseUrl}/${type}/${id}/images?include_image_language=en,null`,
        config(params)
    );
    return res?.data.logos[0];
};

// Get popular movies OR series
export const homeList = async (list: string, type: string, params = {}) => {
    const res = await axios.get(
        `${baseUrl}/${type}/${list}?language=en-US`,
        config(params)
    );
    return res?.data;
};

// Get detail of a movie or a tv serie
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

// Get certification
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

// Get cast or crew
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

// Get videos
export const getVideos = async (
    type: string | undefined,
    id: number | string | undefined,
    params = {}
) => {
    const res = await axios.get(
        `${baseUrl}/${type}/${id}/videos?language=en-US`,
        config(params)
    );
    return res?.data;
};

// Get Season Detail
export const getDetailSeason = async (
    id: number | string | undefined,
    season: number | string | undefined,
    params = {}
) => {
    const res = await axios.get(
        `${baseUrl}/tv/${id}/season/${season}?language=en-US`,
        config(params)
    );
    return res?.data;
};

// Get Similar
export const getSimilar = async (
    type: string | undefined,
    id: number | string | undefined,
    params = {}
) => {
    const res = await axios.get(
        `${baseUrl}/${type}/${id}/similar?language=en-US`,
        config(params)
    );
    return res?.data;
};
