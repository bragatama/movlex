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
import { useEffect, useState } from "react";
import { getSimilar, imageUrl } from "../services/Api";
import classes from "../css/CarouselCard.module.css";
import { genreAll, List } from "../types/types";
import moment from "moment";
import { Link, useParams } from "react-router-dom";

const Card = (item: List) => {
    const router = useParams();
    const { type } = router;
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
                        c={"dimmed"}
                    >
                        {genre.name} • {releaseDate} •{" "}
                        {item.vote_average.toFixed(1)}★
                    </Text>
                </div>
            ));
    return (
        <Anchor component={Link} to={`/${type}/${item.id}`} underline="never">
            <Paper className={classes.poster}>
                <AspectRatio ratio={2 / 3}>
                    <Image
                        src={`${imageUrl}/${item.poster_path}`}
                        radius={"md"}
                        alt="similar"
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
                        {item?.title || item?.name}
                    </Title>
                    {matchGenres(genreAll, item.genre_ids)}
                </Flex>
            </Box>
        </Anchor>
    );
};

const GetSimilar = ({
    type,
    id,
}: {
    type: string | undefined;
    id: string | undefined;
}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSimilar(type, id)
            .then((res) => {
                setData(res.results);
            })
            .catch((err) => {
                console.log(err, "error");
            })
            .finally(() => setLoading(false));
    }, [type, id]);

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
            <Title
                c={"white"}
                order={2}
                style={{ margin: "0px" }}
                tt={"capitalize"}
            >
                More Like This
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
                    {slides}
                </Carousel>
            </Box>
        </>
    );
};

export default GetSimilar;
