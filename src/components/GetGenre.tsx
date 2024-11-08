import { Paper } from "@mantine/core";
import { ReactElement } from "react";

const GetGenre = ({ genres, genreList, children, renderItem }: Props) => {
    return (
        <>
            {genres
                .filter((genre) => genreList.includes(genre.id))
                .map((genre) => {
                    return renderItem(genre);
                })}
        </>
    );
};

type Props = {
    genres: [{ id: number; name: string }];
    genreList: [{ id: number; name: string }];
    children: React.ReactNode | ReactElement;
    renderItem: any;
};

export default GetGenre;