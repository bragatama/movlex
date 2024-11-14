import {
    Anchor,
    AspectRatio,
    Box,
    Container,
    Flex,
    Grid,
    Image,
    LoadingOverlay,
    Paper,
    Text,
    Title,
} from "@mantine/core";
import { useFirestore } from "./services/firestore";
import { useAuth } from "./context/UseAuth";
import { useEffect, useState } from "react";
import { imageUrl } from "./services/Api";
import classes from "./css/CarouselCard.module.css";
import { Link } from "react-router-dom";
import moment from "moment";

const Watchlist = () => {
    const { user } = useAuth();
    const { getWatchlist } = useFirestore();
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (user?.uid) {
            getWatchlist(user?.uid)
                .then((res) => {
                    setWatchlist(res);
                })
                .catch((err) => {
                    console.log(err, "error");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
        return () => {};
    }, [user, getWatchlist]);
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
        <Box pt={"xl"}>
            <Container size={"mainXl"}>
                <Title order={1} c={"white"}>
                    Watchlist
                </Title>
                <Flex direction={"column"} py={"5vh"} gap={"lg"}>
                    {!loading && watchlist.length === 0 && (
                        <Title order={4} c={"white"}>
                            Watchlist is empty
                        </Title>
                    )}
                    {!loading &&
                        watchlist.length > 0 &&
                        watchlist?.map((item) => (
                            <Anchor
                                key={item.id}
                                component={Link}
                                to={`/${item.type}/${item.id}`}
                                underline="never"
                            >
                                <Flex
                                    direction={{ base: "column", lg: "row" }}
                                    align={"center"}
                                    gap={"md"}
                                    p={"md"}
                                    className={classes.watchlist_poster}
                                >
                                    <AspectRatio
                                        ratio={2 / 3}
                                        maw={"40%"}
                                        miw={"fit-content"}
                                        mah={"100%"}
                                        mih={"fit-content"}
                                    >
                                        <Image
                                            src={`${imageUrl}/${item.poster_path}`}
                                            h={"50vh"}
                                            radius={"md"}
                                            alt="poster"
                                            loading="lazy"
                                        />
                                    </AspectRatio>
                                    <Flex direction={"column"} gap={"md"}>
                                        <Title order={2} c={"white"}>
                                            {item.title}
                                        </Title>
                                        <Grid
                                            columns={10}
                                            gutter={"xs"}
                                            justify="flex-start"
                                            align="center"
                                        >
                                            <Grid.Col span={"content"}>
                                                <Text fw={600} c={"gray"}>
                                                    {moment(
                                                        item.release_date
                                                    ).format("YYYY")}
                                                </Text>
                                            </Grid.Col>
                                            <Grid.Col span={"content"}>
                                                <Paper
                                                    w={"fit-content"}
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
                                                        className={
                                                            classes.category
                                                        }
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        {item.type}
                                                    </Text>
                                                </Paper>
                                            </Grid.Col>
                                            <Grid.Col span={"content"}>
                                                <Text fw={600} c={"gray"}>
                                                    {item.vote_average.toFixed(
                                                        1
                                                    )}{" "}
                                                    ★
                                                </Text>
                                            </Grid.Col>
                                        </Grid>
                                        <Text
                                            fw={500}
                                            c={"white"}
                                            lineClamp={4}
                                        >
                                            {item.overview}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Anchor>
                        ))}
                </Flex>
            </Container>
        </Box>
    );
};

export default Watchlist;
