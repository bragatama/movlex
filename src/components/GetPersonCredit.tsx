import { Carousel } from "@mantine/carousel";
import {
    Anchor,
    AspectRatio,
    Box,
    Flex,
    Image,
    Paper,
    Skeleton,
    Text,
    Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getPersonCredits, imageUrl } from "../services/Api";
import classes from "../css/CarouselCard.module.css";
import { genreAll, List } from "../types/types";
import moment from "moment";
import { Link, useParams } from "react-router-dom";

const Card = (item: List) => {
    const router = useParams();
    const { type } = router;
    const releaseDate = moment(
        item?.release_date || item?.first_air_date
    ).format("YYYY");
    const matchGenres = (
        genres: { id: number; name: string }[],
        genreList: { id: number; name: string }
    ) =>
        genres
            .filter((genre) => genreList.includes(genre.id))
            .slice(0, 1)
            .map((genre) => (
                <div key={genre.id}>
                    <Text
                        size="sm"
                        fw={500}
                        style={{ textAlign: "center" }}
                        c={"dimmed"}
                    >
                        {genre.name} • {releaseDate} •{" "}
                        {item.vote_average.toFixed(1)}★
                    </Text>
                </div>
            ));
    return (
        <Anchor component={Link} to={`/${item.media_type}/${item.id}`} underline="never">
            <Paper className={classes.poster}>
                <AspectRatio ratio={2 / 3}>
                    <Image
                        src={`${imageUrl}/${item.poster_path}`}
                        radius={"md"}
                        alt="poster"
                        loading="lazy"
                        />
                </AspectRatio>
            </Paper>
            <Box>
                <Flex direction={"column"} justify={"flex-end"} h={"100%"}>
                    <Title
                        style={{ textAlign: "center" }}
                        order={4}
                        fw={1000}
                        c={"white"}
                    >
                        {item?.title || item?.name}
                    </Title>
                    {matchGenres(genreAll, item.genre_ids)}
                    <Text
                        size="sm"
                        fw={500}
                        style={{ textAlign: "center" }}
                        c={"dimmed"}
                    >
                        as
                    </Text>
                    <Text
                        size="sm"
                        fw={500}
                        style={{ textAlign: "center" }}
                        c={"white"}
                    >
                        {item.character}
                    </Text>
                </Flex>
            </Box>
        </Anchor>
    );
};

const GetPersonCredit = ({
    type,
    id,
}: {
    type: string | undefined;
    id: number | string | undefined;
}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPersonCredits(id, type)
            .then((res) => {
                setData(res);
            })
            .catch((err) => {
                console.log(err, "error set person credit");
            })
            .finally(() => {
                setLoading(false);
            });
        return () => {};
    }, [type, id]);

    data.map((element: string) => {
        element["media_type"] = type;
        return element;
    });
    const slides =
        data &&
        data?.map((item, i) => (
            <Carousel.Slide key={item.id}>
                {loading ? (
                    <Skeleton key={i} height={"auto"}>
                        <AspectRatio ratio={2 / 3}>
                            <Image
                                src={"https://placehold.co/800x1200"}
                                alt="skeleton"
                                loading="lazy"
                                />
                        </AspectRatio>
                    </Skeleton>
                ) : (
                    <Card {...item} isLoading={loading} />
                )}
            </Carousel.Slide>
        ));

    return (
        <>
            <Title
                c={"white"}
                order={2}
                style={{ margin: "0px" }}
                tt={"capitalize"}
            >
                {type === "movie"
                    ? "Movies Credit"
                    : type === "tv"
                    ? "TV Series Credit"
                    : ""}
            </Title>
            <Box h={"100%"} display={"flex"}>
                <Carousel
                    slideSize={{ base: "40%", sm: "30%", md: "15%" }}
                    slideGap={"sm"}
                    includeGapInSize={false}
                    style={{
                        flex: 1,
                        width: "100%",
                    }}
                    classNames={classes}
                    slidesToScroll={"auto"}
                    align={"start"}
                >
                    {slides}
                </Carousel>
            </Box>
        </>
    );
};

export default GetPersonCredit;
