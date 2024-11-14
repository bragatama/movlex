import {
    Anchor,
    AspectRatio,
    Box,
    Button,
    Container,
    Flex,
    Grid,
    Image,
    Paper,
    Skeleton,
    Text,
    Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    getDetail,
    getVideos,
    imageOriginalUrl,
    imageUrl,
} from "../services/Api";
import { Detail } from "../types/types";
import moment from "moment";
import GetCertification from "../components/GetCertification";
import FetchLogo from "../components/FetchLogo";
import { IconCircleCheck, IconPlus } from "@tabler/icons-react";
import GetCredit from "../components/GetCredit";
import GetTrailer from "../components/GetTrailer";
import GetSeason from "../components/GetSeason";
import GetDetailsSeason from "../components/GetDetailsSeason";
import GetSimilar from "../components/GetSimilar";
import GetDetailsEpisode from "../components/GetDetailsEpisode";
import { useAuth } from "../context/UseAuth";
import { notifications } from "@mantine/notifications";
import { useFirestore } from "../services/firestore";
import classes from "../css/CarouselCard.module.css";

const DetailsPage = () => {
    const router = useParams();
    const { type, id, season, episode } = router;
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState<Detail>();
    const [video, setVideo] = useState();
    const { addToWatchlist, checkWatchlist, removeFromWatchlist } =
        useFirestore();
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [detailsData, videosData] = await Promise.all([
                    getDetail(type, id),
                    getVideos(type, id),
                ]);
                setDetails(detailsData);

                const trailer = videosData?.results.find(
                    (video) => video.type === "Trailer"
                );
                setVideo(trailer);
            } catch (error) {
                console.log(error, "error");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        document.title = details?.name || details?.title;
        window.scrollTo(0, 0);
    }, [type, id, details?.name, details?.title]);

    const title = details?.title || details?.name;
    const releaseDateMovie = moment(details?.release_date).format(
        "MMM Do, YYYY"
    );
    const releaseDateTv =
        details?.status === "Ended"
            ? moment(details?.first_air_date).format("YYYY") ===
              moment(details?.last_air_date).format("YYYY")
                ? moment(details?.first_air_date).format("YYYY")
                : moment(details?.first_air_date).format("YYYY") +
                  " - " +
                  moment(details?.last_air_date).format("YYYY")
            : moment(details?.first_air_date).format("YYYY") + " - Present";

    const { user } = useAuth();

    const handleAddToWatchlist = async () => {
        if (!user) {
            notifications.show({
                title: "Error while adding to Watchlist",
                message: "You have to login in order to add to watchlist",
                position: "bottom-right",
                autoClose: 5000,
                color: "red",
                style: { backgroundColor: "rgba(50,0,0,1)" },
            });
            return;
        }
        const data = {
            id: details?.id,
            title: details?.title || details?.name,
            type: type,
            poster_path: details?.poster_path,
            release_date: details?.release_date || details?.first_air_date,
            overview: details?.overview,
            vote_average: details?.vote_average,
        };
        await addToWatchlist(user?.uid, data?.id?.toString(), data);

        const isSetToWatchlist = await checkWatchlist(
            user?.uid,
            data.id?.toString()
        );
        setIsInWatchlist(isSetToWatchlist);
    };
    useEffect(() => {
        if (!user) {
            setIsInWatchlist(false);
            return;
        }
        checkWatchlist(user?.uid, id?.toString()).then((res) => {
            setIsInWatchlist(res);
        });
    }, [user, checkWatchlist, id]);

    const handleRemoveFromWathclist = async () => {
        await removeFromWatchlist(user?.uid, id?.toString());
        const isSetToWatchlist = await checkWatchlist(
            user?.uid,
            id?.toString()
        );
        setIsInWatchlist(isSetToWatchlist);
    };
    return (
        <Box>
            <meta
                name="description"
                content="show detail information about movie or tv show, from their description, name, runtime, logo, cast, guest star, how many season, how many episode, and similar movie or tv show to that movie or tv show"
            />
            <meta
                name="keyword"
                content={`${details?.name} ${details?.title} ${details?.overview} ${details?.name} ${details?.tagline} ${details?.type}`}
            />
            <Box
                // Background Images
                style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7628279705436862) 30%, rgba(0,0,0,0) 100%),
                    linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
                    url(${imageOriginalUrl}/${details?.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <Container size={"mainXl"} style={{ zIndex: 1000 }} py={"4vh"}>
                    <Flex
                        gap={"5vw"}
                        direction={{ base: "column", lg: "row" }}
                        align={"center"}
                        maw={"100%"}
                    >
                        {/* Poster */}
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
                                    src={`${imageOriginalUrl}/${details?.poster_path}`}
                                    mah={"70vh"}
                                    radius={"md"}
                                    alt="poster"
                                    loading="lazy"
                                />
                            )}
                        </AspectRatio>
                        <Flex
                            direction={"column"}
                            align={{ base: "center", lg: "flex-start" }}
                            h={"auto"}
                        >
                            {/* Logo */}
                            <FetchLogo
                                id={id}
                                type={type}
                                style={{
                                    paddingBottom: "20px",
                                    height: "25vh",
                                    objectFit: "contain",
                                }}
                                maw={{ sm: "40vw", lg: "25vw" }}
                            />
                            <Title order={1} c={"white"} fw={1000}>
                                {title}
                            </Title>
                            <Text size="md" fw={700}>
                                {details?.original_name === details?.name
                                    ? ""
                                    : details?.original_name}
                                {details?.original_title === details?.title
                                    ? ""
                                    : details?.original_title}
                            </Text>
                            <Grid
                                columns={20}
                                gutter={"lg"}
                                justify="flex-start"
                                align="center"
                                pt={"2vh"}
                            >
                                <Grid.Col span={"content"}>
                                    <Text fw={600}>
                                        {details?.release_date
                                            ? releaseDateMovie
                                            : releaseDateTv}
                                    </Text>
                                </Grid.Col>
                                {details?.number_of_seasons && (
                                    <>
                                        <Grid.Col span={"content"}>
                                            <Text fw={600}>
                                                {details.number_of_seasons}{" "}
                                                season
                                                {"(s)"}
                                            </Text>
                                        </Grid.Col>
                                        <Grid.Col span={"content"}>
                                            <Text fw={600}>
                                                {details.number_of_episodes}{" "}
                                                episode
                                                {"(s)"}
                                            </Text>
                                        </Grid.Col>
                                    </>
                                )}

                                {details?.runtime && (
                                    <Grid.Col span={"content"}>
                                        <Text fw={600}>
                                            {Math.floor(
                                                details?.runtime / 60
                                            ) === 0
                                                ? ""
                                                : Math.floor(
                                                      details?.runtime / 60
                                                  ) + "h "}
                                            {details?.runtime % 60}m
                                        </Text>
                                    </Grid.Col>
                                )}

                                <Grid.Col span={"content"}>
                                    <Paper
                                        radius={"sm"}
                                        py={"2px"}
                                        px={"8px"}
                                        style={{
                                            backgroundColor:
                                                "rgba(200,200,200)",
                                        }}
                                    >
                                        <Text c={"black"} fw={600}>
                                            <GetCertification
                                                type={type}
                                                id={id}
                                                isOn={true}
                                            />
                                        </Text>
                                    </Paper>
                                </Grid.Col>
                                <Grid.Col span={"content"}>
                                    <Text fw={600}>
                                        {details?.vote_average.toFixed(1)} ★
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={"content"}>
                                    <Button
                                        variant="filled"
                                        color="rgba(200,200,200) "
                                        h={"100%"}
                                        py={"2px"}
                                        px={"8px"}
                                    >
                                        <Anchor
                                            component={Link}
                                            to={details?.homepage}
                                            underline="never"
                                        >
                                            <Text fw={600} c={"black"}>
                                                Website
                                            </Text>
                                        </Anchor>
                                    </Button>
                                </Grid.Col>
                                <Grid.Col span={"content"}>
                                    {isInWatchlist ? (
                                        <Button
                                            variant="outline"
                                            color="green"
                                            w={200}
                                            onClick={handleRemoveFromWathclist}
                                        >
                                            <IconCircleCheck size={20} />
                                            <Text fw={600}>
                                                &nbsp; In watchlist
                                            </Text>
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            color="blue"
                                            onClick={handleAddToWatchlist}
                                        >
                                            <IconPlus size={20} />
                                            <Text fw={600}>
                                                &nbsp; Add to watchlist
                                            </Text>
                                        </Button>
                                    )}
                                </Grid.Col>
                            </Grid>
                            {details?.tagline ? (
                                <Text
                                    size="xl"
                                    fw={600}
                                    fs={"italic"}
                                    c="white"
                                    py={"5vh"}
                                    pl={"3vw"}
                                >
                                    {details?.tagline}
                                </Text>
                            ) : (
                                ""
                            )}
                            <Text fw={500} py={details?.tagline ? "" : "5vh"}>
                                {details?.overview}
                            </Text>
                            <Grid pt={"2vh"} align="center" gutter={"md"}>
                                {details?.genres.map(
                                    (genre: { id: number; name: string }) => (
                                        <Grid.Col
                                            key={genre.id}
                                            span={"content"}
                                        >
                                            <Paper
                                                radius={"sm"}
                                                py={"2px"}
                                                px={"8px"}
                                                style={{
                                                    backgroundColor:
                                                        "rgba(200,200,200, 0.5)",
                                                }}
                                            >
                                                <Text
                                                    c={"black"}
                                                    fw={600}
                                                    size="sm"
                                                >
                                                    {genre.name}
                                                </Text>
                                            </Paper>
                                        </Grid.Col>
                                    )
                                )}
                            </Grid>
                            {details?.networks ? (
                                <>
                                    <Grid
                                        pt={"2vh"}
                                        align="center"
                                        gutter={"md"}
                                    >
                                        {details?.networks
                                            .slice(0, 4)
                                            .map(
                                                (netowrk: {
                                                    id: number;
                                                    name: string;
                                                    logo_path: string;
                                                }) => (
                                                    <Grid.Col
                                                        span={"content"}
                                                        key={netowrk.id}
                                                    >
                                                        <Paper
                                                            radius={"sm"}
                                                            p={"1vh"}
                                                            style={{
                                                                backgroundColor:
                                                                    "rgba(200,200,200)",
                                                            }}
                                                        >
                                                            <Image
                                                                src={`${imageUrl}/${netowrk.logo_path}`}
                                                                h={"3vh"}
                                                                alt="network logo"
                                                                title={
                                                                    netowrk.name
                                                                }
                                                                loading="lazy"
                                                            />
                                                        </Paper>
                                                    </Grid.Col>
                                                )
                                            )}
                                    </Grid>
                                </>
                            ) : (
                                <Grid pt={"2vh"} align="center" gutter={"md"}>
                                    {details?.production_companies
                                        .slice(0, 1)
                                        .map(
                                            (production: {
                                                id: number;
                                                name: string;
                                                logo_path: string;
                                            }) => (
                                                <Grid.Col
                                                    span={"content"}
                                                    key={production.id}
                                                >
                                                    <Paper
                                                        radius={"sm"}
                                                        p={"1vh"}
                                                        style={{
                                                            backgroundColor:
                                                                "rgba(200,200,200)",
                                                        }}
                                                    >
                                                        <Image
                                                            src={`${imageUrl}/${production.logo_path}`}
                                                            h={"3vh"}
                                                            alt="production logo"
                                                            title={
                                                                production.name
                                                            }
                                                            loading="lazy"
                                                        />
                                                    </Paper>
                                                </Grid.Col>
                                            )
                                        )}
                                </Grid>
                            )}
                        </Flex>
                    </Flex>
                </Container>
            </Box>
            {/* Not main */}
            <Container size={"mainXl"} py={"2vh"}>
                <Flex direction={"column"} gap={"lg"}>
                    {episode ? (
                        <GetDetailsEpisode
                            name={details?.name}
                            seasonName={details?.seasons[season]?.name}
                        />
                    ) : !episode && season ? (
                        <>
                            <GetDetailsSeason name={details?.name} />
                        </>
                    ) : (
                        <>
                            {type === "tv" && (
                                <GetSeason
                                    season={details?.seasons}
                                    loading={loading}
                                />
                            )}
                            <AspectRatio
                                ratio={16 / 9}
                                w={{ base: "100%", lg: "80%" }}
                            >
                                <GetTrailer id={video?.key} />
                            </AspectRatio>
                        </>
                    )}
                    {!episode && <GetCredit type={type} id={id} label="cast" />}
                    <GetSimilar type={type} id={id} />
                </Flex>
            </Container>
        </Box>
    );
};

export default DetailsPage;
