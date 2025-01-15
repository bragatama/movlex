/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Person, socialMedia } from "../types/types";
import {
    facebook,
    getPerson,
    getSocialMedia,
    imageOriginalUrl,
    instagram,
    tiktok,
    twitter,
    youtube,
} from "../services/Api";
import {
    Anchor,
    AspectRatio,
    Container,
    Flex,
    Image,
    Paper,
    Skeleton,
    Text,
    Title,
} from "@mantine/core";
import moment from "moment";
import GetPersonCredit from "./GetPersonCredit";
import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandTiktok,
    IconBrandTwitter,
    IconBrandYoutube,
} from "@tabler/icons-react";

const GetPerson = () => {
    const router = useParams();
    const { id } = router;

    const [personData, setPersonData] = useState<Person | any>([]);
    const [socialMedia, setSocialMedia] = useState<socialMedia>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [personDatas, socialMediaData] = await Promise.all([
                    getPerson(id),
                    getSocialMedia(id),
                ]);
                setPersonData(personDatas);
                setSocialMedia(socialMediaData);
            } catch (error) {
                console.log(error, "error");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);
    console.log(socialMedia);

    return (
        <Container size={"mainXl"} style={{ zIndex: 1000 }} py={"4vh"}>
            <meta
                name="keyword"
                content={`${personData.name}, celebrity, celebrities, actor, actress`}
            />
            <Flex direction={"column"} gap={"lg"}>
                <Flex
                    gap={"5vw"}
                    direction={{ base: "column", lg: "row" }}
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
                                    alt="skeleton"
                                    loading="lazy"
                                />
                            </Skeleton>
                        ) : (
                            <Image
                                src={
                                    personData.profile_path
                                        ? `${imageOriginalUrl}/${personData?.profile_path}`
                                        : "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png"
                                }
                                mah={"70vh"}
                                radius={"md"}
                                alt="photo"
                                loading="lazy"
                            />
                        )}
                    </AspectRatio>
                    {!loading && (
                        <Flex direction={"column"} gap={"lg"}>
                            <Flex direction={"column"} gap={"2px"}>
                                <Title order={1} c={"white"}>
                                    {personData.name}
                                </Title>
                                <Title order={4} c={"gray"} pb={"1vh"}>
                                    {personData.gender === 1
                                        ? "Female"
                                        : personData.gender === 2
                                        ? "Male"
                                        : "Non-Binary"}
                                    &nbsp; • &nbsp;
                                    {moment().diff(
                                        `${personData.birthday}`,
                                        "years"
                                    )}{" "}
                                    years old
                                </Title>
                                <Flex direction={"row"} gap={"md"}>
                                    {/* instagram */}
                                    {socialMedia?.instagram_id && (
                                        <Anchor
                                            component={Link}
                                            to={`${instagram}/${socialMedia.instagram_id} `}
                                            underline="never"
                                        >
                                            <Paper
                                                radius={"sm"}
                                                h={"100%"}
                                                p={"8px"}
                                                style={{
                                                    backgroundColor:
                                                        "rgba(200,200,200)",
                                                }}
                                            >
                                                <IconBrandInstagram
                                                    color="black"
                                                    size={26}
                                                    style={{
                                                        height: "100%",
                                                        marginTop: "auto",
                                                        marginBottom: "auto",
                                                    }}
                                                />
                                            </Paper>
                                        </Anchor>
                                    )}
                                    {/* twitter */}
                                    {socialMedia?.twitter_id && (
                                        <Anchor
                                            component={Link}
                                            to={`${twitter}/${socialMedia.twitter_id} `}
                                            underline="never"
                                        >
                                            <Paper
                                                radius={"sm"}
                                                p={"8px"}
                                                h={"100%"}
                                                style={{
                                                    backgroundColor:
                                                        "rgba(200,200,200)",
                                                }}
                                            >
                                                <IconBrandTwitter
                                                    color="black"
                                                    size={26}
                                                    style={{
                                                        height: "100%",
                                                        marginTop: "auto",
                                                        marginBottom: "auto",
                                                    }}
                                                />
                                            </Paper>
                                        </Anchor>
                                    )}
                                    {/* facebook */}
                                    {socialMedia?.facebook_id && (
                                        <Anchor
                                            component={Link}
                                            to={`${facebook}/${socialMedia.facebook_id} `}
                                            underline="never"
                                        >
                                            <Paper
                                                radius={"sm"}
                                                h={"100%"}
                                                p={"8px"}
                                                style={{
                                                    backgroundColor:
                                                        "rgba(200,200,200)",
                                                }}
                                            >
                                                <IconBrandFacebook
                                                    color="black"
                                                    size={26}
                                                    style={{
                                                        height: "100%",
                                                        marginTop: "auto",
                                                        marginBottom: "auto",
                                                    }}
                                                />
                                            </Paper>
                                        </Anchor>
                                    )}
                                    {/* youtube */}
                                    {socialMedia?.youtube_id && (
                                        <Anchor
                                            component={Link}
                                            to={`${youtube}${socialMedia.youtube_id} `}
                                            underline="never"
                                        >
                                            <Paper
                                                radius={"sm"}
                                                h={"100%"}
                                                p={"8px"}
                                                style={{
                                                    backgroundColor:
                                                        "rgba(200,200,200)",
                                                }}
                                            >
                                                <IconBrandYoutube
                                                    color="black"
                                                    size={26}
                                                    style={{
                                                        height: "100%",
                                                        marginTop: "auto",
                                                        marginBottom: "auto",
                                                    }}
                                                />
                                            </Paper>
                                        </Anchor>
                                    )}
                                    {/* tiktok */}
                                    {socialMedia?.tiktok_id && (
                                        <Anchor
                                            component={Link}
                                            to={`${tiktok}${socialMedia.tiktok_id} `}
                                            underline="never"
                                        >
                                            <Paper
                                                radius={"sm"}
                                                h={"100%"}
                                                p={"8px"}
                                                style={{
                                                    backgroundColor:
                                                        "rgba(200,200,200)",
                                                }}
                                            >
                                                <IconBrandTiktok
                                                    color="black"
                                                    size={26}
                                                    style={{
                                                        height: "100%",
                                                        marginTop: "auto",
                                                        marginBottom: "auto",
                                                    }}
                                                />
                                            </Paper>
                                        </Anchor>
                                    )}
                                </Flex>
                            </Flex>

                            <Flex direction={"column"} gap={"2px"}>
                                <Text c={"dimmed"}>also known as:</Text>
                                {personData.also_known_as &&
                                    personData.also_known_as.map(
                                        (item: React.ReactNode, i: number) => (
                                            <Text c={"white"} fw={500} key={i}>
                                                {item}
                                            </Text>
                                        )
                                    )}
                            </Flex>
                            <Text c={"dimmed"}>
                                Birthday: &emsp;
                                <Text c={"white"} component="span" fw={500}>
                                    {moment(personData.birthday).format(
                                        "dddd, D MMMM YYYY"
                                    )}
                                </Text>
                            </Text>
                            <Text c={"dimmed"}>
                                Place of birth: &emsp;
                                <Text c={"white"} component="span" fw={500}>
                                    {personData.place_of_birth}
                                </Text>
                            </Text>
                            <Flex direction={"column"} gap={"2px"}>
                                <Text c={"dimmed"}>Biography: &emsp;</Text>
                                <Text c={"white"} fw={500}>
                                    {personData.biography}
                                </Text>
                            </Flex>
                        </Flex>
                    )}
                </Flex>
                {!loading && (
                    <>
                        <GetPersonCredit type="movie" id={id} />
                        <GetPersonCredit type="tv" id={id} />
                    </>
                )}
            </Flex>
        </Container>
    );
};

export default GetPerson;
