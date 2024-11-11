import { Carousel } from "@mantine/carousel";
import {
    AspectRatio,
    Box,
    Paper,
    Skeleton,
    Title,
    Flex,
    Text,
    Image,
    Anchor,
} from "@mantine/core";
import { seasonList } from "../types/types";
import { imageOriginalUrl } from "../services/Api";
import classes from "../css/CarouselCard.module.css";
import { Link, useParams } from "react-router-dom";

const Card = (item: seasonList) => {
    const router = useParams();
    const { type, id } = router;
    return (
        <>
            <Anchor
                component={Link}
                to={`/${type}/${id}/season/${item.season_number}`}
                underline="never"
            >
                <Paper className={classes.poster}>
                    <AspectRatio ratio={2 / 3}>
                        <Image
                            src={
                                item.poster_path
                                    ? `${imageOriginalUrl}/${item.poster_path}`
                                    : "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png"
                            }
                            radius={"md"}
                        />
                    </AspectRatio>
                </Paper>
                <Box pb={"xl"}>
                    <Flex direction={"column"} justify={"flex-end"} h={"100%"}>
                        <Title
                            style={{ textAlign: "center" }}
                            order={4}
                            fw={1000}
                            c={"white"}
                        >
                            {item.name}
                        </Title>
                        <Text
                            size="sm"
                            fw={500}
                            style={{ textAlign: "center" }}
                            c={"rgba(255,255,255,0.4)"}
                        >
                            {item.episode_count} Episode{"(s) "} •{" "}
                            {item.vote_average.toFixed(1)}★
                        </Text>
                    </Flex>
                </Box>
            </Anchor>
        </>
    );
};

const GetSeason = ({ season, loading }: { season: []; loading: boolean }) => {
    const slides =
        season &&
        season.map((item, i) => (
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
            <Title order={2} style={{ margin: "0px" }} tt={"capitalize"}>
                Seasons
            </Title>
            <Box h={"100%"} display={"flex"}>
                <Carousel
                    slideSize={{ base: "40%", sm: "30%", md: "15%" }}
                    slideGap={"sm"}
                    includeGapInSize={false}
                    style={{
                        // marginLeft: "calc((-100vw + 100%) / 2)",
                        // marginRight: "calc((-100vw + 100%) / 2)",
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

export default GetSeason;
