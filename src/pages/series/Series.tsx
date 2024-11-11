import {
    Box,
    CloseButton,
    Container,
    Flex,
    Input,
    Select,
    Title,
} from "@mantine/core";
import MainGrid from "../../components/MainGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";

const Series = () => {
    const router = useParams();
    const { page } = router;
    const [sortURL, setSortURL] = useSearchParams();
    const [searchURL, setSearchURL] = useSearchParams();
    // setSortValue(sortURL.get("sort_by"));
    const sort = sortURL.get("sort_by");
    const search = searchURL.get("query");
    const [searchQuery, setSearchQuery] = useState(search || "");
    return (
        <>
            <Box pt={"xl"}>
                <Container size={"mainXl"}>
                    <Flex direction={"row"} justify={"space-between"}>
                        <Title order={1} c={"white"}>
                        TV Series
                        </Title>
                        <Flex
                            direction={"column"}
                            gap={"md"}
                            align={"flex-end"}
                        >
                            <Input
                                placeholder="Search TV Series"
                                w={"20vw"}
                                onChange={(e) =>
                                    setSearchQuery(e.currentTarget.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setTimeout(() => {
                                            window.location.href = `/series/1${
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
                                            window.location.href = `/series/1`;
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
                                    window.location.href = `/series/1${
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
            <MainGrid type="tv" sortBy={sort} searchQuery={search} />
        </>
    );
};

export default Series;
