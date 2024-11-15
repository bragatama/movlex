import {
    Anchor,
    AspectRatio,
    Box,
    Flex,
    Grid,
    Image,
    LoadingOverlay,
    Paper,
    Skeleton,
    Text,
    Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetailSeason, imageOriginalUrl, imageUrl } from "../services/Api";
import { Seasons } from "../types/types";
import classes from "../css/CarouselCard.module.css";
import moment from "moment";

const GetDetailsSeason = ({ name }: { name: string }) => {
    const router = useParams();
    const { id, season } = router;
    const [seasons, setSeasons] = useState<Seasons>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDetailSeason(id, season)
            .then((res) => {
                setSeasons(res);
            })
            .catch((err) => {
                console.log(err, "error");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, season]);
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
        <Flex
            direction={{ base: "column-reverse", lg: "row" }}
            justify={{ base: "center", lg: "space-between" }}
            align={{ base: "center", lg: "flex-start" }}
            gap={"xl"}
        >
            <meta name="keyword" content={`${name}, tv series, tv shows`} />
            <Flex direction={"column"} gap={"md"}>
                <Flex direction={"row"} gap={"sm"}>
                    <Anchor component={Link} to={`/tv/${id}/`}>
                        <Title order={4} c={"white"}>
                            {name}
                        </Title>
                    </Anchor>
                    <Title order={4} c={"dimmed"}>
                        {" "}
                        /
                    </Title>
                </Flex>
                <Title order={1} c={"white"}>
                    {seasons?.name}
                </Title>
                <Text fw={500}>{seasons?.overview}</Text>
                <Title order={3} c={"white"} pt={"1vh"}>
                    Episodes
                </Title>
                {seasons?.episodes &&
                    seasons.episodes.map((item) => (
                        <Anchor
                            component={Link}
                            to={`/tv/${id}/season/${season}/episode/${item.episode_number}`}
                            underline="never"
                            key={item.id}
                        >
                            <Paper className={classes.episode_card} p={"xs"}>
                                <Flex
                                    direction={{ base: "column", lg: "row" }}
                                    justify={"flex-start"}
                                    align={"center"}
                                    gap={"xl"}
                                >
                                    <AspectRatio
                                        ratio={16 / 9}
                                        miw={{ md: "0vw", xl: "30%" }}
                                        mah={{ md: "60vh" }}
                                        maw={{ sm: "80vw", lg: "30%" }}
                                    >
                                        <Image
                                            src={item?.still_path
                                                ? `${imageUrl}/${item?.still_path}`
                                                : `https://placehold.co/800x1200?text=${item.name}`}
                                            h={"100%"}
                                            alt="still image"
                                            radius={"md"}
                                            loading="lazy"
                                        />
                                    </AspectRatio>
                                    <Flex direction={"column"}>
                                        <Title order={4} c={"white"}>
                                            <Title
                                                order={4}
                                                component="span"
                                                c={"dimmed"}
                                            >
                                                {item.episode_number}
                                                &emsp;&mdash;&emsp;
                                            </Title>
                                            {item.name}
                                        </Title>
                                        <Grid
                                            columns={20}
                                            gutter={"lg"}
                                            justify="flex-start"
                                            align="center"
                                            pb={"xl"}
                                        >
                                            <Grid.Col span={"content"}>
                                                <Text fw={500} c={"dimmed"}>
                                                    {moment(
                                                        item.air_date
                                                    ).format("MMM Do, YYYY")}
                                                </Text>
                                            </Grid.Col>
                                            <Grid.Col span={"content"}>
                                                <Text fw={500} c={"dimmed"}>
                                                    {Math.floor(
                                                        item?.runtime / 60
                                                    ) === 0
                                                        ? ""
                                                        : Math.floor(
                                                              item?.runtime / 60
                                                          ) + "h "}
                                                    {item?.runtime % 60}m
                                                </Text>
                                            </Grid.Col>
                                            <Grid.Col span={"content"}>
                                                <Text fw={500} c={"dimmed"}>
                                                    {item.vote_average.toFixed(
                                                        1
                                                    )}{" "}
                                                    ★
                                                </Text>
                                            </Grid.Col>
                                        </Grid>
                                        <Text fw={500} lineClamp={4} c={"gray"}>
                                            {item.overview}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Paper>
                        </Anchor>
                    ))}
            </Flex>
            <AspectRatio
                ratio={2 / 3}
                maw={"100%"}
                miw={"fit-content"}
                mah={"100%"}
                mih={"fit-content"}
            >
                {loading ? (
                    <Skeleton height={"auto"}>
                        <Image
                            src={"https://placehold.co/800x1200"}
                            h={"70vh"}
                            radius={"md"}
                            alt="skeleton"
                            loading="lazy"
                        />
                    </Skeleton>
                ) : (
                    <Image
                        src={seasons?.poster_path
                            ? `${imageOriginalUrl}/${seasons?.poster_path}`
                            : `https://placehold.co/800x1200?text=${seasons?.name}`}
                        mah={{ xs: "100vh", md: "70vh", lg: "60vh" }}
                        maw={{ xs: "40vw", md: "100vw", lg: "100%" }}
                        radius={"md"}
                        loading="lazy"
                    />
                )}
            </AspectRatio>
        </Flex>
    );
};

export default GetDetailsSeason;
