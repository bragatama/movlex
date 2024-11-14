import {
    Box,
    CloseButton,
    Container,
    Flex,
    Select,
    TextInput,
    Title,
} from "@mantine/core";
import MainGrid from "../../components/MainGrid";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Movies = () => {
    const [sortURL, setSortURL] = useSearchParams();
    const [searchURL, setSearchURL] = useSearchParams();
    // setSortValue(sortURL.get("sort_by"));
    const sort = sortURL.get("sort_by");
    const search = searchURL.get("query");
    const [searchQuery, setSearchQuery] = useState(search || "");
    useEffect(() => {
        document.title = "Movies";
    }, []);
    return (
        <>
            <meta
                name="description"
                content="shows list of movies in order of popularity and top rated."
            />
            <Box pt={"xl"}>
                <Container size={"mainXl"}>
                    <Flex direction={"row"} justify={"space-between"}>
                        <Title order={1} c={"white"}>
                            Movies
                        </Title>
                        <Flex
                            direction={"column"}
                            gap={"md"}
                            align={"flex-end"}
                        >
                            <TextInput
                                placeholder="Search Movie"
                                w={"20vw"}
                                onChange={(e) =>
                                    setSearchQuery(e.currentTarget.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setTimeout(() => {
                                            window.location.href = `/movies/1${
                                                searchQuery
                                                    ? `?query=${searchQuery}`
                                                    : ``
                                            }`;
                                        }, 100);
                                    }
                                }}
                                rightSectionPointerEvents="all"
                                value={searchQuery}
                                rightSection={
                                    <CloseButton
                                        aria-label="Clear Input"
                                        onClick={() => {
                                            setSearchQuery("");
                                        }}
                                        style={{
                                            display: searchQuery
                                                ? undefined
                                                : "none",
                                        }}
                                    />
                                }
                            />
                            <Select
                                data={[
                                    {
                                        value: "popularity.desc",
                                        label: "Popularity",
                                    },
                                    {
                                        value: "vote_average.desc",
                                        label: "Top Rated",
                                    },
                                ]}
                                defaultValue={sort ? sort : "popularity.desc"}
                                w={"fit-content"}
                                placeholder="Sort by..."
                                allowDeselect={false}
                                checkIconPosition="right"
                                onChange={(e) => {
                                    window.location.href = `/movies/1${
                                        e === "popularity.desc"
                                            ? ""
                                            : `?&sort_by=${e}`
                                    }`;
                                }}
                            />
                        </Flex>
                    </Flex>
                </Container>
            </Box>
            <MainGrid type="movie" sortBy={sort} searchQuery={search} />
        </>
    );
};

export default Movies;
