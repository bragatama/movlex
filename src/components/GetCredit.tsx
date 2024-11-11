import { useEffect, useState } from "react";
import { castOrCrew, Credits } from "../types/types";
import { getCredit, imageOriginalUrl } from "../services/Api";
import {
    AspectRatio,
    Box,
    Flex,
    Image,
    Paper,
    Skeleton,
    Text,
    Title,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import classes from "../css/CarouselCard.module.css";

const Card = (item: castOrCrew) => {
    return (
        <>
            <Paper className={classes.poster}>
                <AspectRatio ratio={2 / 3}>
                    <Image
                        src={
                            item.profile_path
                                ? `${imageOriginalUrl}/${item.profile_path}`
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
                        as {item.character}
                    </Text>
                </Flex>
            </Box>
            {/* <Title style={{ textAlign: 'center' }} order={4} pt={"1vh"} fw={1000} c={'white'}>{item?.title || item?.name}</Title>
                {matchGenres(genreAll, item.genre_ids)} */}
        </>
    );
};

const GetCredit = ({
    type,
    id,
    label,
}: {
    type: string;
    id: number;
    label: string;
}) => {
    const [credits, setCredits] = useState<Credits>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getCredit(type, id)
            .then((res) => {
                setCredits(res);
            })
            .catch((err) => {
                console.log(err, "error");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [type, id]);

    const slidesCrew =
        credits &&
        credits.crew.map((item, i) => (
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
    const slidesCast =
        credits &&
        credits.cast.map((item, i) => (
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
            <Title
                c={"white"}
                order={2}
                style={{ margin: "0px" }}
                tt={"capitalize"}
            >
                {label}
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
                    {label === "cast" ? slidesCast : slidesCrew}
                </Carousel>
            </Box>
        </>
    );
};

export default GetCredit;
