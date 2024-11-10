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
import { getDetail, getVideos, imageOriginalUrl } from "../services/Api";
import { Detail, Videos } from "../types/types";
import moment from "moment";
import GetCertification from "../components/GetCertification";
import FetchLogo from "../components/FetchLogo";
import { IconCircleCheck, IconPlus } from "@tabler/icons-react";
import GetCredit from "../components/GetCredit";
import GetTrailer from "../components/GetTrailer";

const DetailsPage = () => {
    const router = useParams();
    const { type, id } = router;
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState<Detail>();
    const [video, setVideo] = useState();

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
        window.scrollTo(0, 0);
    }, [type, id]);
    console.log(video?.key);

    const title = details?.title || details?.name;
    const releaseDateMovie = moment(details?.release_date).format("YYYY");
    const releaseDateTv =
        details?.status === "Ended"
            ? moment(details?.first_air_date).format("YYYY") ===
              moment(details?.last_air_date).format("YYYY")
                ? moment(details?.first_air_date).format("YYYY")
                : moment(details?.first_air_date).format("YYYY") +
                  " - " +
                  moment(details?.last_air_date).format("YYYY")
            : moment(details?.first_air_date).format("YYYY") + " - Present";

    return (
        <Box>
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
                        direction={{ base: "column", md: "row" }}
                        align={"center"}
                        maw={"100%"}
                    >
                        {/* LOGO */}
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
                                    src={`${imageOriginalUrl}/${details?.poster_path}`}
                                    h={"70vh"}
                                    radius={"md"}
                                />
                            )}
                        </AspectRatio>
                        <Box h={"auto"}>
                            <FetchLogo
                                id={id}
                                type={type}
                                style={{
                                    paddingBottom: "20px",
                                    height: "25vh",
                                    maxWidth: "30vw",
                                    objectFit: "contain",
                                }}
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
                                            {details?.runtime % 60}
                                            min
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
                                    <Button variant="outline">
                                        <Anchor
                                            component={Link}
                                            to={details?.homepage}
                                            underline="never"
                                        >
                                            Website
                                        </Anchor>
                                    </Button>
                                </Grid.Col>
                                <Grid.Col span={"content"}>
                                    <Button
                                        variant="outline"
                                        color="green"
                                        display={"none"}
                                    >
                                        <IconCircleCheck size={20} />
                                        &nbsp; In watchlist
                                    </Button>
                                    <Button variant="outline" color="blue">
                                        <IconPlus size={20} />
                                        &nbsp; Add to watchlist
                                    </Button>
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
                                {details?.genres.map((genre) => (
                                    <Grid.Col key={genre.id} span={"content"}>
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
                                ))}
                            </Grid>
                            {details?.networks ? (
                                <>
                                    <Grid
                                        pt={"2vh"}
                                        align="center"
                                        gutter={"md"}
                                    >
                                        {details?.networks.map((netowrk) => (
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
                                                        src={`${imageOriginalUrl}/${netowrk.logo_path}`}
                                                        h={"3vh"}
                                                        title={netowrk.name}
                                                    />
                                                </Paper>
                                            </Grid.Col>
                                        ))}
                                    </Grid>
                                </>
                            ) : (
                                <Grid pt={"2vh"} align="center" gutter={"md"}>
                                    {details?.production_companies
                                        .slice(0, 1)
                                        .map((production) => (
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
                                                        src={`${imageOriginalUrl}/${production.logo_path}`}
                                                        h={"3vh"}
                                                        title={production.name}
                                                    />
                                                </Paper>
                                            </Grid.Col>
                                        ))}
                                </Grid>
                            )}
                        </Box>
                    </Flex>
                </Container>
            </Box>
            <Container size={"mainXl"}>
                <Flex direction={"column"} gap={"md"}>
                    <AspectRatio ratio={16 / 9}
                    w={'80%'}>
                        <GetTrailer id={video?.key} />
                    </AspectRatio>
                    <GetCredit type={type} id={id} label="cast" />
                </Flex>
            </Container>
        </Box>
    );
};

export default DetailsPage;
