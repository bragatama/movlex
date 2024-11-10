const GetGenre = ({ genres, genreList, renderItem, single }: Props) => {
    if (single) {
        {
            genres
                .filter((genre) => genreList.includes(genre.id))
                .slice(0, 1)
                .map((genre) => {
                    return renderItem(genre);
                });
        }
    } else {
        return (
            <>
                {genres
                    .filter((genre) => genreList.includes(genre.id))
                    .map((genre) => {
                        return renderItem(genre);
                    })}
            </>
        );
    }
};

type Props = {
    genres: [{ id: number; name: string }];
    genreList: [{ id: number; name: string }];
    renderItem: any;
    single: boolean;
};

export default GetGenre;
