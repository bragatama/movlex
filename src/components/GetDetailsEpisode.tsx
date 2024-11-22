import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Episodes } from "../types/types";
import { getDetailEpisode, imageOriginalUrl } from "../services/Api";
import {
    Anchor,
    AspectRatio,
    Box,
    Flex,
    Image,
    LoadingOverlay,
    Title,
} from "@mantine/core";
import moment from "moment";
import GetCredit from "./GetCredit";

const GetDetailsEpisode = ({
    name,
    seasonName,
}: {
    name: string | undefined;
    seasonName: string | undefined;
}) => {
    const router = useParams();
    const { id, season, episode } = router;
    const [episodes, setEpisodes] = useState<Episodes>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDetailEpisode(id, season, episode)
            .then((res) => {
                setEpisodes(res);
            })
            .catch((err) => {
                console.log(err, "Retrive data episode error");
            })
            .finally(() => {
                setLoading(false);
            });
        return () => {};
    }, [id, season, episode]);

    // console.log(episodes);
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
        <Flex direction={"column"} gap={"md"}>
            <meta name="keyword" content={`${name}, ${episodes?.name}`} />
            <Flex direction={"row"} gap={"sm"}>
                <Anchor component={Link} to={`/tv/${id}/`}>
                    <Title order={4} c={"white"}>
                        {name}
                    </Title>
                </Anchor>
                <Title order={4} c={"dimmed"}>
                    {" "}
                    /{" "}
                </Title>
                <Anchor component={Link} to={`/tv/${id}/season/${season}`}>
                    <Title order={4} c={"white"}>
                        {seasonName}
                    </Title>
                </Anchor>
                <Title order={4} c={"dimmed"}>
                    {" "}
                    /
                </Title>
            </Flex>
            <Title order={1} c={"white"}>
                <Title order={1} c={"dimmed"} component={"span"}>
                    {episodes?.episode_number} &mdash;{" "}
                </Title>
                {episodes?.name}
            </Title>
            <Title order={4} c={"dimmed"}>
                Air Date: &emsp;
                <Title order={4} c={"white"} component={"span"}>
                    {moment(episodes?.air_date).format("dddd, D MMMM YYYY")}
                </Title>
            </Title>
            <Title order={4} c={"dimmed"}>
                Runtime: &emsp;
                <Title order={4} c={"white"} component={"span"}>
                    {episodes?.runtime &&
                    Math.floor(episodes?.runtime / 60) === 0
                        ? ""
                        : episodes?.runtime &&
                          Math.floor(episodes?.runtime / 60) + " hour, "}
                    {episodes?.runtime && episodes?.runtime % 60} minutes
                </Title>
            </Title>
            <Title order={4} c={"dimmed"}>
                Rating: &emsp;
                <Title order={4} c={"white"} component={"span"}>
                    {episodes?.vote_average &&
                        episodes?.vote_average.toFixed(1)}{" "}
                    ★
                </Title>
            </Title>
            <AspectRatio
                ratio={16 / 9}
                maw={"100%"}
                miw={"fit-content"}
                mah={"100%"}
                mih={"fit-content"}
            >
                <Image
                    src={
                        episodes?.still_path
                            ? `${imageOriginalUrl}/${episodes?.still_path}`
                            : `https://placehold.co/1280x720?text=${name}`
                    }
                    h={"100%"}
                    maw={"60vw"}
                    alt="still image"
                    radius={"md"}
                    loading="lazy"
                />
            </AspectRatio>
            <GetCredit type={"tv"} id={id} label="cast" />
            <GetCredit
                label="guest star"
                isGuestStar={true}
                guestStars={episodes?.guest_stars}
            />
        </Flex>
    );
};

export default GetDetailsEpisode;
