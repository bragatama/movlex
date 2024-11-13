export interface TrendingAll {
    id: number;
    genre_ids: Genre;
    backdrop_path: string;
    name?: string;
    title?: string;
    media_type: string;
    release_date?: string;
    first_air_date?: string;
    overview: string;
    vote_average: number;
}

export interface TrendingMovie {
    backdrop_path: string;
    condition: string;
    first_air_date: string;
    genres_id: [];
    media_type: string;
    name: string;
    results: [];
    id: number;
    title: string;
    poster_path: string;
    original_language: string;
    genre_ids: Genre;
    popularity: number;
    release_date: string;
    vote_average: number;
    vote_count: number;
    overview: string;
}

interface Genre {
    id: number;
    name: string;
}

export const genreAll = [
    {
        id: 28,
        name: "Action",
    },
    {
        id: 12,
        name: "Adventure",
    },
    {
        id: 16,
        name: "Animation",
    },
    {
        id: 35,
        name: "Comedy",
    },
    {
        id: 80,
        name: "Crime",
    },
    {
        id: 99,
        name: "Documentary",
    },
    {
        id: 18,
        name: "Drama",
    },
    {
        id: 10751,
        name: "Family",
    },
    {
        id: 14,
        name: "Fantasy",
    },
    {
        id: 36,
        name: "History",
    },
    {
        id: 27,
        name: "Horror",
    },
    {
        id: 10402,
        name: "Music",
    },
    {
        id: 10749,
        name: "Romance",
    },
    {
        id: 878,
        name: "Science Fiction",
    },
    {
        id: 10770,
        name: "TV Movie",
    },
    {
        id: 53,
        name: "Thriller",
    },
    {
        id: 10752,
        name: "War",
    },
    {
        id: 37,
        name: "Western",
    },
    {
        id: 10759,
        name: "Action & Adventure",
    },
    {
        id: 10762,
        name: "Kids",
    },
    {
        id: 9648,
        name: "Mystery",
    },
    {
        id: 10763,
        name: "News",
    },
    {
        id: 10764,
        name: "Reality",
    },
    {
        id: 10765,
        name: "Sci-Fi & Fantasy",
    },
    {
        id: 10766,
        name: "Soap",
    },
    {
        id: 10767,
        name: "Talk",
    },
    {
        id: 10768,
        name: "War & Politics",
    },
];

export interface Certification {
    iso_3166_1: string;
    release_dates?: [movieCertification] | [];
    descriptors?: [];
    rating?: string;
}

interface movieCertification {
    certification: string;
    descriptors: [];
    iso_639_1: string;
}

export interface Credits {
    id: number;
    cast: castOrCrew;
    crew: castOrCrew;
}

export interface castOrCrew {
    adult: boolean;
    gender: number;
    id: number;
    know_for_departement: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
    job?: string;
}

export interface Videos {
    id: number;
    results: {
        site: string;
        type: string;
        id: string;
    };
}

export interface seasonList {
    air_date: string;
    id: number;
    name: string;
    episode_count: number;
    poster_path: string;
    vote_average: number;
}

export interface Detail {
    adult: boolean;
    backdrop_path: string;
    budget?: number;
    genres: {
        id: number;
        name: string;
    };
    homepage: string;
    imdb_id?: string;
    origin_country: [];
    id: number;
    original_language: string;
    original_title?: string;
    overview: string;
    popularity: number;
    production_companies: [];
    production_countries: [];
    poster_path: string;
    release_date?: string;
    revenue?: number;
    runtime?: number;
    spoken_language: [];
    status: string;
    tagline: string;
    title?: string;
    video?: boolean;
    vote_average: number;
    vote_count: number;
    created_by?: [];
    first_air_date?: string;
    in_production?: boolean;
    languages?: [];
    last_air_date?: [];
    last_episode_to_air?: [];
    name?: string;
    next_episode_to_air?: [];
    networks?: [];
    number_of_episodes?: number;
    number_of_seasons?: number;
    original_name?: string;
    seasons?: Seasons;
    type: string;
}

export interface List {
    adult: boolean;
    backdrop_path: string;
    genre_ids: Genre;
    id: number;
    original_language: string;
    original_title: string;
    origin_country?: string;
    overview: string;
    media_type: string;
    popularity: number;
    poster_path: string;
    is_loading: boolean;
    release_date?: string;
    first_air_date?: string;
    title?: string;
    name?: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface Seasons {
    _id: string;
    air_date: string;
    episodes: Episodes;
    name: string;
    overview: string;
    id: number;
    poster_path: string;
    season_number: number;
    vote_average: number;
}

export interface Episodes {
    air_date: string;
    crew: castOrCrew;
    episode_number: number;
    guest_stars: castOrCrew;
    name: string;
    overview: string;
    id: number;
    production_code: string;
    runtime: number;
    season_number: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
}
