import { useEffect, useState } from "react";
import { castOrCrew, Credits } from "../types/types";
import { getCredit, imageOriginalUrl } from "../services/Api";
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
import { Carousel } from "@mantine/carousel";
import classes from "../css/CarouselCard.module.css";
import { Link } from "react-router-dom";

const Card = (item: castOrCrew) => {
    return (
        <Anchor component={Link} to={`/person/${item.id}`} underline="never">
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
            <Box>
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
                        c={"dimmed"}
                    >
                        as {item?.character && item?.character}
                        {item.roles && item.roles[0]?.character}
                    </Text>
                </Flex>
            </Box>
        </Anchor>
    );
};

const GetCredit = ({
    type,
    id,
    label,
    isGuestStar,
    guestStars,
}: {
    type?: string | undefined;
    id?: string | undefined;
    label: string;
    isGuestStar?: boolean;
    guestStars?: [];
}) => {
    const [credits, setCredits] = useState<Credits>();
    const [guestStar, setGuestStar] = useState<Credits>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!isGuestStar) {
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
        } else {
            setGuestStar(guestStars);
            setLoading(false);
        }
    }, [type, id, isGuestStar, guestStars]);

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
    const slidesGuestStars =
        guestStar &&
        guestStar.map((item, i) => (
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
                {label === "cast" && "Main Cast & Crew"}
                {label === "guest star" && "Guest Stars on this Episode"}
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
                    {label === "cast" && slidesCast}
                    {label === "crew" && slidesCrew}
                    {label === "guest star" && slidesGuestStars}
                </Carousel>
            </Box>
        </>
    );
};

export default GetCredit;
