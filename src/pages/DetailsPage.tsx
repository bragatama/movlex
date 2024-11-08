import {
    AspectRatio,
    Blockquote,
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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCertification, getDetail, imageOriginalUrl } from "../services/Api";
import { Certification, Detail } from "../types/types";
import moment from "moment";
import GetCertification from "../components/GetCertification";
import FetchLogo from "../components/FetchLogo";

const DetailsPage = () => {
    const router = useParams();
    const { type, id } = router;
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState<Detail>();
    const [check, setCheck] = useState<Certification>();
    // console.log(check.);

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
                }, 500);
            });
        getCertification(type, id)
            .then((res) => {
                const region = res.find(
                    (region: string) => region.iso_3166_1 === "US"
                );
                setCheck(region);
            })
            .catch((err) => {
                console.log(err, "err");
            });
    }, [type, id]);

    if (loading) {
        return (
            <Flex justify={"center"}>
                <LoadingOverlay
                    visible={true}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                    loaderProps={{ type: "bars" }}
                />
            </Flex>
        );
    }

    const title = details?.title || details?.name;
    const releaseDate = moment(
        details?.release_date || details?.first_air_date
    ).format("MMM Do, YYYY");
    const ratingCheck = (type: string) => {
        if (type === "movie") {
            for (let i = 0; i <= check?.release_dates.length; i++) {
                if (!check?.release_dates[i].certification) {
                    continue;
                } else {
                    return check?.release_dates[i].certification;
                }
            }
        } else {
            return check.rating;
        }
    };

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
                        align={"flex-start"}
                        maw={'100%'}
                    >
                        <AspectRatio ratio={2 / 3} maw={'100%'} miw={'fit-content'}>
                            <Image
                                src={`${imageOriginalUrl}/${details?.poster_path}`}
                                h={"70vh"}
                                radius={"md"}
                            />
                        </AspectRatio>
                        <Box
                        h={'auto'}
                        >
                            <FetchLogo
                                id={id}
                                type={type}
                                style={{
                                    paddingBottom: "20px",
                                    height: "25vh",
                                    width: "25vw",
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
                                align="flex-start"
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
                            </Grid>
                            <Blockquote color="white" mt={'xl'}>
                                        {details?.tagline}
                            </Blockquote>
                        </Box>
                    </Flex>
                </Container>
            </Box>
        </Box>
    );
};

export default DetailsPage;
