import {
    AspectRatio,
    Flex,
    Grid,
    Image,
    Paper,
    Skeleton,
    Text,
    Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailSeason, imageOriginalUrl } from "../services/Api";
import { Seasons } from "../types/types";
import moment from "moment";

const GetDetailsSeason = () => {
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
    return (
        <Flex direction={"row"} gap={"xl"} justify={"space-between"}>
            <Flex direction={"column"} gap={"md"}>
                <Title order={1} c={"white"}>
                    {seasons?.name}
                </Title>
                <Text fw={500}>{seasons?.overview}</Text>
                <Title order={3} c={"white"} pt={"1vh"}>
                    Episodes
                </Title>
                {seasons?.episodes &&
                    seasons.episodes.map((item) => (
                        <Paper>
                            <Flex
                                direction={"row"}
                                justify={"flex-start"}
                                align={"center"}
                                gap={"xl"}
                            >
                                <AspectRatio ratio={16 / 9} maw={"30%"}>
                                    <Image
                                        src={`${imageOriginalUrl}/${item?.still_path}`}
                                        mah={"100%"}
                                        radius={"md"}
                                    />
                                </AspectRatio>
                                <Flex direction={"column"}>
                                    <Title order={4} c={"white"}>
                                        #{item.episode_number}. {item.name}
                                    </Title>
                                    <Grid
                                        columns={20}
                                        gutter={"lg"}
                                        justify="flex-start"
                                        align="center"
                                        pb={'xl'}
                                    >
                                        <Grid.Col span={"content"}>
                                            <Text fw={500}>
                                                {moment(item.air_date).format(
                                                    "MMM Do, YYYY"
                                                )}
                                            </Text>
                                        </Grid.Col>
                                        <Grid.Col span={"content"}>
                                            <Text fw={500}>
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
                                            <Text fw={500}>
                                                {item.vote_average.toFixed(1)} ★
                                            </Text>
                                        </Grid.Col>
                                    </Grid>
                                    <Text fw={500}>{item.overview}</Text>
                                </Flex>
                            </Flex>
                        </Paper>
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
                        />
                    </Skeleton>
                ) : (
                    <Image
                        src={`${imageOriginalUrl}/${seasons?.poster_path}`}
                        h={"70vh"}
                        radius={"md"}
                    />
                )}
            </AspectRatio>
        </Flex>
    );
};

export default GetDetailsSeason;
