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
import { genreAll, List } from "../types/types";
import { homeList, imageUrl } from "../services/Api";
import classes from "../css/CarouselCard.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import GetCertification from "./GetCertification";

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
                        src={`${imageUrl}/${item.poster_path}`}
                        alt="poster"
                        radius={"md"}
                    />
                </AspectRatio>
                <Box className={classes.overlay_card} pb={"xl"}>
                    <Flex direction={"column"} justify={"flex-end"} h={"100%"}>
                        <Title
                            style={{ textAlign: "center" }}
                            order={3}
                            fw={1000}
                            c={"white"}
                        >
                            {item?.title || item?.name}
                        </Title>
                        {matchGenres(genreAll, item.genre_ids)}
                        <Paper
                            w={"fit-content"}
                            mt={"0.5vw"}
                            mx={"auto"}
                            radius={"sm"}
                            py={"2px"}
                            px={"8px"}
                            style={{
                                backgroundColor: "rgba(200,200,200)",
                            }}
                        >
                            <Text
                                c={"black"}
                                fw={600}
                                fz={"sm"}
                                className={classes.category}
                                style={{ textAlign: "center" }}
                            >
                                <GetCertification
                                    type={item.media_type}
                                    id={item.id}
                                    isOn={false}
                                />
                            </Text>
                        </Paper>
                    </Flex>
                </Box>
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
                setLoading(false);
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
                            <Image src={"https://placehold.co/800x1200"} alt="skeleton"/>
                        </AspectRatio>
                    </Skeleton>
                ) : (
                    <Card {...item} isLoading={loading} />
                )}
            </Carousel.Slide>
        ));
    return (
        <>
            <Title order={2} style={{ margin: "0px" }}>
                {label}
            </Title>
            <Box h={"100%"} display={"flex"}>
                <Carousel
                    slideSize={{ base: "40%", sm: "30%", md: "16%" }}
                    slideGap={"xl"}
                    style={{
                        marginLeft: "calc((-100vw + 100%) / 2)",
                        marginRight: "calc((-100vw + 100%) / 2)",
                        flex: 1,
                        width: "100%",
                    }}
                    includeGapInSize={false}
                    classNames={classes}
                    slidesToScroll={"auto"}
                >
                    {slides}
                </Carousel>
            </Box>
            <Box mt={"5vh"}></Box>
        </>
    );
};

export default MainCard;
