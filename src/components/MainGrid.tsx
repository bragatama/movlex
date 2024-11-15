/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
    Anchor,
    AspectRatio,
    Box,
    Container,
    Flex,
    Grid,
    Image,
    LoadingOverlay,
    Pagination,
    Paper,
    Skeleton,
    Text,
    Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { genreAll, TrendingMovie } from "../types/types";
import classes from "../css/CarouselCard.module.css";
import { Link, useParams } from "react-router-dom";
import { getDiscover, getSearch, imageUrl } from "../services/Api";
import moment from "moment";
import GetCertification from "./GetCertification";

const Card = (item: TrendingMovie) => {
    const releaseDate = moment(
        item?.release_date || item?.first_air_date
    ).format("YYYY");
    const matchGenres = (
        genres: { id: number; name: string }[],
        genreList: {
            includes(id: number): unknown;
            id: number;
            name: string;
        }
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
                        {item.vote_average && item.vote_average.toFixed(1)}★
                    </Text>
                </div>
            ));
    return (
        <>
            <Anchor
                component={Link}
                to={`/${item?.media_type}/${item?.id}`}
                underline="never"
            >
                <Paper className={classes.poster}>
                    <AspectRatio ratio={2 / 3}>
                        <Image
                            src={
                                item?.poster_path
                                    ? `${imageUrl}/${item.poster_path}`
                                    : item?.profile_path
                                    ? `${imageUrl}/${item.profile_path}`
                                    : `https://placehold.co/800x1200?text=${
                                          item.name || item.title
                                      }`
                            }
                            radius={"md"}
                            alt="poster"
                            loading="lazy"
                        />
                    </AspectRatio>
                    <Box className={classes.overlay_card} pb={"xl"}>
                        <Flex
                            direction={"column"}
                            justify={"flex-end"}
                            h={"100%"}
                            px={"10%"}
                        >
                            <Title
                                style={{ textAlign: "center" }}
                                order={3}
                                fw={1000}
                                c={"white"}
                            >
                                {item?.title || item?.name}
                            </Title>
                            {item.genre_ids &&
                                matchGenres(genreAll, item.genre_ids)}
                            <Flex
                                direction={"row"}
                                justify={"center"}
                                gap={"sm"}
                            >
                                {item?.condition && (
                                    <Paper
                                        w={"fit-content"}
                                        mt={"0.5vw"}
                                        radius={"sm"}
                                        py={"2px"}
                                        px={"8px"}
                                        style={{
                                            backgroundColor:
                                                "rgba(200,200,200)",
                                        }}
                                    >
                                        <Text
                                            c={"black"}
                                            fw={600}
                                            fz={"sm"}
                                            className={classes.category}
                                            style={{ textAlign: "center" }}
                                        >
                                            {item?.media_type === "person"
                                                ? item?.gender === 1
                                                    ? "Female"
                                                    : item.gender === 2
                                                    ? "Male"
                                                    : "Non-Binary"
                                                : item?.media_type}
                                        </Text>
                                    </Paper>
                                )}
                                {item.media_type !== "person" && (
                                    <Paper
                                        w={"fit-content"}
                                        mt={"0.5vw"}
                                        radius={"sm"}
                                        py={"2px"}
                                        px={"8px"}
                                        style={{
                                            backgroundColor:
                                                "rgba(200,200,200)",
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
                                )}
                            </Flex>
                            <Text
                                size="xs"
                                lineClamp={2}
                                c={"white"}
                                pt={"0.5vw"}
                                style={{ textAlign: "center" }}
                            >
                                {item.overview}
                            </Text>
                        </Flex>
                    </Box>
                </Paper>
            </Anchor>
        </>
    );
};

const MainGrid = ({
    type,
    sortBy,
    searchQuery,
}: {
    type: string;
    sortBy?: string;
    searchQuery: string;
}) => {
    const router = useParams();
    const { page } = router;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const activePage = parseInt(page) || 1;

    useEffect(() => {
        if (searchQuery) {
            getSearch(type, searchQuery, page || 1)
                .then((res) => {
                    setData(res?.data);
                })
                .catch((err) => {
                    console.log(err, "error");
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            getDiscover(type, page, sortBy)
                .then((res) => {
                    setData(res?.data);
                })
                .catch((err) => {
                    console.log(err, "error");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [type, page, sortBy, searchQuery]);

    type !== "multi" &&
        data?.results &&
        data?.results.map((element: { [x: string]: string }) => {
            element["media_type"] = type;
            return element;
        });

    type === "multi" &&
        data?.results &&
        data?.results.map((element: { [x: string]: string }) => {
            element["condition"] = "search";
            return element;
        });

    const gridChild =
        data?.results &&
        data?.results.map((item, i) => (
            <Grid.Col key={item.id} span={{ base: 20, sm: 10, md: 5, lg: 4 }}>
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
                    <Card {...item} />
                )}
            </Grid.Col>
        ));

    if (loading) {
        return (
            <Box h={"100vh"}>
                <Flex justify={"center"} align={"center"} h={"90vh"}>
                    <LoadingOverlay
                        zIndex={1000}
                        visible={loading}
                        loaderProps={{ color: "blue", type: "bars" }}
                    />
                </Flex>
            </Box>
        );
    }

    return (
        <>
            <Box pt={"xl"}>
                <Container size={"mainXl"}>
                    {searchQuery && (
                        <Box
                            maw={"fit-content"}
                            ml={"auto"}
                            mr={"auto"}
                            pb={"xl"}
                        >
                            <Title order={3}>
                                Searching:{" "}
                                <Title
                                    order={3}
                                    c={"blue"}
                                    component="span"
                                    fw={900}
                                >
                                    {searchQuery}
                                </Title>
                            </Title>
                        </Box>
                    )}
                    {data?.results.length === 0 && !loading ? (
                        <Flex
                            w={"fit-content"}
                            ml={"auto"}
                            mr={"auto"}
                            py={"xl"}
                            justify={"center"}
                            align={"center"}
                        >
                            <Title>No Results Found</Title>
                        </Flex>
                    ) : (
                        <>
                            <Box
                                ml={"auto"}
                                maw={"fit-content"}
                                // pt={"xl"}
                                mr={"auto"}
                            >
                                <Pagination
                                    total={
                                        data.total_pages <= 500
                                            ? data.total_pages
                                            : 500
                                    }
                                    value={activePage}
                                    onChange={(e) => {
                                        window.location.href = `/${
                                            type === "movie"
                                                ? "movies"
                                                : type === "tv"
                                                ? "series"
                                                : "search"
                                        }/${e}${
                                            sortBy ? `?&sort_by=${sortBy}` : ``
                                        }${
                                            searchQuery
                                                ? `?query=${searchQuery}`
                                                : ``
                                        }`;
                                    }}
                                    siblings={2}
                                    withEdges
                                />
                            </Box>
                            <Grid
                                columns={20}
                                p={"4vh 0"}
                                gutter={{ base: "lg", md: "xl" }}
                                justify="center"
                            >
                                {gridChild}
                            </Grid>

                            <Box
                                ml={"auto"}
                                maw={"fit-content"}
                                pb={"xl"}
                                mr={"auto"}
                            >
                                <Pagination
                                    total={
                                        data.total_pages <= 500
                                            ? data.total_pages
                                            : 500
                                    }
                                    value={activePage}
                                    onChange={(e) => {
                                        window.location.href = `/${
                                            type === "movie"
                                                ? "movies"
                                                : type === "tv"
                                                ? "series"
                                                : "search"
                                        }/${e}${
                                            sortBy ? `?&sort_by=${sortBy}` : ``
                                        }${
                                            searchQuery
                                                ? `?query=${searchQuery}`
                                                : ``
                                        }`;
                                    }}
                                    siblings={2}
                                    withEdges
                                />
                            </Box>
                        </>
                    )}
                </Container>
            </Box>
        </>
    );
};

export default MainGrid;
