import {
    AspectRatio,
    Box,
    Button,
    Container,
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
import { useParams } from "react-router-dom";
import { getDetail, imageOriginalUrl } from "../services/Api";
import { Detail } from "../types/types";
import moment from "moment";
import GetCertification from "../components/GetCertification";
import FetchLogo from "../components/FetchLogo";
import { IconCircleCheck, IconPlus } from "@tabler/icons-react";
import GetCredit from "../components/GetCredit";

const DetailsPage = () => {
    const router = useParams();
    const { type, id } = router;
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState<Detail>();

    useEffect(() => {
        getDetail(type, id)
            .then((res) => {
                setDetails(res);
            })
            .catch((err) => {
                console.log(err, "error");
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 200);
            });
        window.scrollTo(0, 0);
    }, [type, id]);

    // useEffect(() => {
    //     const fetchData = async () =>{
    //         try {
    //             const [detailsData, certificationData]=await Promise.all([
    //                 getDetail(type, id)
    //                 getCertification(type,id)
    //             ])
    //             setDetails(detailsData)
    //             setC
    //         } catch (error) {

    //         }
    //     }
    //     return () => {

    //     };
    // }, []);

    // if (loading) {
    //     return (
    //         <Flex justify={"center"}>
    //             <LoadingOverlay
    //                 visible={true}
    //                 zIndex={1000}
    //                 overlayProps={{ radius: "sm", blur: 2 }}
    //                 loaderProps={{ type: "bars" }}
    //             />
    //         </Flex>
    //     );
    // }

    const title = details?.title || details?.name;
    const releaseDate = moment(
        details?.release_date || details?.first_air_date
    ).format("MMM Do, YYYY");

    return (
        <Box>
            <Box
                style={{
                    backgroundImage: `linear-gradient(0deg, rgba(19,19,19,1) 0%, rgba(0,0,0,0.7628279705436862) 30%, rgba(0,0,0,0) 100%),
                    linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
                    url(${imageOriginalUrl}/${details?.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <Container size={"mainXl"} style={{ zIndex: 1000 }} p={"4vh"}>
                    <Flex
                        gap={"5vw"}
                        direction={{ base: "column", md: "row" }}
                        align={"center"}
                        maw={"100%"}
                    >
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
                            {/* <Image
                                src={`${imageOriginalUrl}/${details?.production_companies[0].logo_path}`}
                            /> */}
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
                                    <Text fw={600}>{releaseDate}</Text>
                                </Grid.Col>
                                {details?.runtime ? (
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
                                ) : (
                                    ""
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
                            <Text
                                size="xl"
                                fw={600}
                                fs={"italic"}
                                c="white"
                                py={"5vh"}
                                pl={"3vw"}
                            >
                                - {details?.tagline} -
                            </Text>
                            <Text fw={500}>{details?.overview}</Text>
                            <Grid pt={"2vh"} align="center" gutter={"md"}>
                                {details?.genres?.map((genre) => (
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
                        </Box>
                    </Flex>
                </Container>
            </Box>
            <GetCredit type={type} id={id} />
            <Box h={"100vh"}>test</Box>
        </Box>
    );
};

export default DetailsPage;
