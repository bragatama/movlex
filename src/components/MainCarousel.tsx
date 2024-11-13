import { Carousel } from "@mantine/carousel";
import {
    Anchor,
    Flex,
    Grid,
    Paper,
    Skeleton,
    Text,
    Title,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import classes from "../css/CarouselCard.module.css";
import Autoplay from "embla-carousel-autoplay";
import { fetchTrending, imageOriginalUrl } from "../services/Api";
import { genreAll, TrendingAll } from "../types/types";
import moment from "moment";
import { Link } from "react-router-dom";
import GetCertification from "./GetCertification";
import FetchLogo from "./FetchLogo";
import GetGenre from "./GetGenre";

const Card = (item: TrendingAll) => {
    // console.log(certificate);
    // genre
    const releaseDate = moment(
        item?.release_date || item?.first_air_date
    ).format("YYYY");

    return (
        <Anchor
            component={Link}
            to={`/${item?.media_type}/${item?.id}`}
            underline="never"
        >
            <Paper
                shadow="md"
                // p="xl"
                style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7628279705436862) 20%, rgba(0,0,0,0) 60%)
                    ,radial-gradient(at bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0) 70%),
                    url(${imageOriginalUrl}/${item.backdrop_path})`,
                }}
                className={classes.card}
            >
                <div></div>
                <div className={classes.content}>
                    <div className={classes.image}>
                        <FetchLogo
                            type={item.media_type}
                            id={item.id}
                            className={classes.images}
                        />
                    </div>
                    <div>
                        <Grid
                            columns={20}
                            gutter={"lg"}
                            justify="flex-start"
                            align="flex-start"
                            pt={"2vh"}
                        >
                            <Grid.Col span={"content"}>
                                <Paper
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
                                        className={classes.category}
                                    >
                                        {item.media_type}
                                    </Text>
                                </Paper>
                            </Grid.Col>
                            <Grid.Col span={"content"}>
                                <Paper
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
                                        className={classes.category}
                                    >
                                        <GetCertification
                                            type={item.media_type}
                                            id={item.id}
                                            isOn={false}
                                        />
                                    </Text>
                                </Paper>
                            </Grid.Col>
                            <Grid.Col span={"content"}>
                                <Text className={classes.category} size="xs">
                                    {releaseDate}
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={"content"}>
                                <Text className={classes.category} size="xs">
                                    {item.vote_average.toFixed(1)} ★
                                </Text>
                            </Grid.Col>
                        </Grid>
                        <Title className={classes.title} mb={"1vh"}>
                            {item?.title || item?.name}
                        </Title>
                        <Flex
                            justify={"flex-start"}
                            direction={"row"}
                            wrap={"wrap"}
                            gap={{ base: "xs", md: "md" }}
                        >
                            <GetGenre
                                genres={genreAll}
                                genreList={item.genre_ids}
                                single={false}
                                renderItem={(genres: {
                                    id: number;
                                    name: string;
                                }) => (
                                    <Paper
                                        key={genres.id}
                                        radius={"md"}
                                        withBorder
                                        px={"sm"}
                                    >
                                        <Text
                                            className={classes.genre}
                                            c={"white"}
                                            fw={900}
                                        >
                                            {genres.name}
                                        </Text>
                                    </Paper>
                                )}
                            />
                        </Flex>
                        <Text className={classes.description} lineClamp={2}>
                            {item.overview}
                        </Text>
                    </div>
                </div>
            </Paper>
        </Anchor>
    );
};

const MainCarousel = ({
    type,
    time_window,
}: {
    type: string;
    time_window: string;
}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchTrending(type, time_window)
            .then((res) => {
                setData(res?.data?.results);
            })
            .catch((err) => {
                console.log(err, "error");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [time_window, type]);

    const slides =
        data &&
        data
            .slice(0, 10)
            .map((item, i) => (
                <Carousel.Slide key={item.id}>
                    {loading ? (
                        <Skeleton height={"80vh"} width={"100vw"} key={i} />
                    ) : (
                        <Card {...item} />
                    )}
                </Carousel.Slide>
            ));
    const autoplay = useRef(
        Autoplay({
            playOnInit: true,
            delay: 5000,
            stopOnMouseEnter: true,
            stopOnFocusIn: false,
            stopOnInteraction: false,
        })
    );

    return (
        <div style={{ height: "80dvh", display: "flex", width: "100%" }}>
            <Carousel
                height={"100%"}
                slideSize={{ base: "100%", sm: "50%" }}
                slideGap={{ base: "6px", sm: "xl" }}
                style={{ width: "100%" }}
                align="start"
                withIndicators
                loop
                classNames={classes}
                plugins={[autoplay.current]}
            >
                {slides}
            </Carousel>
        </div>
    );
};

export default MainCarousel;
