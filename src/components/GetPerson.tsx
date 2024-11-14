import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Person } from "../types/types";
import { getPerson, imageOriginalUrl } from "../services/Api";
import {
    AspectRatio,
    Container,
    Flex,
    Image,
    Skeleton,
    Text,
    Title,
} from "@mantine/core";
import moment from "moment";
import GetPersonCredit from "./GetPersonCredit";

const GetPerson = () => {
    const router = useParams();
    const { id } = router;

    const [personData, setPersonData] = useState<Person>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getPerson(id)
            .then((res) => {
                setPersonData(res);
            })
            .catch((err) => {
                console.log(err, "error");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    return (
        <Container size={"mainXl"} style={{ zIndex: 1000 }} py={"4vh"}>
            <meta name="keyword" content={`${personData.name}, celebrity, celebrities, actor, actress`} />
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
                                src={`${imageOriginalUrl}/${personData?.profile_path}`}
                                mah={"70vh"}
                                radius={"md"}
                                alt="photo"
                                loading="lazy"
                                />
                        )}
                    </AspectRatio>
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
                        </Flex>

                        <Flex direction={"column"} gap={"2px"}>
                            <Text c={"dimmed"}>also known as:</Text>
                            {personData.also_known_as &&
                                personData.also_known_as.map((item) => (
                                    <Text c={"white"} fw={500}>
                                        {item}
                                    </Text>
                                ))}
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
                </Flex>
                <GetPersonCredit type="movie" id={personData.id} />
                <GetPersonCredit type="tv" id={personData.id} />
            </Flex>
        </Container>
    );
};

export default GetPerson;
