export interface TrendingAll {
    id: number,
    backdrop_path: string,
    name?: string,
    title?: string,
    media_type: string,
    release_date?: string,
    first_air_date?: string,
    overview: string,
}

export interface Movies {
    adult: boolean,
    backdrop_path: string,
    budget: number,
    genres: [],
    homepage: string,
    imdb_id: string,
    origin_country: [],
    id: number,
    media_type: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    production_companies: [],
    production_countries: [],
    poster_path: string,
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_language: [],
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export interface MovieList {
    adult: boolean,
    backdrop_path: string,
    genre_ids: [],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export interface Series {
    adult: boolean,
    backdrop_path: string,
    created_by: [],
    episode_run_time: [],
    first_air_date: string,
    genres: [],
    homepage: string,
    id: number,
    in_production: boolean,
    languages: [],
    last_air_date: [],
    last_episode_to_air: [],
    name: string,
    next_episode_to_air: [],
    networks: [],
    number_of_episodes: number,
    number_of_seasons: number,
    origin_country: [],
    original_language: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: [],
    seasons: Seasons[],
    spoken_language: [],
    status: string,
    tagline: string,
    type: string,
    vote_average: number,
    vote_count: number
}

export interface Seasons {
    _id: string,
    air_date: string,
    episodes: Episodes[],
    name: string,
    overview: string,
    id: number,
    poster_path: string,
    season_number: number,
    vote_average: number
}

export interface Episodes {
    air_date: string,
    crew: [],
    episode_number: number,
    guest_stars: [],
    name: string,
    overview: string,
    id: number,
    production_code: string,
    runtime: number,
    season_number: number,
    still_path: string,
    vote_average: number,
    vote_count: number,
}