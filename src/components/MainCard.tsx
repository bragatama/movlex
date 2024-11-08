import { Carousel } from "@mantine/carousel";
import {
    Anchor,
    AspectRatio,
    Box,
    Divider,
    Flex,
    Image,
    Paper,
    Skeleton,
    Text,
    Title,
} from "@mantine/core";
import { genreAll, List } from "../types/types";
import { homeList, imageOriginalUrl } from "../services/Api";
import classes from "../css/CarouselCard.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Card = (item: List) => {
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
                        c={"rgba(255,255,255,0.4)"}
                    >
                        {genre.name} • {releaseDate} •{" "}
                        {item.vote_average.toFixed(1)}★
                    </Text>
                </div>
            ));
    return (
        <Anchor
            component={Link}
            to={`/${item?.media_type}/${item?.id}`}
            underline="never"
        >
            <Paper className={classes.poster}>
                <AspectRatio ratio={2 / 3}>
                    <Image
                        src={`${imageOriginalUrl}/${item.poster_path}`}
                        radius={"md"}
                    />
                </AspectRatio>
                <Box className={classes.overlay_card} pb={"xl"}>
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
                    </Flex>
                </Box>
                {/* <Title style={{ textAlign: 'center' }} order={4} pt={"1vh"} fw={1000} c={'white'}>{item?.title || item?.name}</Title>
                {matchGenres(genreAll, item.genre_ids)} */}
            </Paper>
        </Anchor>
    );
};

const MainCard = ({
    sort,
    type,
    label,
}: {
    sort: string;
    type: string;
    label: string;
}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        homeList(sort, type)
            .then((res) => {
                setData(res.results);
            })
            .catch((err) => {
                console.log(err, "error");
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 200);
            });
    }, [sort, type]);

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
                            <Image src={"https://placehold.co/800x1200"} />
                        </AspectRatio>
                    </Skeleton>
                ) : (
                    <Card {...item} isLoading={loading} />
                )}
            </Carousel.Slide>
        ));
    return (
        <>
            <h2 style={{ margin: "0px" }}>{label}</h2>
            <Box h={"100%"} display={"flex"}>
                <Carousel
                    slideSize={{ base: "40%", sm: "30%", md: "18%" }}
                    slideGap={"xl"}
                    style={{
                        marginLeft: "calc((-100vw + 100%) / 2)",
                        marginRight: "calc((-100vw + 100%) / 2)",
                        flex: 1,
                        width: "100%",
                    }}
                    classNames={classes}
                    slidesToScroll={"auto"}
                >
                    {slides}
                </Carousel>
            </Box>
            <Divider mt={"5vh"} />
        </>
    );
};

export default MainCard;
